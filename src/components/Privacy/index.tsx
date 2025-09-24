"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-lightblue pt-20 pb-16">
      <main className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold text-midnightblue">
          Privacy Policy
        </h1>
        <p className="mt-4 text-bluegray leading-relaxed">
          Your privacy is very important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our service.
        </p>

        <section className="mt-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              1. Information We Collect
            </h2>
            <p className="mt-2 text-bluegray">
              We collect your name, email, phone number, and contact list (if you
              connect Google Contacts) in order to provide our calling service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              2. How We Use Your Data
            </h2>
            <p className="mt-2 text-bluegray">
              Your data is used solely for enabling contact syncing, authenticating
              your account, and processing call charges. We do not sell or share
              your data with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              3. Data Security
            </h2>
            <p className="mt-2 text-bluegray">
              We use industry-standard encryption to keep your data secure in
              transit and at rest. Your payment information is handled by our
              payment processor (Stripe) and never stored on our servers.
            </p>
          </div>
        </section>

        <p className="mt-8 text-bluegray">
          For questions about our privacy practices, please contact support via the{" "}
          <a href="/#contactus" className="text-blue hover:underline">
            Contact page
          </a>.
        </p>
      </main>
    </div>
  );
}
