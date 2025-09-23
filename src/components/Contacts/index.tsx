// "use client";

// import { useState } from "react";
// import { Star, StarOff, RefreshCw, Search } from "lucide-react";

// interface Contact {
//   id: string;
//   name: string;
//   phone: string;
//   favorite: boolean;
// }

// export default function ContactsPage() {
//   // Mock contacts — replace with data from your backend
//   const [contacts, setContacts] = useState<Contact[]>([
//     { id: "1", name: "John Smith", phone: "+1 555-123-4567", favorite: false },
//     { id: "2", name: "Jane Doe", phone: "+1 555-987-6543", favorite: true },
//     { id: "3", name: "Mike Johnson", phone: "+1 555-777-1111", favorite: false },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredContacts = contacts.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.phone.includes(searchTerm)
//   );

//   const toggleFavorite = (id: string) => {
//     setContacts((prev) =>
//       prev.map((c) =>
//         c.id === id ? { ...c, favorite: !c.favorite } : c
//       )
//     );
//   };

//   const handleSyncNow = () => {
//     alert("Syncing contacts with Google...");
//     // TODO: Replace with API call to trigger Google Contacts sync
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <main className="container py-10">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold tracking-tight text-slate-900">
//             My Contacts
//           </h1>
//           <button
//             onClick={handleSyncNow}
//             className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Sync Now
//           </button>
//         </div>

//         {/* Search bar */}
//         <div className="mt-6 relative max-w-md">
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
//           <input
//             type="text"
//             placeholder="Search by name or number..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
//           />
//         </div>

//         {/* Contacts list */}
//         {filteredContacts.length > 0 ? (
//           <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredContacts.map((contact) => (
//               <li
//                 key={contact.id}
//                 className="rounded-xl bg-white border border-slate-200 p-4 shadow-soft flex items-center justify-between"
//               >
//                 <div>
//                   <p className="text-lg font-semibold text-slate-900">
//                     {contact.name}
//                   </p>
//                   <p className="text-sm text-slate-600">{contact.phone}</p>
//                 </div>

//                 <button
//                   onClick={() => toggleFavorite(contact.id)}
//                   className="ml-4 text-slate-400 hover:text-yellow-500 transition"
//                   aria-label={`Toggle favorite for ${contact.name}`}
//                 >
//                   {contact.favorite ? (
//                     <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
//                   ) : (
//                     <StarOff className="h-6 w-6" />
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="mt-12 text-center">
//             <p className="text-lg text-slate-600">
//               No contacts found. Connect Google Contacts to start.
//             </p>
//             <button
//               onClick={handleSyncNow}
//               className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
//             >
//               <RefreshCw className="h-4 w-4" />
//               Connect Google Contacts
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { Star, StarOff, RefreshCw, Search } from "lucide-react";

// interface Contact {
//   id: string;
//   name: string;
//   phone: string;
//   favorite: boolean;
// }

// export default function ContactsPage() {
//   // Mock data (replace with backend or Google Contacts)
//   const [contacts, setContacts] = useState<Contact[]>([
//     { id: "1", name: "John Smith", phone: "+1 555-123-4567", favorite: false },
//     { id: "2", name: "Jane Doe", phone: "+1 555-987-6543", favorite: true },
//     { id: "3", name: "Mike Johnson", phone: "+1 555-777-1111", favorite: false },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredContacts = contacts.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.phone.includes(searchTerm)
//   );

//   const toggleFavorite = (id: string) => {
//     setContacts((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
//     );
//   };

//   const handleSyncNow = () => {
//     alert("Syncing contacts with Google...");
//     // TODO: Replace with real API call
//   };

//   return (
//     <div className="min-h-screen bg-white pt-24">
//       {/* Use pt-24 to offset fixed navbar defined in global.css */}

//       <main className="mx-auto max-w-6xl px-6">
//         {/* Header & Sync Button */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <h1 className="text-3xl font-semibold text-midnightblue">
//             My Contacts
//           </h1>
//           <button
//             onClick={handleSyncNow}
//             className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2 text-sm font-medium text-white shadow transition hover:bg-brand-700"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Sync Now
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="relative mt-6 max-w-md">
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-darkgray" />
//           <input
//             type="text"
//             placeholder="Search by name or number..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full rounded-md border border-grey500 bg-white pl-10 pr-4 py-2 text-slate-900 placeholder-darkgray focus:border-blue focus:ring-1 focus:ring-blue sm:text-sm"
//           />
//         </div>

//         {/* Contact List */}
//         {filteredContacts.length > 0 ? (
//           <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredContacts.map((contact) => (
//               <li
//                 key={contact.id}
//                 className="flex items-center justify-between rounded-xl border border-grey500 bg-white p-4 shadow-sm hover:shadow-md transition"
//               >
//                 <div>
//                   <p className="text-lg font-medium text-midnightblue">
//                     {contact.name}
//                   </p>
//                   <p className="text-sm text-darkgray">{contact.phone}</p>
//                 </div>

//                 <button
//                   onClick={() => toggleFavorite(contact.id)}
//                   className="ml-4 text-slate-400 hover:text-yellow-500 transition"
//                   aria-label={`Toggle favorite for ${contact.name}`}
//                 >
//                   {contact.favorite ? (
//                     <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
//                   ) : (
//                     <StarOff className="h-6 w-6" />
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="mt-12 flex flex-col items-center justify-center text-center">
//             <p className="text-lg text-darkgray">
//               No contacts found. Connect Google Contacts to start.
//             </p>
//             <button
//               onClick={handleSyncNow}
//               className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2 text-sm font-medium text-white hover:bg-brand-700"
//             >
//               <RefreshCw className="h-4 w-4" />
//               Connect Google Contacts
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Star, StarOff, RefreshCw, Search } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  favorite: boolean;
}

export default function ContactsPage() {
  // Mock contacts — replace with backend data later
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "John Smith", phone: "+1 555-123-4567", favorite: false },
    { id: "2", name: "Jane Doe", phone: "+1 555-987-6543", favorite: true },
    { id: "3", name: "Mike Johnson", phone: "+1 555-777-1111", favorite: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const toggleFavorite = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  };

  const handleSyncNow = () => {
    alert("Syncing contacts with Google...");
    // TODO: Replace with API call
  };

  return (
    <div className="min-h-screen bg-lightblue pt-28 pb-10">
      <main className="mx-auto max-w-6xl px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-semibold text-midnightblue">
            My Contacts
          </h1>
          <button
            onClick={handleSyncNow}
            className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2 text-white font-medium shadow hover:bg-brand-700 transition"
          >
            <RefreshCw className="h-4 w-4" />
            Sync Now
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-bluegrey" />
          <input
            type="text"
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-grey500 bg-white pl-10 pr-4 py-2 text-midnightblue placeholder-bluegray focus:border-blue focus:ring-1 focus:ring-blue sm:text-sm"
          />
        </div>

        {/* CONTACT LIST */}
        {filteredContacts.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => (
              <li
                key={contact.id}
                className="rounded-2xl bg-white border border-grey500 p-5 shadow hover:shadow-lg transition flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-medium text-midnightblue">
                    {contact.name}
                  </p>
                  <p className="text-sm text-bluegray">{contact.phone}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(contact.id)}
                  className="ml-4 text-bluegray hover:text-yellow-500 transition"
                  aria-label={`Toggle favorite for ${contact.name}`}
                >
                  {contact.favorite ? (
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-6 w-6" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-lg text-bluegray">
              No contacts found. Connect Google Contacts to start.
            </p>
            <button
              onClick={handleSyncNow}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-2 text-white font-medium hover:bg-brand-700 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Connect Google Contacts
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
