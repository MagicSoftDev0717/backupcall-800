"use client";
import Image from "next/image";


import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const scenarios = [
    {
        id: 1,
        src: "/assets/hero/1.png",
        alt: "Person in jail calling",
        caption: "Call from jail or detention",
        description:
            "Easily access your contacts even when you're in jail or detention and need to make an urgent call.",
    },
    {
        id: 2,
        src: "/assets/hero/2.png",
        alt: "Person lost phone",
        caption: "Access contacts when your phone is lost",
        description:
            "Even if you lose your phone, your contact list is safe and you can make calls from any other phone.",
    },
    {
        id: 3,
        src: "/assets/hero/3.png",
        alt: "Traveling person",
        caption: "Stay connected while traveling",
        description:
            "No matter where you travel, dial the 800 number and stay connected to your contacts worldwide.",
    },
    {
        id: 4,
        src: "/assets/hero/4.png",
        alt: "Using someone else's phone",
        caption: "Make calls from a borrowed phone",
        description:
            "Quickly access your contacts from any borrowed phone — no need to log in manually every time.",
    },
    {
        id: 5,
        src: "/assets/hero/5.png",
        alt: "Using someone else's phone",
        caption: "Make calls from a borrowed phone",
        description:
            "Quickly access your contacts from any borrowed phone — no need to log in manually every time.",
    },
];

const Banner = () => {
    const [selectedScenario, setSelectedScenario] = useState<null | number>(null);
    return (
        <main>
            <div className="px-6 lg:px-8 bg-lightblue">
                <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 banner-image">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold text-navyblue sm:text-5xl  lg:text-5xl md:4px lh-48 py-8">
                            Back up your contacts. <br /> Call them anywhere.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-bluegray">
                            Sync your contacts in one click, dial a single 800 number, and
                            connect instantly<br />at a low per-minute rate. No apps required to call.
                        </p>
                    </div>


                    <div className="text-center mt-5">
                        <button type="button" className='text-15px text-white font-medium bg-blue py-5 px-9 mt-2 leafbutton'>
                            Get Started - it&lsquo;s free
                        </button>
                        <button type="button" className='text-15px ml-4 mt-2 text-blue transition duration-150 ease-in-out hover:text-white hover:bg-blue font-medium py-5 px-12 border border-lightgrey leafbutton'>
                            See how it works
                        </button>
                    </div>

                    {/* <div className="flex justify-center">
                        <Image
                            src="/assets/banner/dashboard2.svg"
                            alt="banner-image"
                            width={1000}
                            height={698}
                        />
                    </div> */}

                    <div className="mx-auto max-w-7xl pt-20 pb-24 banner-image text-center">
                        {/* HEADLINE */}
                        <h1 className="text-4xl font-bold text-navyblue sm:text-5xl lg:text-5xl leading-tight">
                            Access Your Contacts from Anywhere
                        </h1>
                        <p className="mt-6 text-lg text-bluegray max-w-2xl mx-auto">
                            Securely back up your contacts and make calls when you need them —
                            even from someone else’s phone. No app required to dial out.
                        </p>

                        {/* CTA BUTTONS */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-blue text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
                                Get Started – it&apos;s Free
                            </button>
                            <button className="border border-lightgrey text-blue font-medium px-8 py-4 rounded-full hover:bg-blue hover:text-white hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
                                See How It Works
                            </button>
                        </div>

                        {/* HERO IMAGE GRID */}
                        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4 justify-items-center">
                            {scenarios.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedScenario(item.id)}
                                    className="group relative flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl duration-300"
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={300}
                                        height={380}
                                        className="rounded-xl object-cover"
                                    />
                                    <p className="mt-2 text-sm text-navyblue font-medium group-hover:text-blue transition-colors">
                                        {item.caption}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* POPUP MODAL */}
                        <Transition appear show={selectedScenario !== null} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-50"
                                onClose={() => setSelectedScenario(null)}
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-6">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-90"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-90"
                                        >
                                            <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                                                {selectedScenario && (
                                                    <>
                                                        <Image
                                                            src={
                                                                scenarios.find((s) => s.id === selectedScenario)
                                                                    ?.src || ""
                                                            }
                                                            alt="scenario-image"
                                                            width={500}
                                                            height={350}
                                                            className="rounded-xl mb-4 object-cover"
                                                        />
                                                        <Dialog.Title className="text-xl font-semibold text-navyblue">
                                                            {
                                                                scenarios.find((s) => s.id === selectedScenario)
                                                                    ?.caption
                                                            }
                                                        </Dialog.Title>
                                                        <p className="mt-2 text-bluegray text-sm">
                                                            {
                                                                scenarios.find((s) => s.id === selectedScenario)
                                                                    ?.description
                                                            }
                                                        </p>
                                                        <div className="mt-4 text-right">
                                                            <button
                                                                onClick={() => setSelectedScenario(null)}
                                                                className="bg-blue text-white rounded-lg px-4 py-2 hover:bg-brand-700 transition"
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>

                </div>


            </div>
        </main >
    )
}

export default Banner;
