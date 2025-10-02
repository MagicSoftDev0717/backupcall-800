"use client";

import { Suspense } from "react";
import BillingContent from "./BillingContent";

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading billing...</div>}>
      <BillingContent />
    </Suspense>
  );
}
