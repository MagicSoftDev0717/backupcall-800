// app/api/contacts/sync/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user?.googleSub) {
    return NextResponse.json({ error: "Google account not linked" }, { status: 400 });
  }

  // Example: call Google People API
  // (assumes you’ve stored and refreshed access tokens for the user)
  const res = await fetch(
    "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers",
    { headers: { Authorization: `Bearer ${user.googleAccessToken}` } } as any
  );
  const data = await res.json();

  if (!data.connections) {
    return NextResponse.json({ error: "No contacts found" }, { status: 404 });
  }

  for (const c of data.connections) {
    const fullName = c.names?.[0]?.displayName ?? "Unknown";
    const phoneE164 = c.phoneNumbers?.[0]?.value ?? null;
    const email = c.emailAddresses?.[0]?.value ?? null;
    if (!phoneE164) continue;

    await prisma.contact.upsert({
      where: {
        userId_fullName: { userId: user.id, fullName }, // or a compound unique index
      },
      update: { phoneE164, email, source: "google" },
      create: {
        userId: user.id,
        source: "google",
        fullName,
        phoneE164,
        email,
      },
    });
  }

  return NextResponse.json({ message: "Contacts synced successfully" });
}
