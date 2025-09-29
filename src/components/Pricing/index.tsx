import Link from "next/link";

import { ShieldCheck } from "lucide-react";
const Pricing = () => {
    return (
      <section id="pricing" className="py-20 bg-lightblue">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl text-navyblue md:text-5xl lg:text-4xl font-semibold lg:text-center leading-tight">Simple Pricing</h3>
          <p className="text-lg mt-4 text-bluegray">
            No monthly fees. Pay only when you call.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-md rounded-2xl border border-bluegray bg-white p-8 shadow-soft">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">$0.05</span>
            <span className=" text-xl text-slate-500">/ minute</span>
          </div>
          <ul className="mt-6 text-lg space-y-3 text-slate-700">
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-brand-600" />
              Secure contact backup
            </li>
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-brand-600" />
              IVR + voice search
            </li>
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-brand-600" />
              Voicemail support
            </li>
          </ul>
          <Link
            href="/signup"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue px-5 py-3 text-white font-semibold shadow-soft hover:bg-brand-700 transition"
          >
            Create your account
          </Link>
          <p className="mt-3 text-center text-sm text-slate-500">
            US calling to start. International coming later.
          </p>
        </div>
      </section>
      )
}

export default Pricing;
