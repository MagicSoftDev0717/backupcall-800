// app/api/paypal/create-order/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { type, minutes } = body;

  let amount = 0;
  if (type === "package") {
    amount = 4.99; // 120 minutes package
  } else if (type === "custom") {
    amount = (minutes || 0) * 0.05; // $0.05 per min
  }

  // Create order at PayPal
  const res = await fetch(`${process.env.PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
      ).toString("base64")}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: amount.toFixed(2) },
        },
      ],
      application_context: {
        return_url: `${process.env.NEXTAUTH_URL}/billing?success=true&type=${type}&minutes=${minutes || ""}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/billing?canceled=true`,
      },
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    id: data.id,
    approvalUrl: data.links?.find((l: any) => l.rel === "approve")?.href,
  });
}
