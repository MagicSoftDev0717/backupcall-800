// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil", // ✅ matches your installed stripe version types
});


export async function POST(req: Request) {
  const { email, password, phone } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }

  const passwordHash = await hash(password, 12);
  const customer = await stripe.customers.create({ email, phone });

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      phoneE164: phone ?? null,
      stripeId: customer.id,
    },
  });

  return NextResponse.json({ ok: true, userId: user.id });
}
