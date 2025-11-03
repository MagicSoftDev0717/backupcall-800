import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const toNumber = url.searchParams.get("to") || "";
  const base = process.env.NEXTAUTH_URL!;

  const twiml = new twilio.twiml.VoiceResponse();

  // Optional: a tiny comfort prompt for the subscriber
  twiml.say({ voice: "alice" }, "Connecting your call.");

  // Dial callee. The 'url' here is fetched when the callee answers (B-leg whisper).
  const dial = twiml.dial({ callerId: process.env.TWILIO_TOLL_FREE });
  dial.number({ url: `${base}/api/twilio/callee-whisper` }, toNumber);

  return new NextResponse(twiml.toString(), { headers: { "Content-Type": "text/xml" } });
}
