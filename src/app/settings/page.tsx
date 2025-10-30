import Settings from "../../components/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | DialBackup",
  description:
    "This is Settings page.",
};

export default function SettingsPage() {
  return <Settings />;
}
