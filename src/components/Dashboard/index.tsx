"use client";

import Link from "next/link";
import { useState } from "react";
import { Users, PhoneCall, RefreshCw, ShieldCheck, History } from "lucide-react";
import Logo from "../Logo/index";

export default function Dashboard() {
    // Temporary mock data (replace with real data from backend)
    const [contactsCount, setContactsCount] = useState(42);
    const [lastCall, setLastCall] = useState({
        contact: "John Smith",
        duration: "3m 15s",
        cost: "$0.15",
    });

    const handleSyncContacts = () => {
        // TODO: call backend API for Google Contacts resync
        alert("Contacts sync started!");
    };

    const handleVerifyCallerId = () => {
        // TODO: trigger SMS verification flow
        alert("Verification code sent to your phone.");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* TOP NAV */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link href="/contacts" className="text-slate-700 hover:text-slate-900">
                            Contacts
                        </Link>
                        <Link href="/billing" className="text-slate-700 hover:text-slate-900">
                            Billing
                        </Link>
                        <Link href="/settings" className="text-slate-700 hover:text-slate-900">
                            Settings
                        </Link>
                        <button className="text-red-600 hover:underline">Logout</button>
                    </nav>
                </div>
            </header>

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
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                <PhoneCall className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Last call</p>
                                <p className="text-lg font-semibold">{lastCall.contact}</p>
                                <p className="text-slate-600">
                                    {lastCall.duration} • {lastCall.cost}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleVerifyCallerId}
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            <ShieldCheck className="h-4 w-4 text-brand-600" />
                            Verify Caller ID
                        </button>
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
