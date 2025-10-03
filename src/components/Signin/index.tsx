"use client";

import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [emailpwdLoading, setEmailpwdLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailpwdLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setEmailpwdLoading(false);

    if (result?.error) {
      setErrorMsg(result.error);
    } else {
      setSuccessMsg("Signed in successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightblue px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo + Title */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <img src="/assets/signin/logo.svg" alt="logo icon" className="w-12 h-12" />
            <img src="/assets/signin/logo-text.svg" alt="logo text" className="w-48 h-auto" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Feedback */}
        {errorMsg && (
          <div className="mt-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mt-4 rounded-md bg-green-50 p-2 text-sm text-green-700">
            {successMsg}
          </div>
        )}

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center mt-6 gap-3 rounded-md border border-slate-300 hover:border-blue-500 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 "
        >
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={emailpwdLoading}
            className="group relative flex w-full justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-brand-200 group-hover:text-brand-100"
                aria-hidden="true"
              />
            </span>
            {emailpwdLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
