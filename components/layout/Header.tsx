'use client'

import Link from 'next/link';
import { User } from '@/lib/getMe';
import ModalConfirmation from '../modals/ModalConfirmation';
import { useModal } from '@/context/ModalContext';
// import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import IconLogOut from '../icons/auth/IconLogOut';

const Header = ({ user }: { user: User }) => {

  // const router = useRouter();
  const { openModal, closeModal } = useModal();

  function handleLogOut() {
    openModal(
      <ModalConfirmation
        onCancel={closeModal}
        onConfirm={async () => await signOut({ redirect: true, callbackUrl: '/' })}
        text="Are you sure you want to log out?"
      />,
    );
  }

  return (
    <header>
      <div className="bg-siteColor">
        <div className="custom_container">
          <div className="flex h-13 items-center justify-between py-2 gap-4 flex-wrap">
            <div className="flex items-center gap-5 flex-wrap">
              <Link
                href="tel:5037551398"
                className="flex items-center gap-2 text-white text-sm hover:opacity-80 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>503 755-1398</span>
              </Link>
              <Link
                href="mailto:info@oregontruckpermit.com"
                className="flex items-center gap-2 text-white text-sm hover:opacity-80 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>info@oregontruckpermit.com</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-white text-sm font-medium">
                    {user.full_name || user.email}
                  </span>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-md border border-white px-4 py-1.5 text-sm font-medium text-white hover:bg-white hover:text-siteColor transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center rounded-md bg-white px-4 py-1.5 text-sm font-medium text-siteColor hover:bg-white/90 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-tertiary">
        <div className="custom_container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-white text-lg font-semibold tracking-wide hover:opacity-90 transition">
              Oregon Truck Permit
            </Link>
            {user && (
              <button
                key="logout-desktop"
                onClick={handleLogOut}
                className={`flex items-center cursor-pointer duration-300 lg:text-base font-semibold text-white hover:opacity-70`}
              >
                <IconLogOut className="mr-2" />
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
