"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-lightblue pt-28 pb-10">
      <main className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold text-midnightblue">
          Terms of Service
        </h1>
        <p className="mt-4 text-bluegray leading-relaxed">
          By using our service, you agree to the following terms and conditions.
          Please read them carefully.
        </p>

        <section className="mt-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              1. Acceptable Use
            </h2>
            <p className="mt-2 text-bluegray">
              You agree not to misuse our service for illegal activities or
              harassment. We reserve the right to suspend accounts found in
              violation of this policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              2. Payment & Billing
            </h2>
            <p className="mt-2 text-bluegray">
              Calls are billed per minute at the published rate. You are
              responsible for maintaining a valid payment method.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              3. Termination
            </h2>
            <p className="mt-2 text-bluegray">
              You may delete your account at any time from the Settings page. We
              may terminate accounts for violations of these terms.
            </p>
          </div>
        </section>

        <p className="mt-8 text-bluegray">
          For questions about these terms, please contact us via the{" "}
          <a href="/#contactus" className="text-blue hover:underline">
            Contact page
          </a>.
        </p>
      </main>
    </div>
  );
}
