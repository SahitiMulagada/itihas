'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from '../auth/UserMenu';

const Header = () => {
  const pathname = usePathname();
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Members', path: '/members' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact' },
  ];

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
          <ul className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`relative py-2 ${pathname === item.path
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                  } transition-colors duration-200 group`}
                >
                  {item.label}
                  {pathname === item.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full transform scale-x-100"></span>
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <UserMenu />
            <button className="md:hidden p-2">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
