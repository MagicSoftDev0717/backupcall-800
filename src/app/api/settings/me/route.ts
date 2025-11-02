import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  //  select: { id: true, name: true, email: true, phoneE164: true, phoneVerified: true, pinCode: true },
     select: { id: true, name: true, email: true, phoneE164: true, pinCode: true },
  });

  return NextResponse.json({ user });
}
