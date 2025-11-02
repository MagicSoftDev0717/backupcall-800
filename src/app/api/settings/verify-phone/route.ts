import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { code } = await req.json();

  // TODO: Validate code via Twilio Verify
  // For now, accept any code
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { phoneVerified: true },
  });

  return NextResponse.json({ user });
}
