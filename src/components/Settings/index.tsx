// "use client";

// import { useState } from "react";
// import { Phone, Key, Trash2, Unplug } from "lucide-react";

// export default function SettingsPage() {
//   // Mock user data — replace with actual session data
//   const [profile, setProfile] = useState({
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     phone: "+1 555-123-4567",
//     phoneVerified: false,
//     pin: "",
//   });

//   const [smsCode, setSmsCode] = useState("");

//   const handleSendVerificationCode = () => {
//     alert("Verification code sent via SMS!");
//     // TODO: Trigger real backend SMS verification
//   };

//   const handleVerifyPhone = () => {
//     alert(`Phone verified with code: ${smsCode}`);
//     setProfile({ ...profile, phoneVerified: true });
//   };

//   const handlePinUpdate = () => {
//     alert(`PIN set to: ${profile.pin}`);
//     // TODO: Save PIN securely
//   };

//   const handleDisconnectGoogleContacts = () => {
//     alert("Google Contacts disconnected.");
//     // TODO: Call backend API to revoke Google OAuth tokens
//   };

//   const handleDeleteAccount = () => {
//     if (confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
//       alert("Account deleted.");
//       // TODO: Trigger account deletion flow
//     }
//   };

//   return (
//     <div className="min-h-screen bg-lightblue pt-28 pb-16">
//       <main className="mx-auto max-w-3xl px-4">
//         <h1 className="text-3xl font-semibold text-midnightblue">
//           Account Settings
//         </h1>

//         {/* PROFILE SECTION */}
//         <section className="mt-8 rounded-2xl bg-white border border-grey-500 p-6 shadow">
//           <h2 className="text-xl font-semibold text-midnightblue">Profile</h2>
//           <div className="mt-4 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-bluegray">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={profile.name}
//                 onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                 className="mt-1 block w-full rounded-lg border border-grey-500 px-3 py-2 text-midnightblue placeholder-bluegray focus:border-blue focus:ring-1 focus:ring-blue sm:text-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-bluegray">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={profile.email}
//                 onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                 className="mt-1 block w-full rounded-lg border border-grey-500 px-3 py-2 text-midnightblue placeholder-bluegray focus:border-blue focus:ring-1 focus:ring-blue sm:text-sm"
//               />
//             </div>
//           </div>
//         </section>

//         {/* PHONE VERIFICATION SECTION */}
//         <section className="mt-8 rounded-2xl bg-white border border-grey-500 p-6 shadow">
//           <h2 className="text-xl font-semibold flex items-center gap-2 text-midnightblue">
//             <Phone className="h-5 w-5 text-blue" /> Phone Verification
//           </h2>
//           <div className="mt-4 space-y-3">
//             <input
//               type="tel"
//               value={profile.phone}
//               onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//               className="block w-full rounded-lg border border-grey-500 px-3 py-2 text-midnightblue placeholder-bluegray focus:border-blue focus:ring-1 focus:ring-blue sm:text-sm"
//             />
//             {!profile.phoneVerified ? (
//               <>
//                 <button
//                   onClick={handleSendVerificationCode}
//                   className="inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
//                 >
//                   Send Code
//                 </button>
//                 <input
//                   type="text"
//                   placeholder="Enter verification code"
//                   value={smsCode}
//                   onChange={(e) => setSmsCode(e.target.value)}
//                   className="mt-2 block w-full rounded-lg border border-grey-500 px-3 py-2 text-midnightblue placeholder-bluegray focus:border-blue focus:ring-1 focus:ring-blue sm:text-sm"
//                 />
//                 <button
//                   onClick={handleVerifyPhone}
//                   className="mt-2 inline-flex items-center gap-2 rounded-lg border border-grey-500 bg-white px-4 py-2 text-sm font-medium text-midnightblue hover:bg-lightblue transition"
//                 >
//                   Verify Phone
//                 </button>
//               </>
//             ) : (
//               <p className="text-green-600 text-sm font-medium">
//                 ✅ Phone verified
//               </p>
//             )}
//           </div>
//         </section>

//         {/* PIN SETUP SECTION */}
//         <section className="mt-8 rounded-2xl bg-white border border-grey-500 p-6 shadow">
//           <h2 className="text-xl font-semibold flex items-center gap-2 text-midnightblue">
//             <Key className="h-5 w-5 text-blue" /> IVR PIN
//           </h2>
//           <p className="mt-1 text-sm text-bluegray">
//             Set a 4-digit PIN for faster authentication when you call the 855-50Hotline number.
//           </p>
//           <div className="mt-3 flex gap-3">
//             <input
//               type="password"
//               maxLength={4}
//               placeholder="••••"
//               value={profile.pin}
//               onChange={(e) => setProfile({ ...profile, pin: e.target.value })}
//               className="block w-28 rounded-lg border border-grey-500 px-3 py-2 text-center tracking-widest text-lg text-midnightblue focus:border-blue focus:ring-1 focus:ring-blue"
//             />
//             <button
//               onClick={handlePinUpdate}
//               className="inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
//             >
//               Save PIN
//             </button>
//           </div>
//         </section>

//         {/* ACTION BUTTONS */}
//         <section className="mt-8 flex flex-col gap-4">
//           <button
//             onClick={handleDisconnectGoogleContacts}
//             className="inline-flex items-center justify-center gap-2 rounded-lg border border-grey-500 bg-white px-4 py-3 text-sm font-medium text-midnightblue hover:bg-lightblue transition"
//           >
//             <Unplug className="h-4 w-4 text-blue" />
//             Disconnect Google Contacts
//           </button>
//           <button
//             onClick={handleDeleteAccount}
//             className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
//           >
//             <Trash2 className="h-4 w-4" />
//             Delete Account
//           </button>
//         </section>
//       </main>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Phone, Key, Trash2, Unplug, User } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [smsCode, setSmsCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch current profile
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/settings/me");
      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      }
    })();
  }, []);

  const handleSaveProfile = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const res = await fetch("/api/settings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile.name, email: profile.email }),
      });
      if (res.ok) alert("Profile updated!");
      else alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!profile?.phone) return alert("Enter a phone number first.");
    const res = await fetch("/api/settings/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: profile.phone }),
    });
    if (res.ok) alert("Verification code sent!");
    else alert("Failed to send code.");
  };

  const handleVerifyPhone = async () => {
    const res = await fetch("/api/settings/verify-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: smsCode }),
    });
    if (res.ok) {
      alert("Phone verified!");
      const data = await res.json();
      setProfile(data.user);
    } else {
      alert("Invalid code.");
    }
  };

  const handlePinUpdate = async () => {
    if (!profile.pin || profile.pin.length !== 4)
      return alert("PIN must be exactly 4 digits.");
    const res = await fetch("/api/settings/update-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: profile.pin }),
    });
    if (res.ok) alert("PIN updated!");
    else alert("Failed to update PIN.");
  };

  const handleDisconnectGoogleContacts = async () => {
    const confirmDisconnect = confirm(
      "Disconnect Google Contacts sync? You’ll need to reauthorize later."
    );
    if (confirmDisconnect) {
      const res = await fetch("/api/settings/disconnect-google", {
        method: "POST",
      });
      if (res.ok) alert("Google Contacts disconnected.");
      else alert("Failed to disconnect.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "This will permanently delete your account and call history. Continue?"
    );
    if (!confirmDelete) return;
    const res = await fetch("/api/settings/delete-account", { method: "DELETE" });
    if (res.ok) alert("Account deleted.");
    else alert("Failed to delete account.");
  };

  if (!profile)
    return (
      <div className="min-h-screen bg-lightblue pt-28 flex justify-center items-center text-bluegray">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-lightblue pt-28 pb-16">
      <main className="mx-auto max-w-3xl px-4 space-y-10">
        <h1 className="text-3xl font-semibold text-midnightblue">
          Account Settings
        </h1>

        {/* PROFILE SECTION */}
        <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-midnightblue">
            <User className="h-5 w-5 text-blue" /> Profile Information
          </h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm text-bluegray mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-midnightblue"
              />
            </div>
            <div>
              <label className="block text-sm text-bluegray mb-1">Email</label>
              <input
                type="email"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-midnightblue"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </section>

        {/* PHONE VERIFICATION */}
        <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-midnightblue">
            <Phone className="h-5 w-5 text-blue" /> Phone Verification
          </h2>
          <div className="mt-5 space-y-3">
            <input
              type="tel"
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-midnightblue"
            />
            {!profile.phoneVerified ? (
              <>
                <button
                  onClick={handleSendVerificationCode}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
                >
                  Send Code
                </button>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-midnightblue"
                />
                <button
                  onClick={handleVerifyPhone}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-midnightblue hover:bg-lightblue transition"
                >
                  Verify Phone
                </button>
              </>
            ) : (
              <p className="text-green-600 text-sm font-medium">✅ Phone verified</p>
            )}
          </div>
        </section>

        {/* IVR PIN */}
        <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-midnightblue">
            <Key className="h-5 w-5 text-blue" /> IVR PIN
          </h2>
           <p className="text-sm text-slate-500 mt-1">
            Set a 4-digit PIN to identify yourself quickly when calling the
            DialBackup toll-free line.
          </p>
          <div className="mt-3 flex gap-3">
            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={profile.pin || ""}
              onChange={(e) => setProfile({ ...profile, pin: e.target.value })}
              className="block w-24 rounded-lg border border-slate-300 px-3 py-2 text-center tracking-widest text-lg text-midnightblue"
            />
            <button
              onClick={handlePinUpdate}
              className="inline-flex items-center gap-2 rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
            >
              Save PIN
            </button>
          </div>
        </section>

        {/* DANGER ZONE */}
        <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <button
            onClick={handleDisconnectGoogleContacts}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-midnightblue hover:bg-lightblue transition"
          >
            <Unplug className="h-4 w-4 text-blue" />
            Disconnect Google Contacts
          </button>

          <h3 className="mt-8 text-lg font-semibold text-red-600">Danger Zone</h3>
          <button
            onClick={handleDeleteAccount}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </section>
      </main>
    </div>
  );
}
