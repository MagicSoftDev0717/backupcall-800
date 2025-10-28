"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-lightblue pt-20 pb-16">
      <main className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold text-midnightblue">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-bluegray">Last updated: Oct 29, 2025</p>

        <p className="mt-4 text-bluegray leading-relaxed">
          Your privacy is very important to us. This Privacy Policy explains what we
          collect, how we use it, and the choices you have when using DialBackup.
        </p>

        <section className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              1. Information We Collect
            </h2>
            <p className="mt-2 text-bluegray">
              a) Account data: name and email (from Google Sign-In) to create and secure your account.<br />
              b) Google Contacts (only if you connect Google): we request the
              <span className="whitespace-nowrap"> https://www.googleapis.com/auth/contacts.readonly </span>
              scope to read <em>names</em>, <em>phone numbers</em>, and optionally <em>primary emails</em> so you can place calls from the web app.
              We do not write to or delete your Google data.<br />
              c) Calling & usage data: the contact you chose to call, call timestamps and duration, and basic diagnostics (IP address, device/browser).<br />
              d) Billing data: handled by Stripe (we do not store full payment details on our servers).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              2. How We Use Your Data
            </h2>
            <p className="mt-2 text-bluegray">
              We use your data to: (i) authenticate you; (ii) display your Google Contacts in a call-picker;
              and (iii) place calls through our Twilio toll-free number. We do not sell your data or use it for targeted advertising.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              3. Data Minimization & Retention
            </h2>
            <p className="mt-2 text-bluegray">
              We request only the fields needed for calling (names, phone numbers, optional primary emails).
              If you choose to save synced contacts, we store those minimal fields encrypted at rest.
              Otherwise, contacts are held in session only. Server logs and backups roll off within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              4. Sharing with Service Providers
            </h2>
            <p className="mt-2 text-bluegray">
              We share limited data with: (i) Twilio, to complete phone calls; (ii) Stripe, to process payments;
              and (iii) our hosting and analytics providers to operate and secure the service.
              These providers act as processors on our behalf and may only use data as instructed by us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              5. Your Choices & Controls
            </h2>
            <p className="mt-2 text-bluegray">
              You can disconnect Google at any time in Settings, which stops new data access.
              You can delete synced contacts and your account data via the{" "}
              <a href="/setting" className="text-blue hover:underline">Setting</a> page or by contacting support.
              You may also revoke DialBackup’s access in your Google Account security settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              6. Security
            </h2>
            <p className="mt-2 text-bluegray">
              We use industry-standard encryption in transit and at rest. Access to production data is restricted and audited.
              Payment information is processed by Stripe and not stored on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              7. Compliance with Google Policies
            </h2>
            <p className="mt-2 text-bluegray">
              Our use of Google user data complies with the Google API Services User Data Policy, including the Limited Use requirements.
              We access Google Contacts in read-only mode solely to provide user-facing calling features in DialBackup.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              8. Children’s Privacy
            </h2>
            <p className="mt-2 text-bluegray">
              DialBackup is not directed to children under 13, and we do not knowingly collect personal information from them.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              9. Contact Us
            </h2>
            <p className="mt-2 text-bluegray">
              For questions about this policy or your data, contact{" "}
              <a href="mailto:info@dialbackup.com" className="text-blue hover:underline">
                info@dialbackup.com
              </a>. You can also reach us via the{" "}
              <a href="/#contactus" className="text-blue hover:underline">Contact page</a>.
            </p>
          </div>
        </section>
      </main>

    </div>
  );
}
