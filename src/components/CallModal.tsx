"use client";

import { useEffect, useState } from "react";

export default function CallModal({
  phone,
  callSid,
  onClose,
}: {
  phone: string;
  callSid: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<string>("initiated");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let t: any;
    async function poll() {
      try {
        const res = await fetch(`/api/call/status?sid=${encodeURIComponent(callSid)}`);
        if (res.ok) {
          const data = await res.json();
          setStatus(data.status);
          // Stop polling on terminal states
          if (["completed","failed","busy","no-answer","canceled"].includes(data.status)) {
            return; // stop polling
          }
        }
      } catch {}
      t = setTimeout(poll, 1500);
    }
    poll();
    return () => clearTimeout(t);
  }, [callSid]);

  const endCall = async () => {
    try {
      setLoading(true);
      await fetch("/api/call/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sid: callSid }),
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Calling</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <div className="text-slate-700">To</div>
          <div className="text-lg font-medium">{phone}</div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-slate-500">Status</div>
          <div className="mt-1 text-lg font-semibold capitalize">
            {status === "in-progress" ? "answered" : status.replace("-", " ")}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            We dial you first, then bridge the callee. You can end the call anytime.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={endCall}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Ending…" : "End Call"}
          </button>
        </div>
      </div>
    </div>
  );
}
