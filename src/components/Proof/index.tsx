import { Check } from "lucide-react";
import Image from "next/image";

const Proof = () => {
    return (
        <section className="bg-lightblue">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    {/* LEFT: image */}
                    <div className="flex justify-center md:justify-start">
                        <Image src="/assets/proof/proof.png" alt="iPad-image" width={4000} height={900} />
                    </div>

                    {/* RIGHT: copy */}
                    <div>
                        <h2 className="text-3xl text-center lg:text-4xl font-semibold text-midnightblue">
                            Simple, Private, Carrier-grade
                        </h2>
                        <p className="text-lg mt-4 text-bluegray">
                            Dial one 855-50Hotline number, search by voice or keypad, and connect instantly.
                            Your contacts stay encrypted, and calls route over reliable carrier-grade
                            infrastructure for clear, dependable connections.
                        </p>

                        <ul className="mt-6 space-y-3 text-midnightblue">
                            <li className="flex items-start gap-3">
                                <Check className="h-5 w-5 text-blue mt-0.5" />
                                No monthly fee — pay per minute only when you call
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="h-5 w-5 text-blue mt-0.5" />
                                IVR & voice search for fast contact lookup
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="h-5 w-5 text-blue mt-0.5" />
                                Privacy-first: contact backup with encryption at rest
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Proof;
