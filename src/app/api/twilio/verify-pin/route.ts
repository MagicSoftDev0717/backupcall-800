// /src/app/api/twilio/verify-pin/route.ts
import { NextResponse } from "next/server";
import twilio from "twilio";
import { prisma } from "@/lib/prisma";

const MAX_ATTEMPTS = 3;

export async function POST(req: Request) {
  const url = new URL(req.url);
  const toNumber = url.searchParams.get("to") || "";
  const userId   = url.searchParams.get("user") || "";
  const baseUrl  = process.env.NEXTAUTH_URL!;

  const form = await req.formData();
  const digits       = (form.get("Digits") || "").toString();
  const speechResult = (form.get("SpeechResult") || "").toString();
  const enteredPin   = (digits || speechResult.replace(/\D/g, "")).slice(0,4);

  const twiml = new twilio.twiml.VoiceResponse();

  if (!userId) {
    twiml.say("We could not identify your account. Goodbye.");
    twiml.hangup();
    return respond(twiml);
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.pinCode) {
    twiml.say("Your account is not configured for PIN access. Goodbye.");
    twiml.hangup();
    return respond(twiml);
  }

  // Track attempts in DB (simple approach): add `pinAttempts` Int? on Call or User, or use cookies on Gather (not ideal).
  // Minimal stateless approach: allow one retry via redirect back to /voice (already done).
  if (!enteredPin || enteredPin.length !== 4) {
    twiml.say("Invalid or missing PIN.");
    // One more try:
    twiml.redirect(`${baseUrl}/api/twilio/voice?to=${encodeURIComponent(toNumber)}&user=${userId}`);
    return respond(twiml);
  }

  if (enteredPin !== user.pinCode) {
    twiml.say("The PIN is inconrrect.");
    // One more try:
    twiml.redirect(`${baseUrl}/api/twilio/voice?to=${encodeURIComponent(toNumber)}&user=${userId}`);
    return respond(twiml);
  }

  // ✅ PIN OK — connect to the recipient
  twiml.say("The PIN verified. Connecting now.");

  const dial = twiml.dial({
    callerId: process.env.TWILIO_TOLL_FREE,
    answerOnBridge: true,
    // Recording is optional but common:
    // record: "record-from-answer-dual",
    // recordingStatusCallback: `${baseUrl}/api/twilio/recording-status`,
  });

  // Optional one-line whisper to the callee
  // If you add it, ensure it only has a short <Say> and ends.
  // dial.number({ url: `${baseUrl}/api/twilio/callee-whisper`, method: "POST" }, toNumber);

  // Or dial directly without whisper:
  dial.number(toNumber);

  return respond(twiml);
}

function respond(twiml: twilio.twiml.VoiceResponse) {
  return new NextResponse(twiml.toString(), { headers: { "Content-Type": "text/xml" } });
}
