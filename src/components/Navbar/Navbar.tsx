// import { Disclosure } from '@headlessui/react';
// import { Bars3Icon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import React from 'react';
// import Drawer from "./Drawer";
// import Drawerdata from "./Drawerdata";
// import Signdialog from "./Signdialog";
// import Registerdialog from "./Registerdialog";
// import Logo from '..//Logo/index';

// interface NavigationItem {
//     name: string;
//     href: string;
//     current: boolean;
// }

// const navigation: NavigationItem[] = [
//     { name: 'Home', href: '/', current: true },
//     { name: 'How it works', href: '#howitworks', current: false },
//     { name: 'Pricing', href: '#pricing', current: false },
//     { name: 'FAQ', href: '#faq', current: false },
//     { name: 'Cantact Us', href: '#contact', current: false },
   
// ]

// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

// const Navbar = () => {

//     const [isOpen, setIsOpen] = React.useState(false);

//     return (
//         <Disclosure as="nav" className="navbar">
//             <>
//                 <div className="mx-auto max-w-7xl px-6 lg:py-0 lg:px-8">
//                     <div className="relative flex h-20 items-center justify-between">
//                         <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">

//                             <Logo />

//                             {/* LINKS */}

//                             <div className="hidden lg:block m-auto">
//                                 <div className="flex space-x-4">
//                                     {navigation.map((item) => (
//                                         <Link
//                                             key={item.name}
//                                             href={item.href}
//                                             className={classNames(
//                                                 item.current ? ' text-black hover:opacity-100' : 'hover:text-black hover:opacity-100',
//                                                 'px-3 py-4 text-lg font-normal opacity-75 space-links'
//                                             )}
//                                             aria-current={item.href ? 'page' : undefined}
//                                         >
//                                             {item.name}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* SIGNIN DIALOG */}

//                         <Signdialog />


//                         {/* REGISTER DIALOG */}

//                         <Registerdialog />


//                         {/* DRAWER FOR MOBILE VIEW */}

//                         {/* DRAWER ICON */}

//                         <div className='block lg:hidden'>
//                             <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
//                         </div>

//                         {/* DRAWER LINKS DATA */}

//                         <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
//                             <Drawerdata />
//                         </Drawer>

//                     </div>
//                 </div>
//             </>
//         </Disclosure>
//     )
// }

// export default Navbar;


"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Fragment } from "react";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import Logo from "../Logo";

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Contacts", href: "/contacts" },
  { name: "Billing", href: "/billing" },
  { name: "Settings", href: "/settings" },
   { name: "Pricing", href: "#pricing" },
];

const dropdownLinks = [
  { name: "How it works", href: "#howitworks" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact Us", href: "#contactus" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            {/* LEFT: LOGO + LINKS */}
            <div className="flex flex-1 items-center">
              <Logo />

              <div className="hidden lg:flex items-center ml-10 space-x-6">
                {mainLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-lg font-medium text-slate-700 hover:text-slate-900"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* DROPDOWN MENU */}
                <Menu as="div" className="relative">
                  <Menu.Button className="inline-flex items-center gap-1 px-3 py-2 text-lg font-medium text-slate-700 hover:text-slate-900">
                    More
                    <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {dropdownLinks.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? "bg-slate-100 text-slate-900" : "text-slate-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            {/* RIGHT: SIGN-IN / REGISTER */}
            <div className="flex items-center gap-4">
              <Signdialog />
              <Registerdialog />
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="block lg:hidden">
              <Bars3Icon
                className="h-6 w-6 cursor-pointer"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER FOR MOBILE */}
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
