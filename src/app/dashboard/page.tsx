import Dashboard from "../../components/Dashboard/";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | DialBackup",
  description:
    "This is Home page.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
