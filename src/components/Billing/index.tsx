"use client";

import { useState } from "react";
import { CreditCard, PlusCircle, Play } from "lucide-react";

interface CallRecord {
  id: string;
  date: string;
  contact: string;
  duration: string;
  cost: number;
  recordingUrl?: string;
}

export default function BillingPage() {
  // Mock data
  const [paymentMethod, setPaymentMethod] = useState<{
    brand: string;
    last4: string;
    exp: string;
  } | null>({
    brand: "Visa",
    last4: "4242",
    exp: "12/26",
  });

  const [callHistory, setCallHistory] = useState<CallRecord[]>([
    {
      id: "1",
      date: "2025-09-22 10:15 AM",
      contact: "John Smith",
      duration: "3m 15s",
      cost: 0.15,
      recordingUrl: "/voicemails/call-1.mp3",
    },
    {
      id: "2",
      date: "2025-09-20 08:42 PM",
      contact: "Jane Doe",
      duration: "5m 10s",
      cost: 0.25,
    },
    {
      id: "3",
      date: "2025-09-18 02:05 PM",
      contact: "Mike Johnson",
      duration: "2m 00s",
      cost: 0.10,
      recordingUrl: "/voicemails/call-3.mp3",
    },
  ]);

  const totalThisMonth = callHistory.reduce((acc, c) => acc + c.cost, 0);

  const handleAddOrUpdateCard = () => {
    alert("Redirecting to secure payment method update flow...");
    // TODO: Connect to Stripe SetupIntent/Payment Element
  };

  return (
    <div className="min-h-screen bg-lightblue pt-28 pb-10">
      <main className="mx-auto max-w-6xl px-4">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold text-midnightblue">
          Billing & Call History
        </h1>

        {/* PAYMENT METHOD CARD */}
        <section className="mt-8 rounded-2xl bg-white border border-grey-500 p-6 shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-midnightblue">
            <CreditCard className="h-5 w-5 text-blue" />
            Payment Method
          </h2>

          {paymentMethod ? (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-bluegray">
                {paymentMethod.brand} ending in {paymentMethod.last4} <br />
                <span className="text-sm text-darkgray">
                  Expires {paymentMethod.exp}
                </span>
              </p>
              <button
                onClick={handleAddOrUpdateCard}
                className="inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
              >
                <PlusCircle className="h-4 w-4" />
                Update Card
              </button>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <p className="text-bluegray mb-3">
                No payment method on file.
              </p>
              <button
                onClick={handleAddOrUpdateCard}
                className="inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
              >
                <PlusCircle className="h-4 w-4" />
                Add Payment Method
              </button>
            </div>
          )}
        </section>

        {/* CALL HISTORY */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-midnightblue">
            Call History
          </h2>

          {callHistory.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-grey-500 bg-white shadow">
              <table className="min-w-full divide-y divide-grey-500">
                <thead className="bg-lightgrey">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-midnightblue">
                      Date / Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-midnightblue">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-midnightblue">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-midnightblue">
                      Cost
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-midnightblue">
                      Recording
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey-500">
                  {callHistory.map((call) => (
                    <tr key={call.id} className="hover:bg-babyblue">
                      <td className="px-4 py-3 text-sm text-midnightblue">
                        {call.date}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-midnightblue">
                        {call.contact}
                      </td>
                      <td className="px-4 py-3 text-sm text-midnightblue">
                        {call.duration}
                      </td>
                      <td className="px-4 py-3 text-sm text-midnightblue">
                        ${call.cost.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {call.recordingUrl ? (
                          <a
                            href={call.recordingUrl}
                            className="inline-flex items-center gap-1 text-blue hover:text-brand-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Play className="h-4 w-4" />
                            Listen
                          </a>
                        ) : (
                          <span className="text-darkgray">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-lightgrey">
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-right text-sm font-semibold text-midnightblue"
                    >
                      Total this month: ${totalThisMonth.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-bluegray">
              No call history available yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
