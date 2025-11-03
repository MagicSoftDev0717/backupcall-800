// src/app/api/twilio/verify-pin/route.ts
import { NextResponse } from "next/server";
import twilio from "twilio";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();
  const fromNumber = formData.get("From")?.toString();
  const digits = formData.get("Digits")?.toString();
  const speechResult = formData.get("SpeechResult")?.toString();
  const toNumber = formData.get("To")?.toString() || "+15551234567"; // fallback for demo

  const enteredPin = digits || speechResult?.replace(/\D/g, "");

  const twiml = new twilio.twiml.VoiceResponse();

  if (!fromNumber || !enteredPin) {
    twiml.say("No PIN detected. Goodbye.");
    twiml.hangup();
    return new NextResponse(twiml.toString(), {
      headers: { "Content-Type": "text/xml" },
    });
  }

  // Find the user by their registered phone
  const user = await prisma.user.findFirst({
    where: { phoneE164: fromNumber },
  });

  if (!user) {
    twiml.say("We could not identify your phone number. Goodbye.");
    twiml.hangup();
  } else if (user.pinCode === enteredPin) {
    // ✅ PIN verified — connect the call
    twiml.say("PIN verified. Connecting your call now.");
    const dial = twiml.dial({ callerId: process.env.TWILIO_TOLL_FREE });
    dial.number(toNumber);
  } else {
    // ❌ Wrong PIN
    twiml.say("Invalid PIN. Goodbye.");
    twiml.hangup();
  }

  return new NextResponse(twiml.toString(), {
    headers: { "Content-Type": "text/xml" },
  });
}
