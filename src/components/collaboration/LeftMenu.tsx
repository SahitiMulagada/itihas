'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { type PostGroup } from './collaborationService';

interface LeftMenuProps {
  menuItems: PostGroup[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'calendar':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'star':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'ticket':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      );
    default:
      return null;
  }
};

const LeftMenu: React.FC<LeftMenuProps> = ({ menuItems }) => {
  const pathname = usePathname();
  const currentHandler = pathname.split('/').pop();
  const [searchQuery, setSearchQuery] = useState('');
  
  const showSearch = menuItems.length > 5;

  const filteredAndGroupedItems = useMemo(() => {
    const filtered = searchQuery
      ? menuItems.filter(item =>
          item.pst_grp_nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ctgry_nm?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : menuItems;

    return filtered.reduce((acc, item) => {
      const category = item.ctgry_nm || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, PostGroup[]>);
  }, [menuItems, searchQuery]);

  return (
    <nav className="w-64 bg-white min-h-screen shadow-lg flex flex-col border-r border-gray-200">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-gray-800">Collaboration</h2>
        
          {showSearch && (
            <div className="mb-6 relative mt-4">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 transition-colors duration-200"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="space-y-6 mt-6">
          {Object.entries(filteredAndGroupedItems).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2 border-l-2 border-transparent">
                {category}
              </h3>
              {items.map((item) => {
                const isActive = currentHandler === item.hndlr_tx;
                return (
                  <div key={item.pst_grp_id} className="px-2">
                    <Link
                      href={`/collaboration/page/${item.hndlr_tx}`}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative ${
                        isActive
                          ? 'bg-gray-100 text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      style={{
                        color: isActive ? item.clr_cd : undefined,
                        borderLeft: isActive ? `2px solid ${item.clr_cd}` : '2px solid transparent'
                      }}
                    >
                      {item.icn_tx && (
                        <span 
                          className={`flex-shrink-0 transition-colors duration-200 ${isActive ? '' : 'group-hover:text-gray-700'}`}
                          style={{ color: isActive ? item.clr_cd : undefined }}
                        >
                          {getIcon(item.icn_tx)}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="block font-medium truncate">{item.pst_grp_nm}</span>
                        {item.sb_tx && (
                          <span className="block text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-200">
                            {item.sb_tx}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default LeftMenu;
