'use client';

import { useState } from 'react';
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
    <div className="space-y-8">
      {currentItem && (
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold"
            style={{ color: currentItem.clr_cd }}
          >
            {currentItem.pst_grp_nm}
          </h1>
          {currentItem.sb_tx && (
            <p className="text-gray-600 mt-2">{currentItem.sb_tx}</p>
          )}
        </div>
      )}
      
      {postSettings && (
        <PostInput
          pst_grp_id={postSettings.pst_grp_id}
          tmllts={postSettings.tmllts}
          onSubmit={handlePostSubmit}
        />
      )}

      <div className="space-y-6">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
