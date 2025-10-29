"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-lightblue pt-20 pb-16">
      <main className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold text-midnightblue">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-bluegray">Last updated: Oct 28, 2025</p>

        <p className="mt-4 text-bluegray leading-relaxed">
          By using DialBackup, you agree to these Terms. If you do not agree, do not use the service.
        </p>

        <section className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-midnightblue">1. Service Description</h2>
            <p className="mt-2 text-bluegray">
              DialBackup lets you place calls to your existing Google Contacts from a toll-free number.
              After you sign in with Google and grant read-only access to your contacts, we show names
              and phone numbers in a call-picker and route calls through our telephony provider.
              DialBackup is not affiliated with or endorsed by Google.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">2. Eligibility & Account</h2>
            <p className="mt-2 text-bluegray">
              You must be legally able to enter into these Terms and use the service in compliance with
              applicable laws. You are responsible for the security of your account and for all activity
              under it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">3. Google Sign-In & Contacts Permission</h2>
            <p className="mt-2 text-bluegray">
              If you connect Google, we request read-only access to your Google Contacts
              (names, phone numbers, optional primary emails) solely to enable calling from the web app.
              We do not write to or delete your Google data. You can disconnect in Settings at any time
              and revoke access from your Google Account. For data handling, see our{" "}
              <a href="/privacy" className="text-blue hover:underline">Privacy Policy</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">4. Telephony Service & Limitations</h2>
            <p className="mt-2 text-bluegray">
              Calls are routed via our provider and may be subject to carrier rules, country restrictions,
              and network availability. The service is not intended for, and does not support, emergency
              calling (e.g., 911 or local equivalents). Do not attempt to place emergency calls using
              DialBackup. Call quality and availability may vary by region and carrier.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">5. Acceptable Use</h2>
            <p className="mt-2 text-bluegray">
              You agree not to use the service for illegal activities, harassment, fraud, spam, or any
              calls that violate applicable laws (including Do-Not-Call, robocall, or consent requirements).
              We may suspend or terminate accounts that violate these Terms or harm others or the service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">6. Payment & Billing</h2>
            <p className="mt-2 text-bluegray">
              Calls are billed per minute at the published rate. You are responsible for maintaining a valid
              payment method and for all charges incurred under your account. Taxes and carrier surcharges
              may apply. Unless required by law, fees are non-refundable once a call has been connected.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">7. Third-Party Services</h2>
            <p className="mt-2 text-bluegray">
              We use third-party processors to operate the service, including Twilio (telephony) and PayPal
              (payments). These providers act on our behalf under contractual obligations and may process
              limited data as needed to provide their services. See our{" "}
              <a href="/privacy" className="text-blue hover:underline">Privacy Policy</a> for details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">8. Data Handling & Privacy</h2>
            <p className="mt-2 text-bluegray">
              We collect and use only what is necessary to provide the service. Minimal contact fields may be
              stored encrypted at rest if you choose to save them; otherwise they are held in session only.
              You can delete synced contacts and your account, and revoke Google access at any time. Learn more at{" "}
              <a href="/privacy" className="text-blue hover:underline">Privacy Policy</a> and{" "}
              <a href="/settings" className="text-blue hover:underline">Settings</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">9. Termination</h2>
            <p className="mt-2 text-bluegray">
              You may delete your account at any time from Settings. We may suspend or terminate the service
              or your access if you violate these Terms, pose a security or legal risk, or cause harm.
              Upon termination, certain provisions that by their nature should survive will survive (e.g.,
              payment obligations, disclaimers, and limitations of liability).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">10. Disclaimers & Limitation of Liability</h2>
            <p className="mt-2 text-bluegray">
              The service is provided “as is” and “as available.” We do not guarantee uninterrupted or error-free
              operation. To the maximum extent permitted by law, we are not liable for indirect, incidental,
              special, or consequential damages, or for issues outside our reasonable control (including
              carrier failures and network outages).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-midnightblue">11. Changes to These Terms</h2>
            <p className="mt-2 text-bluegray">
              We may update these Terms from time to time. Material changes will be posted on this page with
              an updated “Last updated” date. Continued use after changes means you accept the revised Terms.
            </p>
          </div>
        </section>

        <p className="mt-8 text-bluegray">
          For questions about these Terms, contact{" "}
          <a href="mailto:darrensdesign01@gmail.com" className="text-blue hover:underline">
            darrensdesign01@gmail.com
          </a>{" "}
          or visit our{" "}
          <a href="/#contactus" className="text-blue hover:underline">Contact page</a>.
        </p>
      </main>

    </div>
  );
}
