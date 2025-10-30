import Contacts from "../../components/Contacts/";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts | DialBackup",
  description:
    "This is Contacts page.",
};

export default function ContactsPage() {
  return <Contacts />;
}
