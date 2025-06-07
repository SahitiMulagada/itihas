'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function UserMenu() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          {session.user?.name || session.user?.email}
        </span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      Sign in
    </button>
  );
}
