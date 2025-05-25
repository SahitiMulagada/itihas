'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function UserMenu() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!session) {
    return (
      <button
        onClick={() => signIn('google', { callbackUrl: window.location.href })}
        className="group relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg border border-gray-200 transition-colors duration-300"
      >
        {/* Animated border */}
        <span className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-500 transition-all duration-300"></span>
        
        {/* Google icon with gradient on hover */}
        <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
          <svg className="w-5 h-5 group-hover:text-blue-600 transition-colors duration-300" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </div>
        
        {/* Text with hover effect */}
        <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">
          Sign in with Google
        </span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="group relative flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors duration-200"
      >
        {/* Animated ring on hover */}
        <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all duration-300"></span>
        
        {session.user?.image ? (
          <div className="relative transform group-hover:scale-105 transition-transform duration-200">
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="rounded-full ring-2 ring-white"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-200">
            {session.user?.name?.[0] || 'U'}
          </div>
        )}
      </button>

      {/* Dropdown menu with animation */}
      <div className={`absolute right-0 mt-2 w-64 transition-all duration-200 origin-top-right ${isMenuOpen ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-1 overflow-hidden">
          {/* User info section */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
            <p className="text-xs text-gray-500 truncate mt-0.5">{session.user?.email}</p>
          </div>
          
          {/* Menu items */}
          <div className="py-1">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
