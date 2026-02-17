'use client'

import { User } from '@/lib/getMe';

const Header = ({ user }: { user: User }) => {
  console.log('user', user);
  return (
    <header className='h-20 bg-tertiary text-white flex items-center'>
      <div className='custom_container'>
        Header
      </div>
    </header>
  );
};

export default Header;