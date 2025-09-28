import Link from "next/link";
import Image from "next/image";

// MIDDLE LINKS DATA
interface ProductType {
    id: number;
    link: string[];
}

const products: ProductType[] = [
    {
        id: 1,
        link: ['Home', 'Contacts', 'Billing', 'Settings']
    },
    {
        id: 2,
        link: ['About', 'How it works', 'Pricing', 'Contact', 'FAQ'],
    },

]

const footer = () => {
    return (
        <div className="bg-darkblue -mt-16">
            <div className="mx-auto max-w-2xl pt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="my-2 flex justify-center grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8 items-start">

                    {/* COLUMN-1 */}
                    <div className='col-span-4 md:col-span-12 lg:col-span-1'></div>
                    <div className='col-span-4 md:col-span-12 lg:col-span-4'>
                        <div className="flex items-center gap-4 pb-8">
                            <img
                                src="/assets/footer/logo.svg"
                                alt="logo icon"
                                className="w-14 h-14"
                            />
                            <img
                                src="/assets/footer/logo-text.svg"
                                alt="logo text"
                                className="w-64 h-auto"
                            />
                        </div>
                        <div className='flex gap-14'>
                            <Link href="https://facebook.com" className='footer-fb-icons'>
                                <Image src={'/assets/footer/facebook.svg'} alt="facebook" width={15} height={10} />
                            </Link>
                            <Link href="https://twitter.com" className='footer-icons'>
                                <Image src={'/assets/footer/x.com.svg'} alt="x.com" width={20} height={20} />
                            </Link>
                            <Link href="https://instagram.com" className='footer-icons'>
                                <Image src={'/assets/footer/instagram.svg'} alt="instagram" width={20} height={15} />
                            </Link>
                        </div>
                    </div>

                    {/* CLOUMN-2/3 */}

                    {products.map((product) => (
                        <div key={product.id} className="group relative col-span-2 md:col-span-4 lg:col-span-2">
                            <ul>
                                {product.link.map((link: string, index: number) => (
                                    <li key={index} className='mb-5'>
                                        <Link href="/" className="text-white text-medium font-normal mb-6 space-links">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* CLOUMN-4 */}

                    {/* <div className='col-span-4 md:col-span-4 lg:col-span-4'>
                        <div className="flex gap-2">
                            <Image src={'/assets/footer/mask.svg'} alt="mask-icon" width={24} height={24} />
                            <h5 className="text-base font-normal text-offwhite">925 Filbert Street Pennsylvania 18072</h5>
                        </div>
                        <div className="flex gap-2 mt-10">
                            <Image src={'/assets/footer/telephone.svg'} alt="telephone-icon" width={24} height={24} />
                            <h5 className="text-base font-normal text-offwhite">+ 1 (555) 234 5678 </h5>
                        </div>
                        <div className="flex gap-2 mt-10">
                            <Image src={'/assets/footer/email.svg'} alt="email-icon" width={24} height={24} />
                            <h5 className="text-base font-normal text-offwhite">info@backupcall.com</h5>
                        </div>
                    </div> */}

                    <div className='col-span-4 md:col-span-4 lg:col-span-3'>
                        <div className="flex gap-2">
                            <h5 className="text-base font-normal text-offwhite">Apps</h5>
                        </div>
                        <div className="flex gap-2 mt-6 mb-4">
                            <Image src={'/assets/footer/app-store.svg'} alt="appstore-icon" width={156} height={78} />
                        </div>
                        <div className="flex gap-2 mt-8 mb-4">
                            <Image src={'/assets/footer/google-play.svg'} alt="googleplay-icon" width={156} height={78} />
                        </div>
                    </div>


                </div>

                {/* All Rights Reserved */}

                <div className='py-10 lg:flex items-center justify-between border-t border-t-bordertop'>
                    <h4 className='text-offwhite text-sm text-center lg:text-start font-normal'>@2025 DialBackup. All Rights Reserved by <Link href="https://dialbackup.com/" target="_blank"> dialbackup.com</Link></h4>
                    <div className="flex gap-5 mt-5 lg:mt-0 justify-center lg:justify-start">
                        <h4 className='text-offwhite text-sm font-normal'><Link href="/privacy">Privacy policy</Link></h4>
                        <div className="h-5 bg-bordertop w-0.5"></div>
                        <h4 className='text-offwhite text-sm font-normal'><Link href="/terms">Terms & conditions</Link></h4>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default footer;
