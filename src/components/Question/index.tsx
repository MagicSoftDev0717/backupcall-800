import { HelpCircle } from "lucide-react";

interface FaqItemProps {
    q: string;
    a: string;
}

export function FaqItem({ q, a }: FaqItemProps) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
                <HelpCircle className="h-6 w-6 text-brand-600" />
                    <p className="text-lg text-slate-600">{q}</p>
            </div>
            <p className="mt-1 text-slate-600">{a}</p>
        </div>
    );
}
const Question = () => {
    return (
        <section id="faq" className="py-20 bg-lightblue">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl text-navyblue md:text-5xl lg:text-4xl font-semibold tracking-tight text-center">Common Questions</h2>
                <div className="mt-10 grid md:grid-cols-2 gap-6">
                    <FaqItem
                        q="Do I need to install an app to make calls?"
                        a="No. You just dial the 888 number from any phone and select a contact."
                    />

                    <FaqItem
                        q="How do you charge me?"
                        a="You only pay for the minutes you use. Add a card once; we bill after each call."
                    />

                    <FaqItem
                        q="Can I import iPhone contacts?"
                        a="Google Contacts is supported in the web MVP. iPhone one-tap sync arrives with the native app."
                    />

                    <FaqItem
                        q="Is my data private?"
                        a="We encrypt contacts and never sell data. You control import and deletion at any time."
                    />
                </div>
            </div>
        </section>
    )
}

export default Question;
