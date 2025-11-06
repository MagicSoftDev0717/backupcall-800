// // app/api/contacts/list/route.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/lib/auth.config";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   const session = await getServerSession(authConfig);
//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     include: { contacts: {
//         orderBy: { fullName: "asc" }, // ✅ Sort alphabetically by name
//       }, },
//   });

//   return NextResponse.json({ contacts: user?.contacts ?? [] });
// }


// app/api/contacts/list/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ contacts: [] });

  // Optional: support pagination via query params
  const url = new URL(req.url);
  const take = Math.min(parseInt(url.searchParams.get("take") || "500", 10), 1000);
  const skip = parseInt(url.searchParams.get("skip") || "0", 10);

  const contacts = await prisma.contact.findMany({
    where: { userId: user.id },
    orderBy: { fullName: "asc" },
    skip,
    take,
  });

  return NextResponse.json({ contacts });
}
