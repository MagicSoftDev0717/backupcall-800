import Terms from "../../components/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DialBackup",
  description:
    "This is Terms of Serivce page.",
};

export default function TermsPage() {
  return <Terms />;
}
