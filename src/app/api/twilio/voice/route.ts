
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const toNumber = url.searchParams.get("to") || ""; // pass target number to verify-pin
   const userId = url.searchParams.get("user") || "";
  const baseUrl = process.env.NEXTAUTH_URL;

  const twiml = new twilio.twiml.VoiceResponse();

  // Optional greeting
  twiml.play("https://dialbackup.com/greeting/Greeting-receiver.mp3");
  // twiml.say({ voice: "alice" }, "Hello! Thank you for using DialBackup. Connecting your call now.");

  // Ask for PIN (use array syntax for 'input')
  const gather = twiml.gather({
    input: ["speech", "dtmf"],   // ✅ FIX: must be an array
    numDigits: 4,
    timeout: 8,
    action: `/api/twilio/verify-pin?to=${encodeURIComponent(toNumber)}&user=${userId}`,
    method: "POST",
  });

  gather.say("Welcome to DialBackup. Please say or enter your four digit PIN.");

  // If no input, repeat
  twiml.redirect(`${baseUrl}/api/twilio/voice?to=${encodeURIComponent(toNumber)}&user=${userId}`);

  return new NextResponse(twiml.toString(), {
    headers: { "Content-Type": "text/xml" },
  });
}
