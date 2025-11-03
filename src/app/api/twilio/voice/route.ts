import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST() {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.play("https://dialbackup.com/greeting/greeting.mp3");
  // twiml.say({ voice: "alice" }, "Hello! Thank you for using DialBackup. Connecting your call now.");
  // If you want to forward directly:
  // twiml.dial(to); (you could pass from session or DB)

  // Ask user to say or enter their PIN
  const gather = twiml.gather({
    input: "speech dtmf",
    numDigits: 4,
    timeout: 8,
    action: "/api/twilio/verify-pin",
    method: "POST",
  });
  gather.say("Welcome to DialBackup. Please say or enter your four digit PIN.");

  // If no input received, repeat
  twiml.redirect("/api/twilio/voice");
  
  return new NextResponse(twiml.toString(), {
    headers: { "Content-Type": "text/xml" },
  });
}
