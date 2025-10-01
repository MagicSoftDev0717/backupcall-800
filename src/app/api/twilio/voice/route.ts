import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST() {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("Connecting your call now...");
  // If you want to forward directly:
  // twiml.dial(to); (you could pass from session or DB)
  return new NextResponse(twiml.toString(), {
    headers: { "Content-Type": "text/xml" },
  });
}
