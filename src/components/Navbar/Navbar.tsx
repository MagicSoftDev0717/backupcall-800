"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Fragment } from "react";
import { useSession, signOut } from "next-auth/react"; // ✅ import session + signOut
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signindlg";
import Logo from "../Logo";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import Signupdialog, { RegisterHandle } from "./Signupdlg"; // ✅ import with forwardRef

const mainLinks = [
  { name: "Home", href: "/dashboard" },
  { name: "Contacts", href: "/contacts" },
  { name: "Billing", href: "/billing" },
  { name: "Settings", href: "/settings" },
  // { name: "Pricing", href: "#pricing" },
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
  const { data: session } = useSession(); // ✅ get session data

  const router = useRouter();
  const signupRef = useRef<RegisterHandle>(null); // ✅ access signup modal

  const handleNavClick = (href: string) => {
    if (!session) {
      // User is not logged in → open sign-up modal
      signupRef.current?.openModal();
    } else {
      // Logged in → navigate normally
      router.push(href);
    }
  };
  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            {/* LEFT: LOGO + LINKS */}
            <div className="flex flex-1 items-center">
              <Logo />

              <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center space-x-6">
                {/* <div className="hidden lg:flex items-center ml-10 space-x-6"> */}
                {mainLinks.map((item) => (
                  <button
                    key={item.name}
                    // href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="px-3 py-2 text-lg font-medium text-beach hover:text-darkgray"
                  >
                    {item.name}
                  </button>
                ))}

                <Link
                    // key={item.name}
                    href="/#pricing"
                    // onClick={() => handleNavClick(item.href)}
                    className="px-3 py-2 text-lg font-medium text-beach hover:text-darkgray"
                  >
                    Pricing
                  </Link>

                {/* DROPDOWN MENU */}
                <Menu as="div" className="relative">
                  <Menu.Button className="inline-flex items-center gap-1 px-3 py-2 text-lg font-medium text-beach hover:text-darkgray">
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
                                active ? "bg-slate-100  text-center text-darkgray" : "text-center text-beach",
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
              {!session ? (
                <>
                  {/* Show Sign In / Sign Up if not logged in */}
                  <Signdialog />
                  <Signupdialog />
                </>
              ) : (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center focus:outline-none">
                    {/* User avatar or fallback circle with first letter */}
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full border border-slate-300"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-bluegray text-white flex items-center justify-center font-bold">
                        {session.user?.email?.[0].toUpperCase() ?? "U"}
                      </div>
                    )}
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
                    <Menu.Items className="absolute right-0 mt-6 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-2 text-sm text-darkgray">
                        {session.user?.email}
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className={classNames(
                              active ? "bg-slate-100" : "",
                              "flex w-full text-left px-4 py-2 text-sm text-navyblue"
                            )}
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
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
