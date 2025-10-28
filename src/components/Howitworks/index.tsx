import Image from "next/image";
import { PhoneCall, CloudUpload, Search, ShieldCheck } from "lucide-react";
interface whydata {
    heading: string;
    subheading: string;
}

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
                        <h3 className="text-4xl text-navyblue lg:text-4xl pt-4 font-semibold sm:leading-tight mt-5 text-center lg:text-start">How DialBackup works</h3>
                        <h4 className="text-lg pt-4 font-normal sm:leading-tight text-center text-beach lg:text-start">Three steps to your next call. The rest runs automatically.</h4>

                        <div className="mt-8">

                            <Card
                                icon={<CloudUpload className="h-6 w-6" />}
                                title="Sync your google contacts"
                                text="Sign in with Google and grant read-only access (names & phone numbers). We never change your Google data."
                            />
                            <Card
                                icon={<Search className="h-6 w-6" />}
                                title="Dial ial our toll-free number"
                                text="Say a name or use the keypad—we’ll match the right person from your Google Contacts."
                            />
                            <Card
                                icon={<PhoneCall className="h-6 w-6" />}
                                title="Connect instantly"
                                text="We bridge the call through our toll-free line and bill only for connected minutes. Not for emergency calls."
                            />

                            <Card
                                icon={<ShieldCheck className="h-6 w-6" />}
                                title="Disconnect & delete"
                                text="Revoke Google access and delete synced contacts anytime in Settings."
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-midnightblue">Data we access & why</h3>
                        <p className="mt-2">
                            After you sign in with Google, DialBackup requests <code>contacts.readonly</code> to read
                            your contacts’ names and phone numbers so you can place calls from our toll-free number.
                            Access is read-only — we never edit your Google data. You can disconnect Google and delete
                            synced contacts anytime at <a href="/settings" className="underline">/settings</a>.
                        </p>
                        <div className="mt-3 text-sm">
                            <a href="/privacy" className="underline">Privacy Policy</a>
                            <span className="mx-2">•</span>
                            <a href="/terms" className="underline">Terms</a>
                            <span className="mx-2">•</span>
                            <a href="mailto:info@dialbackup.com" className="underline">info@dialbackup.com</a>
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
