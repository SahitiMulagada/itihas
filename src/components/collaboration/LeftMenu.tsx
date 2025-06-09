'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { type PostGroup } from './collaborationService';
import { isActive } from '@tiptap/react';
import { getIcon } from './icons';

interface LeftMenuProps {
  menuItems: PostGroup[];
  isCollapsed?: boolean;
  onToggle?: () => void;
}



const LeftMenu: React.FC<LeftMenuProps> = ({ menuItems, isCollapsed = false, onToggle }) => {
  const pathname = usePathname() || '';
  const currentHandler = pathname.split('/').pop() || '';
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
    <div className={`h-full bg-white border-r border-gray-200 overflow-y-auto ${isCollapsed ? 'w-0' : 'w-64'} transition-all duration-300`}>
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-gray-800 text-center">Collaboration</h2>
          
          {/* Feed Link */}
          <Link 
            href="/collaboration/feed" 
            className={`block mt-4 px-4 py-2 rounded-lg transition-colors ${pathname === '/collaboration/feed' 
              ? 'bg-blue-50 text-blue-600 font-medium' 
              : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              Latest Feed
            </div>
          </Link>

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
                          className="flex-shrink-0 transition-colors duration-200"
                          style={{ color: item.clr_cd }}
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
    </div>
  );
};

export default LeftMenu;
