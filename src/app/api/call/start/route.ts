import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const to = body.to as string;

  // Always dial out from your Twilio purchased number
  const call = await client.calls.create({
    to,
    from: process.env.TWILIO_TOLL_FREE!, // e.g. "18555046854"
    url: process.env.NEXTAUTH_URL + "/api/twilio/voice", // TwiML response (what to do once answered)
    statusCallback: process.env.NEXTAUTH_URL + "/api/twilio/status",
    statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
  });

  // Save the call to DB immediately
  await prisma.call.create({
    data: {
      userId: (session.user as any).id, 
      twilioCallSid: call.sid,
      startedAt: new Date(),
      status: "initiated",
    },
  });

  return NextResponse.json({ success: true, callSid: call.sid });
}
