import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { orderId, type, minutes } = body;

  // Call PayPal API to capture payment
  const res = await fetch(`${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
      ).toString("base64")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Payment capture failed", details: data }, { status: 400 });
  }

  // Determine purchased minutes & amount
  let purchasedMinutes = 0;
  let purchasedCents = 0;

  if (type === "package") {
    purchasedMinutes = 120;
    purchasedCents = 499; // $4.99 in cents
  } else if (type === "custom" && minutes) {
    purchasedMinutes = minutes;
    purchasedCents = Math.round(minutes * 5); // $0.05 per min = 5 cents
  }

  // Update user’s balance in DB
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      remainingMinutes: { increment: purchasedMinutes },
      balanceCents: { increment: purchasedCents },
    },
  });

  return NextResponse.json({ success: true, user, paypal: data });
}
