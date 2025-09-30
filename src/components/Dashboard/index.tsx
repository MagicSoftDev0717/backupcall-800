"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Users, PhoneCall, RefreshCw, ShieldCheck, History } from "lucide-react";

export default function Dashboard() {
    // Temporary mock data (replace with real data from backend)
    const [loading, setLoading] = useState(true);
    const [contactsCount, setContactsCount] = useState(0);
    const [lastCall, setLastCall] = useState<any>(null);

    // Caller ID verification UI state
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/dashboard/summary");
                if (!res.ok) throw new Error("Failed to fetch dashboard data");
                const data = await res.json();
                setContactsCount(data.contactsCount);
                setLastCall(data.lastCall);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSyncContacts = async () => {
        try {
            const res = await fetch("/api/contacts/sync", { method: "POST" });
            console.log(res);
            if (!res.ok) throw new Error("Sync failed");
            alert("Contacts synced!");
        } catch (err) {
            alert("Failed to sync contacts.");
        }
    };

    // const handleVerifyCallerId = async () => {
    //     await fetch("/api/verify/start", { method: "POST" });
    //     alert("Verification code sent!");
    // };

    const handleVerifyCallerId = async () => {
        const res = await fetch("/api/verify/start", { method: "POST" });
         const data = await res.json();
        if (res.ok) {
            setShowOtpInput(true);
            alert(data.message || "Verification code sent to your phone!");
        } else {
            alert(data.error || "Failed to send verification code.");
        }
    };

    const handleCheckCode = async () => {
        setVerifying(true);
        try {
            const res = await fetch("/api/verify/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: otp }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Phone number verified!");
                setShowOtpInput(false);
                setOtp("");
            } else {
                alert(data.error || "Invalid code, please try again.");
            }
        } catch (err) {
            alert("Verification failed. Try again.");
        } finally {
            setVerifying(false);
        }
    };

    if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

    return (
        <div className="min-h-screen bg-lightblue pt-28 pb-10">
            <main className="py-10 max-w-6xl mx-auto">
                {/* PAGE HEADING */}
                <header className="mb-8 text-center">
                    <h1 className="text-5xl font-bold tracking-tight text-slate-900">
                        Welcome back!
                    </h1>
                    <p className="text-lg mt-2 text-bluegray">
                        Here’s a quick overview of your account.
                    </p>
                </header>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Contacts Summary */}
                    <div className="rounded-2xl bg-white p-6 shadow-soft flex flex-col justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Contacts synced</p>
                                <p className="text-3xl font-bold">{contactsCount}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSyncContacts}
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Sync Contacts
                        </button>
                    </div>

                    {/* Last Call Summary */}
                    <div className="rounded-2xl bg-white p-6 shadow-soft flex flex-col justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                                <PhoneCall className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Last call</p>
                                {lastCall ? (
                                    <>
                                        <p className="text-lg font-semibold">
                                            {lastCall.contact?.fullName ?? "Unknown contact"}
                                        </p>
                                        <p className="text-slate-600">
                                            {lastCall.duration} • {lastCall.cost}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-slate-600 italic">No calls yet</p>
                                )}
                            </div>
                        </div>
                        {!showOtpInput ? (
                            <button
                                onClick={handleVerifyCallerId}
                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                                <ShieldCheck className="h-4 w-4 text-brand-600" />
                                Verify Caller ID
                            </button>
                        ) : (
                            <div className="mt-4 flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter verification code"
                                    className="rounded-lg border px-3 py-2 text-sm"
                                />
                                <button
                                    onClick={handleCheckCode}
                                    disabled={verifying}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
                                >
                                    {verifying ? "Verifying..." : "Submit Code"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/contacts"
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft hover:shadow-md transition"
                    >
                        <Users className="h-10 w-10 text-brand-600" />
                        <span className="mt-3 text-lg font-semibold">View My Contacts</span>
                    </Link>

                    <Link
                        href="/history"
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft hover:shadow-md transition"
                    >
                        <History className="h-10 w-10 text-brand-600" />
                        <span className="mt-3 text-lg font-semibold">View Call History</span>
                    </Link>

                    <Link
                        href="/billing"
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft hover:shadow-md transition"
                    >
                        <PhoneCall className="h-10 w-10 text-brand-600" />
                        <span className="mt-3 text-lg font-semibold">Manage Billing</span>
                    </Link>
                </div>
            </main>

        </div>
    );
}
