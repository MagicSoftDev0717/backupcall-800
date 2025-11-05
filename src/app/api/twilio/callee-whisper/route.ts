//src/app/api/twilio/callee-whisper/route.ts
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST() {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ voice: "alice" }, "Hello, you have a call from DialBackup. Please hold while we connect you.");
  // When this TwiML ends, Twilio bridges the callee to the subscriber automatically.
  return new NextResponse(twiml.toString(), { headers: { "Content-Type": "text/xml" } });
}
