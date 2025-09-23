"use client";

import { FormEvent } from "react";

export default function ContactSection() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle form submit logic
    };

    return (
        <section id="contactus" className="scroll-mt-24 pt-0 pb-20">
            <div className="">
                <h2 className="mb-9 text-navyblue text-center text-5xl font-bold">
                    Contact Us
                </h2>
                <div className="flex justify-center">
                    <div className="relative border max-w-7xl border-navyblue/10 px-6 py-6 rounded-2xl">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-wrap w-full mx-auto justify-between"
                        >
                            {/* Full Name + Email */}
                            <div className="sm:flex gap-6 w-full">
                                <div className="mx-0 my-2.5 flex-1">
                                    <label htmlFor="fname" className="pb-3 inline-block text-base">
                                        Full Name
                                    </label>
                                    <input
                                        id="fname"
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full text-base px-4 rounded-2xl py-2.5 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-none"
                                        name="fullname"
                                    />
                                </div>

                                <div className="mx-0 my-2.5 flex-1">
                                    <label htmlFor="email" className="pb-3 inline-block text-base">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        className="w-full text-base px-4 rounded-2xl py-2.5 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-none"
                                        name="email"
                                    />
                                </div>
                            </div>

                            {/* Service + Budget */}
                            <div className="sm:flex gap-6 w-full">
                                <div className="mx-0 my-2.5 flex-1">
                                    <label
                                        htmlFor="service"
                                        className="pb-3 inline-block text-base"
                                    >
                                        Question Type
                                    </label>
                                    <select
                                        name="service"
                                        id="service"
                                        className="w-full text-base px-4 rounded-2xl py-2.5 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-none"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Choose the Type
                                        </option>
                                        <option value="Marketing">About</option>
                                        <option value="Graphic design">Service</option>
                                        <option value="Heaking">Trubleshooting</option>
                                        <option value="UI/UX design">Other</option>
                                    </select>
                                </div>

                                 <div className="mx-0 my-2.5 flex-1">
                                    <label htmlFor="email" className="pb-3 inline-block text-base">
                                        Title
                                    </label>
                                    <input
                                        id="tiel"
                                        type="text"
                                        placeholder="Title"
                                        className="w-full text-base px-4 rounded-2xl py-2.5 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-none"
                                        name="title"
                                    />
                                </div>
                               
                            </div>

                            {/* Message */}
                            <div className="mx-0 my-2.5 flex-1 w-full">
                                <label htmlFor="message" className="text-base inline-block">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full mt-2 rounded-2xl px-5 py-3 border border-black/20 transition-all duration-500 focus:border-primary focus:outline-none"
                                    placeholder="Anything else you want to communicate"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="mx-0 my-2.5 w-full">
                                <button
                                    type="submit"
                                    className="border leading-none px-6 text-lg font-medium py-4 rounded-full bg-primary/15 text-beach hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
