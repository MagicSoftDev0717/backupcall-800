import History from "../../components/History";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History | DialBackup",
  description:
    "This is History page.",
};

export default function HistoryPage() {
  return <History />;
}
