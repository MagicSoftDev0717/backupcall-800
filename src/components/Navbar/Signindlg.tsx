"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, forwardRef, useImperativeHandle } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

import { signIn } from "next-auth/react";

export interface LoginHandle {
    openModal: () => void;
}

const Signin = forwardRef<LoginHandle>((props, ref) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    useImperativeHandle(ref, () => ({
        openModal,
    }));


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signIn("credentials", {
            redirect: false,  // stay on page to show feedback
            email,
            password,
        });

        setLoading(false);

        if (result?.error) {
            setErrorMsg(result.error);
        } else {
            setSuccessMsg("Signed in successfully!");
            // 🔑 Close the modal after success
            setTimeout(() => {
                closeModal(); // <— hides the Dialog
                router.push("/dashboard");
            }, 300); // small delay so user sees success message
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        await signIn("google", { callbackUrl: "/dashboard" });
    };
    return (
        <>
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
                <div className='hidden lg:block'>
                    <button type="button" className='text-lg text-blue font-medium hover:text-blue-500' onClick={openModal}>
                        Log In
                    </button>
                </div>
            </div>

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
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    {/* Modal content */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                                            alt="logo icon"
                                            className="w-12 h-12"
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
                                            Sign in to your account
                                        </h2>
                                    </div>

                                    {/* Feedback messages */}
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
                                        className="flex w-full items-center justify-center mt-6 space-y-4 gap-3 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50"
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
                                                autoComplete="email"
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
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                placeholder="Password"
                                            />
                                        </div>

                                        {/* Optional Phone Number */}
                                        {/* <div>
                                            <label htmlFor="phone" className="sr-only">
                                                Phone number
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                placeholder="Phone number (optional)"
                                            />
                                        </div> */}

                                        {/* Remember me + Forgot password */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    id="remember-me"
                                                    name="remember-me"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                                />
                                                <label
                                                    htmlFor="remember-me"
                                                    className="ml-2 block text-sm text-gray-900"
                                                >
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
                                            disabled={loading}
                                            className="group relative flex w-full justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                                        >
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <LockClosedIcon
                                                    className="h-5 w-5 text-brand-200 group-hover:text-brand-100"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            {loading ? "Signing in..." : "Sign in"}
                                        </button>
                                    </form>

                                    {/* Close button */}
                                    <div className="mt-6 text-center">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="text-sm text-slate-500 hover:text-slate-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});
Signin.displayName = "Login"; // Required for forwardRef
export default Signin;

