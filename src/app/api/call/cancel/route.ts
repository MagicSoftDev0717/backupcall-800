import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function POST(req: Request) {
  const { sid } = await req.json();
  if (!sid) return NextResponse.json({ error: "Missing sid" }, { status: 400 });
  await client.calls(sid).update({ status: "completed" }); // immediately end
  return NextResponse.json({ ok: true });
}
