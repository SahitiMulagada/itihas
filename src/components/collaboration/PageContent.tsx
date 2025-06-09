'use client';

import { useState, useEffect } from 'react';
import { getIcon } from './icons';
import { useParams } from 'next/navigation';
import { type PostGroup } from './collaborationService';
import { postManagementService } from './postManagementService';
import { type PostData } from './types';
import PostInput from './PostInput';
import Post from './Post';

interface PageContentProps {
  menuItems: PostGroup[];
}

interface SavedPost extends PostData {
  id: string;
  createdAt: Date;
}

export default function PageContent({ menuItems }: PageContentProps) {
  const params = useParams();
  const handler = params.handler as string;
  const [posts, setPosts] = useState<SavedPost[]>([]);
  
  const currentItem = menuItems.find(item => item.hndlr_tx === handler);
  const postSettings = currentItem ? postManagementService.getPostSettings(currentItem.pst_grp_id) : null;

  const handlePostSubmit = (postData: PostData) => {
    const newPost: SavedPost = {
      ...postData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    setPosts(prev => [newPost, ...prev]);
  };

  if (!currentItem) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-lg">
        Page not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      {currentItem && (
        <div className="flex-none bg-white border-b border-gray-200 shadow-sm">
          <div className="py-4 px-6">
            <div className="flex items-center space-x-4">
              {currentItem.icn_tx && (
                <span 
                  className="flex-shrink-0 transition-colors duration-200"
                  style={{ color: currentItem.clr_cd }}
                >
                  {getIcon(currentItem.icn_tx)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <h1 
                  className="text-xl font-semibold truncate"
                  style={{ color: currentItem.clr_cd }}
                >
                  {currentItem.pst_grp_nm}
                </h1>
                {currentItem.sb_tx && (
                  <p className="text-sm text-gray-600 truncate">{currentItem.sb_tx}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-6">
          {/* Post Input Section */}
          {postSettings && (
            <div className="pt-6">
              <PostInput
                pst_grp_id={postSettings.pst_grp_id}
                tmllts={postSettings.tmllts}
                onSubmit={handlePostSubmit}
              />
            </div>
          )}

          {/* Posts List */}
          <div className="py-8 space-y-6">
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
