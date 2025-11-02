import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST() {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.play("https://dialbackup/greeting/greeting.mp3");
  // twiml.say({ voice: "alice" }, "Hello! Thank you for using DialBackup. Connecting your call now.");
  // If you want to forward directly:
  // twiml.dial(to); (you could pass from session or DB)
  return new NextResponse(twiml.toString(), {
    headers: { "Content-Type": "text/xml" },
  });
}
