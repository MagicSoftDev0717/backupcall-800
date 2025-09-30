// app/api/contacts/favorite/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contactId, favorite } = await req.json();

  const contact = await prisma.contact.update({
    where: { id: contactId },
    data: { favorite },
  });

  return NextResponse.json({ contact });
}
