"use client";

import { useState, useEffect } from "react";
import { CreditCard, PlusCircle, Play, Clock } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

interface CallRecord {
    id: string;
    date: string;
    contact: string;
    duration: string;
    cost: number;
    recordingUrl?: string;
}

export default function BillingPage() {

    const [customMinutes, setCustomMinutes] = useState(0);
    const [loadingPackage, setLoadingPackage] = useState(false);
    const [loadingCustom, setLoadingCustom] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [balance, setBalance] = useState(0);


    const searchParams = useSearchParams();
    const router = useRouter();

    // Mock data
    // const [paymentMethod, setPaymentMethod] = useState<{
    //   brand: string;
    //   last4: string;
    //   exp: string;
    // } | null>({
    //   brand: "Visa",
    //   last4: "4242",
    //   exp: "12/26",
    // });

    // Fetch balance/remaining minutes
    async function fetchSummary() {
        try {
            const res = await fetch("/api/billing/summary");
            if (res.ok) {
                const data = await res.json();
                setMinutes(data.remainingMinutes);
                setBalance(data.balance);
            }
        } catch (err) {
            console.error("Failed to load billing summary", err);
        }
    }

    useEffect(() => {
        fetchSummary();
    }, []);

    useEffect(() => {
        const success = searchParams.get("success");
        const orderId = searchParams.get("token");
        const type = searchParams.get("type"); // capture what was bought
        const minutes = searchParams.get("minutes"); // if custom

        if (orderId) {
            (async () => {
                try {
                    const res = await fetch("/api/paypal/capture-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId, type, minutes: minutes ? parseInt(minutes) : undefined }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                        alert("Payment captured successfully! Minutes added.");
                        await fetchSummary(); // refresh balance/minutes
                    } else {
                        alert("Payment failed: " + data.error);
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error capturing order.");
                } finally {
                    router.replace("/billing"); // clean up URL
                }
            })();
        }
    }, [searchParams, router]);


    const handleBuyPackage = async () => {
        setLoadingPackage(true);
        try {
            const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "package", // $4.99 → 120 minutes
                }),
            });
            const data = await res.json();
            if (data.approvalUrl) {
                window.location.href = data.approvalUrl; // Redirect to PayPal
            }
        } finally {
            setLoadingPackage(false);
        }
    };

    const handleBuyCustom = async () => {
        if (!customMinutes || customMinutes < 1) {
            alert("Please enter minutes > 0");
            return;
        }
        setLoadingCustom(true);
        try {
            const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "custom",
                    minutes: customMinutes,
                }),
            });
            const data = await res.json();
            if (data.approvalUrl) {
                window.location.href = data.approvalUrl; // Redirect to PayPal
            }
        } finally {
            setLoadingCustom(false);
        }
    };

    // const [callHistory, setCallHistory] = useState<CallRecord[]>([
    //     {
    //         id: "1",
    //         date: "2025-09-22 10:15 AM",
    //         contact: "John Smith",
    //         duration: "3m 15s",
    //         cost: 0.15,
    //         recordingUrl: "/voicemails/call-1.mp3",
    //     },
    //     {
    //         id: "2",
    //         date: "2025-09-20 08:42 PM",
    //         contact: "Jane Doe",
    //         duration: "5m 10s",
    //         cost: 0.25,
    //     },
    //     {
    //         id: "3",
    //         date: "2025-09-18 02:05 PM",
    //         contact: "Mike Johnson",
    //         duration: "2m 00s",
    //         cost: 0.10,
    //         recordingUrl: "/voicemails/call-3.mp3",
    //     },
    // ]);

    // const totalThisMonth = callHistory.reduce((acc, c) => acc + c.cost, 0);







    // const handleAddOrUpdateCard = () => {
    //   alert("Redirecting to secure payment method update flow...");
    //   // TODO: Connect to Stripe SetupIntent/Payment Element
    // };

    return (
        <div className="min-h-screen bg-lightblue pt-28 pb-10">
            <main className="mx-auto max-w-6xl px-4">
                {/* PAGE TITLE */}
                <h1 className="text-3xl font-semibold text-midnightblue">
                    Billing
                </h1>

                {/* PAYMENT METHOD CARD */}
                {/* <section className="mt-8 rounded-2xl bg-white border border-grey-500 p-6 shadow">
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
        </section> */}

                {/* BALANCE SUMMARY */}
                <section className="mt-8 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-slate-200 p-8 shadow-soft">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-midnightblue mb-6">
                        <Clock className="h-6 w-6 text-blue" />
                        Account Balance
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Remaining Minutes Card */}
                        <div className="rounded-xl bg-white shadow-md p-6 flex items-center justify-between border border-slate-100">
                            <div>
                                <p className="text-medium font-semibold text-beach">Remaining Minutes</p>
                                <p className="text-3xl font-bold text-midnightblue">{minutes}</p>
                            </div>
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue">
                                <Clock className="h-6 w-6" />
                            </div>
                        </div>

                        {/* Remaining Balance Card */}
                        <div className="rounded-xl bg-white shadow-md p-6 flex items-center justify-between border border-slate-100">
                            <div>
                                <p className="text-medium font-semibold text-beach">Remaining Balance</p>
                                <p className="text-3xl font-bold text-midnightblue">
                                    ${balance.toFixed(2)}
                                </p>
                            </div>
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
                                {/* 💳 */}
                                <img
                                    src="/assets/billing/card.png"
                                    alt="card"
                                    className="w-7 h-4" // set manual size here
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-8 mb-12 rounded-2xl bg-white border border-grey-500 p-6 shadow">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-midnightblue mb-6">
                        <CreditCard className="h-5 w-5 text-blue" />
                        Purchase Minutes
                    </h2>

                    {/* Two cards side by side */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow hover:shadow-md transition">
                            <p className="text-beach font-semibold mb-4">
                                Pro Offer: 120 mins for <span className="font-bold">$4.99</span>
                            </p>
                            <button
                                onClick={handleBuyPackage}
                                disabled={loadingPackage}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
                            >
                                <PlusCircle className="h-4 w-4" />
                                {loadingPackage ? "Redirecting..." : "Buy Package"}
                            </button>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow hover:shadow-md transition">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                             
                                <div className="flex items-center gap-2">
                                    <label className="text-beach font-semibold text-medium">Custom:</label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={customMinutes || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCustomMinutes(value ? parseInt(value, 10) : 0);
                                        }}
                                        className="w-20 rounded-md border border-grey-500 px-2 py-1 text-midnightblue text-sm"
                                    />
                                    <label className="text-beach font-semibold text-medium">mins</label>
                                </div>

                    
                                <span className="text-beach font-semibold text-medium">
                                    Cost: ${(customMinutes > 0 ? (customMinutes * 0.05).toFixed(2) : "0.00")}
                                </span>
                            </div>

                            <button
                                onClick={handleBuyCustom}
                                disabled={loadingCustom}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
                            >
                                <PlusCircle className="h-4 w-4" />
                                {loadingCustom ? "Redirecting..." : "Buy Custom"}
                            </button>
                        </div>
                    </div> */}


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Package Deal Card */}
                        <div className="relative rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-midnightblue">Pro Offer</h3>
                                    <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">Best Value</span>
                                </div>
                                <p className="mt-3 text-slate-600">One-time purchase, no subscription.</p>
                                <div className="mt-6 flex items-end gap-2">
                                    <span className="text-4xl font-bold text-blue">$4.99</span>
                                    <span className="text-slate-500 text-lg">/ 120 mins</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-500">Equivalent to just <strong>$0.04</strong> per minute</p>
                            </div>

                            <button
                                onClick={handleBuyPackage}
                                disabled={loadingPackage}
                                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue px-5 py-3 text-base font-semibold text-white hover:bg-brand-700 transition shadow"
                            >
                                <PlusCircle className="h-5 w-5" />
                                {loadingPackage ? "Redirecting..." : "Buy 120 Minutes"}
                            </button>
                        </div>

                        {/* Custom Minutes Card */}
                        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-midnightblue">Custom Minutes</h3>
                                <p className="mt-3 text-slate-600">Pay only for what you need, starting at $0.05/minute.</p>
                                <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-slate-600 font-medium">Minutes:</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={customMinutes || ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCustomMinutes(value ? parseInt(value, 10) : 0);
                                            }}
                                            className="w-24 rounded-md border border-grey-500 px-2 py-1 text-midnightblue text-sm"
                                        />
                                    </div>
                                    <span className="text-lg font-semibold text-green-600">
                                        Cost: ${(customMinutes > 0 ? (customMinutes * 0.05).toFixed(2) : "0.00")}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleBuyCustom}
                                disabled={loadingCustom}
                                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-base font-semibold text-white hover:bg-green-700 transition shadow"
                            >
                                <PlusCircle className="h-5 w-5" />
                                {loadingCustom ? "Redirecting..." : "Buy Custom"}
                            </button>
                        </div>
                    </div>

                </section>

                {/* CALL HISTORY */}
                {/* <section className="mt-10 mb-10">
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
                </section> */}
            </main>
        </div>
    );
}
