"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, forwardRef, useImperativeHandle } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// in your Register component
import { signIn } from "next-auth/react";

export interface RegisterHandle {
    openModal: () => void;
}

const Register = forwardRef<RegisterHandle>((props, ref) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [phone, setPhone] = useState<string | undefined>("");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    // Expose `openModal` to parent components
    useImperativeHandle(ref, () => ({
        openModal,
    }));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const email = String(formData.get("email") || "");
        const password = String(formData.get("password") || "");
        // const phone = String(formData.get("phone") || "");
        const name = ""; // add a name field in UI if you want
        const payload = {
            email,
            password,
            phone: phone || null, // ✅ use state instead of formData
            name
        };
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Signup failed");

            setSuccessMsg("Account created!");

            // Auto sign-in (Credentials) and go to dashboard
            const signInRes = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (signInRes?.error) throw new Error(signInRes.error);

            setLoading(false);
            closeModal();
            router.push("/dashboard");
        } catch (err: any) {
            setLoading(false);
            setErrorMsg(err.message || "Something went wrong.");
        }
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        // Redirect to Google OAuth
        await signIn("google", { callbackUrl: "/dashboard" });
        setLoading(false);
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    {/* Background overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>

                    {/* Modal container */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                                    {/* Close button in top-right corner */}
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none w-8 h-8 hover:text-white hover:bg-lightgrey rounded-full"
                                    >
                                        <span className="sr-only">Close</span>
                                        ✕ {/* You can replace with an icon like XMarkIcon from @heroicons/react if you prefer */}
                                    </button>

                                    <div className="flex flex-col items-center">
                                        {/* <img
                                            src="/assets/signin/logo.svg"
                                            alt="logo"
                                            className="h-12 w-12"
                                        /> */}
                                        <div className="flex items-center justify-center gap-2 pl-12">
                                            <img
                                                src="/assets/signin/logo.svg"
                                                alt="logo icon"
                                                className="w-12 h-12"
                                            />
                                            <img
                                                src="/assets/signin/logo-text.svg"
                                                alt="logo text"
                                                className="w-48 h-auto"
                                            />
                                        </div>
                                        <h2 className="mt-4 text-2xl font-bold text-gray-900">
                                            Create an account
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

                                    {/* Google Signup */}
                                    <button
                                        onClick={handleGoogleSignup}
                                        className="flex w-full items-center justify-center mt-6 space-y-4 gap-3 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50"
                                    >
                                        <FcGoogle className="h-5 w-5" />
                                        Sign up with Google
                                    </button>

                                    {/* Divider */}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-200" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="bg-white px-2 text-slate-500">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>

                                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="sr-only">
                                                Email address
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                placeholder="Email address"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                placeholder="Password"
                                            />
                                        </div>

                                        {/* Phone number (optional) */}
                                        <div>
                                            <label htmlFor="phone" className="sr-only">
                                                Phone number
                                            </label>
                                            {/* <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                placeholder="Phone number (optional)"
                                            /> */}
                                            <PhoneInput
                                                id="phone"
                                                defaultCountry="US" // ✅ Make US the default
                                                placeholder="Enter phone number"
                                                value={phone}
                                                onChange={setPhone}
                                                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                            />
                                        </div>

                                        {/* Terms agreement */}
                                        <div className="flex items-center">
                                            <input
                                                id="terms"
                                                name="terms"
                                                type="checkbox"
                                                required
                                                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                I agree to the{" "}
                                                <a
                                                    href="/terms"
                                                    className="text-brand-600 hover:text-brand-700"
                                                >
                                                    Terms of Service
                                                </a>
                                                &nbsp;and {" "}
                                                <a
                                                    href="/privacy"
                                                    className="text-brand-600 hover:text-brand-700"
                                                >
                                                    Privacy Policy
                                                </a>

                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="group relative flex w-full justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                                        >
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <LockClosedIcon
                                                    className="h-5 w-5 text-brand-200 group-hover:text-brand-100"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            {loading ? "Creating..." : "Sign up"}
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});

Register.displayName = "Register"; // Required for forwardRef
export default Register;
