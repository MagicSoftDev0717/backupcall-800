// app/api/dashboard/summary/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      contacts: true,
      calls: { orderBy: { startedAt: "desc" }, take: 1 },
    },
  });

  return NextResponse.json({
    contactsCount: user?.contacts.length ?? 0,
    lastCall: user?.calls[0]
      ? {
          contactId: user.calls[0].contactId,
          duration: user.calls[0].billedSeconds,
          cost: user.calls[0].billedCents / 100,
          status: user.calls[0].status,
          startedAt: user.calls[0].startedAt,
        }
      : null,
    billing: {
      totalSpent:
        (user?.calls.reduce((sum, c) => sum + c.billedCents, 0) ?? 0) / 100,
      currency: "USD",
    },
  });
}
