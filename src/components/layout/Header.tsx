'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
