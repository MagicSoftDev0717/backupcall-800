import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { pin } = await req.json();
  if (!pin || pin.length !== 4)
    return NextResponse.json({ error: "Invalid PIN" }, { status: 400 });

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { pinCode },
  });

  return NextResponse.json({ user });
}
