import Link from "next/link";

const Pricing = () => {
    return (
      <section className="py-24 ml-2 mr-2 bg-lightblue">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-14 text-white text-center shadow-soft">
          <h3 className="text-3xl md:text-4xl font-bold">Ready to back up your contacts?</h3>
          <p className="mt-3 text-white/90">
            Create your account in seconds. Pay only when you call.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-brand-800 font-semibold hover:bg-slate-50 transition"
          >
            Get started free
          </Link>
        </div>
      </section>
      )
}

export default Pricing;
