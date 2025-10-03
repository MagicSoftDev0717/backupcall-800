import React, { Fragment } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // ✅ import session + signOut
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";


interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/dashboard', current: true },
  { name: 'Contacts', href: '/contacts', current: false },
  { name: 'History', href: '/history', current: false },
  { name: 'Billing', href: '/billing', current: false },
  { name: 'Settings', href: '/settings', current: false },
  // { name: 'More', href: '', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Data = () => {

  const { data: session } = useSession(); // ✅ get session data

  const router = useRouter();


  const handleNavClick = (href: string) => {
    if (!session) {
      // User is not logged in → open sign-up modal
      window.location.href = "/signup";
    } else {
      // Logged in → navigate normally
      router.push(href);
    }
  };
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                // href={item.href}
                className={classNames(
                  item.current ? 'text-black hover:opacity-100' : 'hover:text-black hover:opacity-100',
                  'px-2 py-1 text-lg font-normal opacity-75 block'
                )}
                aria-current={item.current ? 'page' : undefined}
                onClick={() => handleNavClick(item.href)}>
                {item.name}
              </button>
            ))}
            <div className="mt-4"></div>

            {!session ? (
              <>
                <Link className="bg-white w-full text-blue border border-lightblue font-medium py-2 px-4 rounded"
                  href="/signin">
                  Sign In
                </Link>
                <Link className="bg-lightblue w-full hover:bg-blue hover:text-white text-blue font-medium my-2 py-2 px-4 rounded"
                  href="/signup">
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex flex-col items-start gap-3 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-bluegray text-white flex items-center justify-center font-bold">
                    {session.user?.email?.[0].toUpperCase() ?? "U"}
                  </div>
                  <span className="text-sm text-darkgray">{session.user?.email}</span>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 text-sm font-semibold text-navyblue px-2 py-2 rounded hover:bg-slate-100 w-full"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;
