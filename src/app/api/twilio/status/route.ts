// // app/api/twilio/status/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const callSid = formData.get("CallSid") as string;
//   const userPhone = formData.get("From") as string;
//   const status = formData.get("CallStatus") as string;
//   const duration = parseInt(formData.get("CallDuration") as string || "0", 10);

//   // Find which user this belongs to (lookup by phoneE164)
//   const user = await prisma.user.findUnique({ where: { phoneE164: userPhone } });

//   if (user) {
//     await prisma.call.upsert({
//       where: { twilioCallSid: callSid },
//       update: {
//         status,
//         endedAt: new Date(),
//         billedSeconds: duration,
//       },
//       create: {
//         userId: user.id,
//         twilioCallSid: callSid,
//         startedAt: new Date(),
//         status,
//         billedSeconds: duration,
//       },
//     });

//   }

//   return NextResponse.json({ received: true });
// }


// app/api/twilio/status/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TERMINAL = new Set(["completed", "failed", "busy", "no-answer", "canceled"]);

export async function POST(req: Request) {
  const form = await req.formData();

  const callSid        = (form.get("CallSid") || "").toString();
  const parentCallSid  = (form.get("ParentCallSid") || "").toString(); // present for child legs
  const status         = (form.get("CallStatus") || "").toString();    // initiated, ringing, in-progress, completed, ...
  const durationStr    = (form.get("CallDuration") || "").toString();  // only on terminal
  const toNumber       = (form.get("To") || "").toString();
  const fromNumber     = (form.get("From") || "").toString();
  const direction      = (form.get("Direction") || "").toString();     // outbound-api, outbound-dial, etc.

  // If you are not modeling legs yet, ignore child legs to avoid polluting parent record.
  if (parentCallSid && parentCallSid !== callSid) {
    // Option A: just acknowledge and ignore.
    return NextResponse.json({ received: true, ignored: "child-leg" });
    // Option B (later): store in a CallLeg table.
  }

  const data: any = {
    status,
    // keep the latest To/From/Direction for debugging
    toNumber,
    fromNumber,
    direction,
  };

  // Only on terminal statuses, stamp end time and duration
  if (TERMINAL.has(status)) {
    const duration = Number.isFinite(parseInt(durationStr, 10)) ? parseInt(durationStr, 10) : null;
    data.endedAt = new Date();
    if (duration !== null) data.billedSeconds = duration;
  }

  // Update the call you created at /api/call/start (joined by CallSid).
  // updateMany avoids throwing if there is no matching row (but ideally it exists).
  await prisma.call.updateMany({
    where: { twilioCallSid: callSid },
    data,
  });

  return NextResponse.json({ received: true });
}
