import Signin from "../../components/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | DialBackup",
  description:
    "This is Sign In page.",
};

export default function SigninPage() {
  return <Signin />;
}
