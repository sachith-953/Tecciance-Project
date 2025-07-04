
'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../../store';
import { logout } from '../auth/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Job Board</div>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-4 mt-4 md:mt-0`}>
        {user ? (
          <>
            <Link href="/dashboard" className="block md:inline-block py-2 px-4 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
            {user.role === 'candidate' && (
              <Link href="/apply" className="block md:inline-block py-2 px-4 hover:bg-gray-700 rounded">
                Apply
              </Link>
            )}
            {user.role === 'recruiter' && (
              <Link href="/post-job" className="block md:inline-block py-2 px-4 hover:bg-gray-700 rounded">
                Post Job
              </Link>
            )}
            {user.role === 'admin' && (
              <Link href="/manage-recruiters" className="block md:inline-block py-2 px-4 hover:bg-gray-700 rounded">
                Manage Recruiters
              </Link>
            )}
            <button
              onClick={() => dispatch(logout())}
              className="block md:inline-block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/" className="block md:inline-block py-2 px-4 hover:bg-gray-700 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;