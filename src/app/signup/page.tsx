import Signup from "../../components/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | DialBackup",
  description:
    "This is Sign Up page.",
};

export default function SignupPage() {
  return <Signup />;
}
