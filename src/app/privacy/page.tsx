import Privacy from "../../components/Privacy";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DialBackup",
  description:
    "This is Privacy Policy page.",
};

export default function PrivacyPage() {
  return <Privacy />;
}
