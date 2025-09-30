import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user?.phoneE164) {
    return NextResponse.json({ error: "No phone number on file" }, { status: 400 });
  }

  const body = await req.json();
  const { code } = body;
  if (!code) {
    return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
  }

  try {
    const result = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({
        to: user.phoneE164,
        code,
      });

    if (result.status === "approved") {
      await prisma.user.update({
        where: { id: user.id },
        data: { phoneE164: user.phoneE164 }, // keep as is, but now considered verified
      });
      return NextResponse.json({ success: true, message: "Phone number verified!" });
    } else {
      return NextResponse.json({ success: false, error: "Invalid or expired code" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("Twilio verify error:", err);
    return NextResponse.json({ error: "Verification failed", details: err.message }, { status: 500 });
  }
}
