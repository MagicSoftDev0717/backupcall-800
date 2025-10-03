import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 ml-2 mr-2 bg-lightblue">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-4xl text-navyblue md:text-5xl lg:text-4xl font-semibold lg:text-center leading-tight">
          Simple Pricing
        </h3>
        <p className="text-lg mt-4 text-bluegray">
          No monthly fees. Choose the plan that works for you.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Pay as you go */}
        <div className="rounded-2xl border border-bluegray bg-white p-8 shadow-soft flex flex-col justify-between">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">$0.05</span>
            <span className="text-xl text-slate-500">/ minute</span>
          </div>
          <ul className="mt-6 text-lg space-y-3 text-slate-700">
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              Secure contact backup
            </li>
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              IVR + voice search
            </li>
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
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

        {/* Special Package */}
        <div className="rounded-2xl border-2 border-blue bg-white p-8 shadow-lg flex flex-col justify-between relative">
          <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
            Popular
          </span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">$4.99</span>
            <span className="text-xl text-slate-500">/ 120 minutes</span>
          </div>
          <ul className="mt-6 text-lg space-y-3 text-slate-700">
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              Prepaid 120 minutes at discount
            </li>
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              Same features as Pay-as-you-go
            </li>
            <li className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              Best value for regular callers
            </li>
          </ul>
          <Link
            href="/signup"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue px-5 py-3 text-white font-semibold shadow-soft hover:bg-brand-700 transition"
          >
            Get the Package
          </Link>
          <p className="mt-3 text-center text-sm text-slate-500">
            Save money if you call often.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
