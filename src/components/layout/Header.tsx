'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Members', path: '/members' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us.', path: '/contact' },
  ];

const [username, setUsername] = useState<string | null>(null);
const [userImageUrl, setUserImageUrl] = useState('');

useEffect(() => {
  function getUsernameFromGglUsrDtls() {
    try {
      const userDataString = localStorage.getItem('gglUsrDtls');
      if (!userDataString) return null;
      const decodedString = atob(userDataString); 
      const userData = JSON.parse(decodedString);
      return userData.user_name || null;
    } catch {
      return null;
    }
  }
  setUsername(getUsernameFromGglUsrDtls());
}, []);

useEffect(() => {
  const userDataString = localStorage.getItem('gglUsrDtls');
  if (userDataString) {
    try {
      const decodedString = atob(userDataString);
      const userData = JSON.parse(decodedString);
      setUserImageUrl(userData.userImageUrl || userData.picture || '');
    } catch (error) {
      console.log('Error parsing userData:', error);
    }
  }
}, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800 flex items-center">
            Itiha
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-lg ml-0.5 transform hover:rotate-12 transition-transform duration-300">
              s
            </span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <li key={item.path} className="relative">
                  <Link
                    href={item.path}
                    className={`${pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                    } transition-colors duration-200 group`}
                  >
                    {item.label}
                    {pathname === item.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {username && (
  <div
    className="flex items-center justify-between gap-2 ml-4 w-[200px] truncate px-3 py-1 rounded-md bg-gray-100 border border-gray-300"
    title={username}
  >
    <div className="flex items-center">
          {userImageUrl && (
            <img
              src={userImageUrl}
              alt={username || 'User'}
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <span className="truncate font-medium text-gray-700">{username}</span>
        </div>
    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = '/';
      }}
      title="Logout"
      className="text-gray-500 hover:text-red-600 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
        />
      </svg>
    </button>
  </div>
)}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
            <button
      onClick={() => {
        localStorage.clear();
        window.location.href = '/';
      }}
      title="Logout"
      className="text-gray-500 hover:text-red-600 transition-colors md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
        />
      </svg>
    </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`${isMobileMenuOpen ? 'flex' : 'hidden'} absolute top-full left-0 right-0 bg-white shadow-lg md:hidden flex-col py-4 px-4`}
          >
            <ul className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                    } block py-2 px-4 rounded transition-colors duration-200`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
           {username && (
  <div
    className="flex items-center justify-between gap-2 ml-4 w-[200px] truncate px-3 py-1 rounded-md bg-gray-100 border border-gray-300"
    title={username}
  >
    <div className="flex items-center">
      {userImageUrl && (
        <img
          src={userImageUrl}
          alt={username || 'User'}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <span className="truncate font-medium text-gray-700">{username}</span>
    </div>
    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = '/';
      }}
      title="Logout"
      className="text-gray-500 hover:text-red-600 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
        />
      </svg>
    </button>
  </div>
)}

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
