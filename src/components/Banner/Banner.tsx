import Image from "next/image";

const Banner = () => {
    return (
        <main>
            <div className="px-6 lg:px-8">
                <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 banner-image">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold text-navyblue sm:text-5xl  lg:text-5xl md:4px lh-48">
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

                </div>


            </div>
        </main>
    )
}

export default Banner;
