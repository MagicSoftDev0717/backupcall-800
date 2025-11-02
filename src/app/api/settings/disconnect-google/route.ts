import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.user.update({
    where: { email: session.user.email },
    data: { googleSub: null },
  });

  return NextResponse.json({ success: true });
}
