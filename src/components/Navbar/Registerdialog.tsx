// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'
// import { LockClosedIcon } from '@heroicons/react/20/solid'


// const Register = () => {
//     let [isOpen, setIsOpen] = useState(false)

//     const closeModal = () => {
//         setIsOpen(false)
//     }

//     const openModal = () => {
//         setIsOpen(true)
//     }

//     return (
//         <>
//             <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
//                 <div className='hidden lg:block'>
//                     <button className="text-blue text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out leafbutton bg-lightblue hover:text-white hover:bg-blue" onClick={openModal}>
//                         Sign up
//                     </button>
//                 </div>
//             </div>

//             <Transition appear show={isOpen} as={Fragment}>
//                 <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0 bg-black bg-opacity-25" />
//                     </Transition.Child>

//                     <div className="fixed inset-0 overflow-y-auto">
//                         <div className="flex min-h-full items-center justify-center p-4 text-center">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

//                                     <div className="flex min-h-full items-center justify-center py-6 px-2 sm:px-6 lg:px-8">
//                                         <div className="w-full max-w-md space-y-8">
//                                             <div className="flex flex-col items-center">
//                                                 <div className="flex items-center justify-center gap-2 pl-12">
//                                                     <img
//                                                         src="/assets/signin/logo.svg"
//                                                         alt="logo icon"
//                                                         className="w-12 h-12"
//                                                     />
//                                                     <img
//                                                         src="/assets/signin/logo-text.svg"
//                                                         alt="logo text"
//                                                         className="w-48 h-auto"
//                                                     />
//                                                 </div>
//                                                 <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
//                                                     Create an account
//                                                 </h2>
//                                             </div>
//                                             <form className="mt-8 space-y-6" action="#" method="POST">
//                                                 <input type="hidden" name="remember" defaultValue="true" />
//                                                 <div className="-space-y-px rounded-md shadow-sm">
//                                                     <div>
//                                                         <label htmlFor="email-address" className="sr-only">
//                                                             Email address
//                                                         </label>
//                                                         <input
//                                                             id="email-address"
//                                                             name="email"
//                                                             type="email"
//                                                             autoComplete="email"
//                                                             required
//                                                             className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                                                             placeholder="Email address"
//                                                         />
//                                                     </div>
//                                                     <div>
//                                                         <label htmlFor="password" className="sr-only">
//                                                             Password
//                                                         </label>
//                                                         <input
//                                                             id="password"
//                                                             name="password"
//                                                             type="password"
//                                                             autoComplete="current-password"
//                                                             required
//                                                             className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                                                             placeholder="Password"
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex items-center justify-between">
//                                                     <div className="flex items-center">
//                                                         <input
//                                                             id="remember-me"
//                                                             name="remember-me"
//                                                             type="checkbox"
//                                                             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                                                             Remember me
//                                                         </label>
//                                                     </div>

//                                                 </div>

//                                                 <div>
//                                                     <button
//                                                         type="submit"
//                                                         className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                                     >
//                                                         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                                                             <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
//                                                         </span>
//                                                         Sign up Now
//                                                     </button>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </div>


//                                     <div className="mt-4 flex justify-end">
//                                         <button
//                                             type="button"
//                                             className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 "
//                                             onClick={closeModal}
//                                         >
//                                             Got it, thanks!
//                                         </button>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </>
//     )
// }

// export default Register;

"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        // TODO: Replace with real API call
        setTimeout(() => {
            setLoading(false);
            setSuccessMsg("Account created! Please check your email to verify.");
        }, 1200);
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        // TODO: Replace with real Google OAuth flow
        setTimeout(() => {
            setLoading(false);
            setSuccessMsg("Signed up with Google!");
        }, 1000);
    };

    return (
        <>
            {/* <button
                className="ml-4 rounded-lg bg-brand-600 px-5 py-2 text-white font-medium hover:bg-brand-700 transition"
                onClick={openModal}
            >
                Sign Up
            </button> */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
                <div className='hidden lg:block'>
                    <button className="text-blue text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out leafbutton bg-lightblue hover:text-white hover:bg-blue" onClick={openModal}>
                        Sign up
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
                                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src="/assets/signin/logo.svg"
                                            alt="logo"
                                            className="h-12 w-12"
                                        />
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
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-gray-900 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                                                placeholder="Phone number (optional)"
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

                                    {/* Google Signup */}
                                    <button
                                        onClick={handleGoogleSignup}
                                        className="flex w-full items-center justify-center gap-3 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50"
                                    >
                                        <FcGoogle className="h-5 w-5" />
                                        Sign up with Google
                                    </button>

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
};

export default Register;
