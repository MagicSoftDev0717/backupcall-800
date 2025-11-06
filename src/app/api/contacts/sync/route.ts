// // app/api/contacts/sync/route.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/lib/auth.config";
// import { prisma } from "@/lib/prisma";

// export async function POST() {
//     const session = await getServerSession(authConfig);
//     if (!session?.user?.email) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await prisma.user.findUnique({ where: { email: session.user.email } });
//     if (!user) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Get Google account for this user
//     const account = await prisma.account.findFirst({
//         where: {
//             userId: user.id,
//             provider: "google",
//         },
//     });

//     const accessToken = account?.access_token;
//     if (!accessToken) {
//         return NextResponse.json(
//             { error: "Google access token not found" },
//             { status: 400 }
//         );
//     }

//     // Example: call Google People API
//     // (assumes you’ve stored and refreshed access tokens for the user)
//     const res = await fetch(
//         "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers",
//         { headers: { Authorization: `Bearer ${accessToken}` } },
//     );
//     const data = await res.json();

//     if (!data.connections) {
//         return NextResponse.json({ error: "No contacts found" }, { status: 404 });
//     }

//     for (const c of data.connections) {
//         const fullName = c.names?.[0]?.displayName ?? "Unknown";
//         const phoneE164 = c.phoneNumbers?.[0]?.value ?? null;
//         const email = c.emailAddresses?.[0]?.value ?? null;
//         if (!phoneE164) continue;

//         await prisma.contact.upsert({
//             where: {
//                 userId_fullName: { userId: user.id, fullName }, // or a compound unique index
//             },
//             update: { phoneE164, email, source: "google" },
//             create: {
//                 userId: user.id,
//                 source: "google",
//                 fullName,
//                 phoneE164,
//                 email,
//             },
//         });
//     }

//     return NextResponse.json({ message: "Contacts synced successfully" });
// }


// app/api/contacts/sync/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // find user and Google account
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const account = await prisma.account.findFirst({
    where: { userId: user.id, provider: "google" },
  });
  if (!account?.access_token) {
    return NextResponse.json({ error: "Google account not linked" }, { status: 400 });
  }

  const accessToken = account.access_token;

  const personFields = "names,emailAddresses,phoneNumbers";
  let pageToken: string | undefined = undefined;

  let created = 0;
  let updated = 0;
  let skippedNoPhone = 0;
  let totalFetched = 0;

  // paginate
  do {
    const url = new URL("https://people.googleapis.com/v1/people/me/connections");
    url.searchParams.set("personFields", personFields);
    url.searchParams.set("pageSize", "1000"); // max per page; Google will cap if needed
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "People API error", details: err }, { status: 502 });
    }

    const data = await res.json();
    const connections = data.connections ?? [];
    totalFetched += connections.length;

    for (const c of connections) {
      const fullName = c.names?.[0]?.displayName ?? "Unknown";
      const phone = c.phoneNumbers?.[0]?.value?.trim();
      const email = c.emailAddresses?.[0]?.value?.trim() ?? null;

      if (!phone) {
        skippedNoPhone++;
        continue;
      }

      // upsert keyed by (userId, phoneE164)
      try {
        const up = await prisma.contact.upsert({
          where: { userId_phoneE164: { userId: user.id, phoneE164: phone } },
          update: { fullName, email, source: "google" },
          create: {
            userId: user.id,
            source: "google",
            fullName,
            phoneE164: phone,
            email,
          },
        });
        if (up.createdAt?.getTime?.() === up.updatedAt?.getTime?.()) {
          created++;
        } else {
          updated++;
        }
      } catch {
        // fallback in rare dupe situations
        await prisma.contact.updateMany({
          where: { userId: user.id, phoneE164: phone },
          data: { fullName, email, source: "google" },
        });
        updated++;
      }
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return NextResponse.json({
    message: "Contacts synced",
    totalFetched,
    created,
    updated,
    skippedNoPhone,
  });
}

