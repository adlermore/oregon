'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className='bg-siteColor'>
      <div className='custom_container'>
        <div className='flex xl:flex-row text-center flex-col-reverse  items-center py-7.5 gap-5 justify-between'>
          <p className='text-white  text-sm'>&copy; {new Date().getFullYear()} - All Rights Reserved.</p>
          <p className='text-white  text-sm'>This website is owned and operated by DOT Operating Authority, INC</p>
          <div className='sm:flex gap-4 items-center'>
            <Link href={'/terms-and-conditions'} className={`${pathname === '/terms-and-conditions' ? 'font-bold' : ''} block pb-2 sm:pb-0 text-white duration-300  text-sm hover:opacity-70 hover:underline`}>Terms & Condition</Link>
            <Link href={'/privacy-policy'} className={`${pathname === '/privacy-policy' ? 'font-bold' : ''} text-white duration-300 hover:opacity-70  text-sm hover:underline`}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;