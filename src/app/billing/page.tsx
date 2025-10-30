import Billing from "../../components/Billing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing | DialBackup",
  description:
    "This is Billing page.",
};

export default function BillingPage() {
  return <Billing />;
}
