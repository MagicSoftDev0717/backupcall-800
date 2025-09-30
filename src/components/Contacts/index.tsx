// "use client";

// import { useState, useEffect } from "react";
// import { Star, StarOff, RefreshCw, Search } from "lucide-react";

// interface Contact {
//   id: string;
//   fullName: string;
//   phoneE164: string;
//   email?: string;
//   favorite?: boolean;
// }


// export default function ContactsPage() {
//   const [contacts, setContacts] = useState<Contact[]>([]);

//   useEffect(() => {
//     async function loadContacts() {
//       const res = await fetch("/api/contacts/list");
//       console.log(res);
//       if (res.ok) {
//         const data = await res.json();
//         setContacts(data.contacts);
//       }
//     }
//     loadContacts();
//   }, []);


//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredContacts = contacts.filter(
//     (c) =>
//       (c.fullName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (c.phoneE164?.includes(searchTerm))
//   );

//   const toggleFavorite = (id: string) => {
//     setContacts((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
//     );
//   };

//   const handleSyncNow = async () => {
//     try {
//       const res = await fetch("/api/contacts/sync", { method: "POST" });
//       if (!res.ok) {
//         throw new Error("Failed to sync contacts");
//       }

//       const data = await res.json();
//       alert("Contacts synced successfully!");

//       // 🔄 Refresh contact list from backend
//       const contactsRes = await fetch("/api/contacts/list");
//       if (contactsRes.ok) {
//         const contactsData = await contactsRes.json();
//         setContacts(contactsData.contacts);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error syncing contacts.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-lightblue pt-28 pb-10">
//       <main className="mx-auto max-w-6xl px-4">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h1 className="text-3xl font-semibold text-midnightblue">
//             My Contacts
//           </h1>
//           {contacts.length === 0 ? (
//             <button
//               onClick={handleSyncNow}
//               className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2 text-white font-medium shadow hover:bg-brand-700 transition"
//             >
//               <RefreshCw className="h-4 w-4" />
//               Sync Now
//             </button>
//           ) : (
//             <button
//               onClick={handleSyncNow}
//               className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2 text-white font-medium shadow hover:bg-brand-700 transition"
//             >
//               <RefreshCw className="h-4 w-4" />
//               Re-sync
//             </button>
//           )}
//         </div>

//         {/* SEARCH BAR */}
//         <div className="relative mt-6 max-w-md">
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-bluegrey" />
//           <input
//             type="text"
//             placeholder="Search by name or number..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full rounded-lg border border-grey500 bg-white pl-10 pr-4 py-2 text-midnightblue placeholder-bluegray focus:border-blue focus:ring-1 focus:ring-blue sm:text-sm"
//           />
//         </div>

//         {/* CONTACT LIST */}
//         {filteredContacts.length > 0 ? (
//           <ul className="mt-8 mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredContacts.map((contact) => (
//               <li
//                 key={contact.id}
//                 className="rounded-2xl bg-white border border-grey500 p-5 shadow hover:shadow-lg transition flex items-center justify-between"
//               >
//                 <div>
//                   <p className="text-lg font-medium text-midnightblue">
//                     {contact.fullName}
//                   </p>
//                   <p className="text-sm text-bluegray">{contact.phoneE164}</p>
//                 </div>
//                 <button
//                   onClick={() => toggleFavorite(contact.id)}
//                   className="ml-4 text-bluegray hover:text-yellow-500 transition"
//                   aria-label={`Toggle favorite for ${contact.fullName}`}
//                 >
//                   {contact.favorite ? (
//                     <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
//                   ) : (
//                     <StarOff className="h-6 w-6" />
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="mt-16 text-center">
//             <p className="text-lg text-bluegray">
//               No contacts found. Connect Google Contacts to start.
//             </p>
//             <button
//               onClick={handleSyncNow}
//               className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-2 text-white font-medium hover:bg-brand-700 transition"
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

import { useState, useEffect } from "react";
import { Star, StarOff, RefreshCw, Search } from "lucide-react";

interface Contact {
  id: string;
  fullName: string;
  phoneE164: string;
  email?: string;
  favorite?: boolean;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  useEffect(() => {
    async function loadContacts() {
      const res = await fetch("/api/contacts/list");
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      }
    }
    loadContacts();
  }, []);

  const toggleFavorite = async (id: string, current: boolean) => {
    try {
      // Update DB
      const res = await fetch("/api/contacts/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId: id, favorite: !current }),
      });

      if (res.ok) {
        const updated = await res.json();
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, favorite: updated.contact.favorite } : c))
        );
      } else {
        throw new Error("Failed to update favorite");
      }
    } catch (err) {
      console.error(err);
      alert("Could not update favorite status");
    }
  };


  const handleSyncNow = async () => {
    try {
      const res = await fetch("/api/contacts/sync", { method: "POST" });
      if (!res.ok) throw new Error("Failed to sync contacts");
      alert("Contacts synced successfully!");

      const contactsRes = await fetch("/api/contacts/list");
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData.contacts || []);
      }
    } catch (err) {
      console.error(err);
      alert("Error syncing contacts.");
    }
  };

  // Apply search filter
  const visibleContacts = contacts.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phoneE164?.includes(searchTerm)
  );

  // Apply tab filter
  const filteredContacts =
    activeTab === "favorites"
      ? visibleContacts.filter((c) => c.favorite)
      : visibleContacts;

  const allCount = visibleContacts.length;
  const favCount = visibleContacts.filter((c) => c.favorite).length;

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
            {contacts.length === 0 ? "Sync Now" : "Re-sync"}
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

        {/* ELEGANT TABS */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-lg font-medium transition ${activeTab === "all"
                ? "bg-blue text-white shadow-md"
                : "bg-darkgray text-white"
              }`}
          >
            All <span className="opacity-85">({allCount})</span>
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-lg font-medium transition ${activeTab === "favorites"
                ? "bg-blue text-white shadow-md"
                : "bg-darkgray text-white"
              }`}
          >
            <Star
              className={`h-5 w-5 ${activeTab === "favorites" ? "fill-yellow-500 text-yellow-500" : "fill-yellow-500 text-yellow-500"
                }`}
            />
            Favorites <span className="opacity-85">({favCount})</span>
          </button>
        </div>

        {/* CONTACT LIST */}
        {filteredContacts.length > 0 ? (
          <ul className="mt-8 mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => (
              <li
                key={contact.id}
                className="rounded-2xl bg-white border border-grey500 p-5 shadow hover:shadow-lg transition flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-medium text-midnightblue">
                    {contact.fullName}
                  </p>
                  <p className="text-sm text-bluegray">{contact.phoneE164}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(contact.id, contact.favorite ?? false)}
                  className="ml-4 text-bluegray hover:text-yellow-500 transition"
                  aria-label={`Toggle favorite for ${contact.fullName}`}
                >
                  {contact.favorite ? (
                    <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
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
              No {activeTab === "favorites" ? "favorite " : ""}contacts found.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
