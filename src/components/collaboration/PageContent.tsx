'use client';

import { useState, useEffect } from 'react';
import { getIcon } from './icons';
import { useParams } from 'next/navigation';
import { HiMenu } from 'react-icons/hi';
import { type PostGroup } from './collaborationService';
import { postManagementService } from './postManagementService';
import { type PostData } from './types';
import PostInput from './PostInput';
import Post from './Post';
import PostFull from './PostFull';
import LeftMenu from './LeftMenu';

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
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  
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
    <div className="flex h-screen bg-gray-100">
      <div className={`transition-all duration-300 ${isMenuCollapsed ? 'w-0' : 'w-64'} overflow-hidden`}>
        <LeftMenu 
          menuItems={menuItems} 
          isCollapsed={isMenuCollapsed} 
          onToggle={() => setIsMenuCollapsed(!isMenuCollapsed)} 
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-full mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
                aria-label="Toggle menu"
              >
                <HiMenu className="w-6 h-6" />
              </button>
              <div className="flex-1">
                <h1
                  className="text-2xl font-semibold"
                  style={{ color: currentItem?.clr_cd }}
                >
                  {currentItem ? currentItem.pst_grp_nm : 'Feed'}
                </h1>
                {currentItem?.sb_tx && (
                  <p className="text-sm text-gray-600 truncate">{currentItem.sb_tx}</p>
                )}
              </div>
            </div>
          </div>
        </div>
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
                <Post 
                  key={post.id} 
                  post={post} 
                  onOpenFullPost={() => setSelectedPost(post)}
                />
              ))}
            </div>
          </div>
          {/* Post Full View */}
          {selectedPost && (
            <PostFull
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
              onNext={posts.indexOf(selectedPost) < posts.length - 1
                ? () => setSelectedPost(posts[posts.indexOf(selectedPost) + 1])
                : undefined}
              onPrevious={posts.indexOf(selectedPost) > 0
                ? () => setSelectedPost(posts[posts.indexOf(selectedPost) - 1])
                : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}
