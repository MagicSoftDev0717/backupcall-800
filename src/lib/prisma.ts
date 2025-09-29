// src/lib/prisma.ts (or /lib/prisma.ts)
// import { PrismaClient } from "@prisma/client";

// export const prisma = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma;

import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var prisma` to survive hot reloads in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

