'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const UserMenu = dynamic(() => import('../auth/UserMenu'), { ssr: false });

export default function HeaderClient() {
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
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Itihas
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`relative py-2 ${
                      pathname === item.path
                        ? 'text-blue-600 font-medium'
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

          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
