// app/api/twilio/status/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();
  const callSid = formData.get("CallSid") as string;
  const userPhone = formData.get("From") as string;
  const status = formData.get("CallStatus") as string;
  const duration = parseInt(formData.get("CallDuration") as string || "0", 10);

  // Find which user this belongs to (lookup by phoneE164)
  const user = await prisma.user.findUnique({ where: { phoneE164: userPhone } });

  if (user) {
    await prisma.call.upsert({
      where: { twilioCallSid: callSid },
      update: {
        status,
        endedAt: new Date(),
        billedSeconds: duration,
      },
      create: {
        userId: user.id,
        twilioCallSid: callSid,
        startedAt: new Date(),
        status,
        billedSeconds: duration,
      },
    });
  }

  return NextResponse.json({ received: true });
}
