"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-lightblue pt-20 pb-16">
      <main className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold text-midnightblue">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-800">Last updated: Oct 28, 2025</p>

        <p className="mt-4 text-slate-800 leading-relaxed">
          <b>DIALBACKUP.COM</b> (“DialBackup”, “we”, “our”) provides a web service that lets users place calls to their existing Google Contacts from a toll-free number.<br/> 
          This Privacy Policy explains what personal data we collect, why we collect it, how we use and share it, how long we retain it, and the choices available to you.
        </p>
        <section className="mt-6 mb-12 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              1. Information We Collect
            </h2>
            <p className="mt-2 text-slate-800">
              a) Account data: name and email (from Google Sign-In) to create and secure your account.<br />
              b) Google Contacts (only if you connect Google): we request the
              <span className="whitespace-nowrap"> https://www.googleapis.com/auth/contacts.readonly </span>
              scope to read <em>names</em>, <em>phone numbers</em>, and optionally <em>primary emails</em> so you can place calls from the web app.
              We do not write to or delete your Google data.<br />
              c) Calling & usage data: the contact you chose to call, call timestamps and duration, and basic diagnostics (IP address, device/browser).<br />
              d) Billing data: handled by PayPal (we do not store full payment details on our servers).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              2. How We Use Your Data
            </h2>
            <p className="mt-2 text-slate-800">
              We use your data to:<br /> (i) Authenticate you;<br /> (ii) Display your Google Contacts in a call-picker;
              and<br /> (iii) Place calls through our Twilio toll-free number.<br /> We do not sell your data or use it for targeted advertising.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              3. Data Minimization & Retention
            </h2>
            <p className="mt-2 text-slate-800">
              We request only the fields needed for calling (names, phone numbers, optional primary emails).
              If you choose to save synced contacts, we store those minimal fields encrypted at rest.
              Otherwise, contacts are held in session only. Server logs and backups roll off within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              4. Sharing with Service Providers
            </h2>
            <p className="mt-2 text-slate-800">
              We share limited data with:<br /> (i) Twilio, to complete phone calls;<br /> (ii) PayPal, to process payments;
              and<br /> (iii) Our hosting and analytics providers to operate and secure the service.<br />
              These providers act as processors on our behalf and may only use data as instructed by us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              5. Your Choices & Controls
            </h2>
            <p className="mt-2 text-slate-800">
              You can disconnect Google at any time in Settings, which stops new data access.
              You can delete synced contacts and your account data via the{" "}
              <a href="/settings" className="text-blue hover:underline">Settings</a> page or by contacting support.
              You may also revoke DialBackup’s access in your Google Account security settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              6. Security
            </h2>
            <p className="mt-2 text-slate-800">
              We use industry-standard encryption in transit and at rest. Access to production data is restricted and audited.
              Payment information is processed by PayPal and not stored on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              7. Compliance with Google Policies
            </h2>
            <p className="mt-2 text-slate-800">
              Our use of Google user data complies with the Google API Services User Data Policy, including the Limited Use requirements.
              We access Google Contacts in read-only mode solely to provide user-facing calling features in DialBackup.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              8. Children’s Privacy
            </h2>
            <p className="mt-2 text-slate-800">
              DialBackup is not directed to children under 18, and we do not knowingly collect personal information from them.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">
              9. Contact Us
            </h2>
            <p className="mt-2 text-slate-800">
              For questions about this policy or your data, you can reach us via the{" "}
              <a href="/#contactus" className="text-blue hover:underline">Contact page</a>.
            </p>
          </div>
        </section>
      </main>

    </div>
  );
}
