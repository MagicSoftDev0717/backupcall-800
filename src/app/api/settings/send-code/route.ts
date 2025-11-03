import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { phoneE164 } = await req.json();
  await prisma.user.update({
    where: { email: session.user.email },
    data: { phoneE164 },
  });

  // Here you'd call Twilio Verify to send the code.
  console.log("Sent verification code to", phoneE164);
  return NextResponse.json({ success: true });
}
