import Image from "next/image";
import { PhoneCall, CloudUpload, ShieldCheck, Search } from "lucide-react";
interface whydata {
    heading: string;
    subheading: string;
}

const whydata: whydata[] = [
    {
        heading: "Sync your contacts",
        subheading: "Connect your Google account to import your contacts phone numbers.",
    },
    {
        heading: "Dial  888-Support or 888-787-7678",
        subheading: "Say a name or use the keypad menu. We’ll find the right contact.",
    },
    {
        heading: "Connect instantly",
        subheading: "We bridge the call and bill only for the minutes you use.",
    }
]


const Howitworks = () => {
    return (
        <section id="howitworks" className="bg-lightblue">

            <div className='mx-auto max-w-7xl px-4 my-20 sm:py-20 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>

                    {/* COLUMN-1 */}
                    <div className="flex items-center justify-center py-8">
                        <Image src="/assets/howitworks/howitworks.png" alt="howit-image" width={480} height={400} />
                    </div>

                    {/* COLUMN-2 */}
                    <div>
                        <h3 className="text-4xl text-navyblue lg:text-4xl pt-4 font-semibold sm:leading-tight mt-5 text-center lg:text-start">How it works</h3>
                        <h4 className="text-lg pt-4 font-normal sm:leading-tight text-center text-beach lg:text-start">Three steps to your next call. The rest runs automatically.</h4>

                        <div className="mt-8">
                            {/* {whydata.map((items, i) => (
                                <div className="flex mt-4" key={i}>
                                    <div className="rounded-full h-10 w-12 flex items-center justify-center bg-circlebg">
                                        <Image src="/assets/howitworks/check.svg" alt="check-image" width={24} height={24} />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-2xl font-semibold">{items.heading}</h4>
                                        <h5 className="text-lg text-beach font-normal mt-2">{items.subheading}</h5>
                                    </div>
                                </div>
                            ))} */}

                            <Card
                                icon={<CloudUpload className="h-6 w-6" />}
                                title="Sync your contacts"
                                text="Connect your Google account to import your contacts phone numbers."
                            />
                            <Card
                                icon={<Search className="h-6 w-6" />}
                                title="Dial 888 support or 888-888-888"
                                text="Say a name or use the keypad menu. We’ll find the right contact."
                            />
                            <Card
                                icon={<PhoneCall className="h-6 w-6" />}
                                title="Connect instantly"
                                text="We bridge the call and bill only for the minutes you use."
                            />
                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}

function Card({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) {
    return (
        <div className="p-2 shadow-soft">
            <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center rounded-xl bg-brand-50 text-brand-700 h-11 w-11">
                    {icon}
                </div>
                <h3 className="text-2xl font-semibold">{title}</h3>
            </div>
            <p className="text-lg ml-16">{text}</p>
        </div>

    );
}

export default Howitworks;
