import React from "react";
import Link from "next/link";

import { useRef } from "react";
import Register, { RegisterHandle } from "../Navbar/Signupdlg";
import Login, { LoginHandle } from "../Navbar/Signindlg";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/dashboard', current: true },
  { name: 'Contacts', href: '/contacts', current: false },
  { name: 'Billing', href: '/billing', current: false },
  { name: 'Settings', href: '/settings', current: false },
  { name: 'More', href: '', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Data = () => {
  const registerRef = useRef<RegisterHandle>(null);
  const loginRef = useRef<LoginHandle>(null);
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'text-black hover:opacity-100' : 'hover:text-black hover:opacity-100',
                  'px-2 py-1 text-lg font-normal opacity-75 block'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>
            <button className="bg-white w-full text-blue border border-lightblue font-medium py-2 px-4 rounded"
              onClick={() => loginRef.current?.openModal()}>
              Sign In
            </button>
            <button className="bg-lightblue w-full hover:bg-blue hover:text-white text-blue font-medium my-2 py-2 px-4 rounded"
              onClick={() => registerRef.current?.openModal()}>
              Sign up
            </button>
          </div>
        </div>
      </div>
      {/* Mount the same Sign-up Modal once */}
      <Register ref={registerRef} />
      <Login ref={loginRef} />
    </div>
  );
}

export default Data;
