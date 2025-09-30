// app/api/verify/start/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function POST() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user?.phoneE164) {
    return NextResponse.json({ error: "No phone number on file" }, { status: 400 });
  }

  await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
    .verifications.create({ to: user.phoneE164, channel: "sms" });

  return NextResponse.json({ message: "Verification code sent" });
}
