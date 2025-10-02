import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { remainingMinutes: true, balanceCents: true },
  });

  return NextResponse.json({
    remainingMinutes: user?.remainingMinutes ?? 0,
    balance: (user?.balanceCents ?? 0) / 100,
  });
}
