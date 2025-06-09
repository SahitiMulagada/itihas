'use client';

import { useEffect, useState } from 'react';
import PostComponent from '@/components/collaboration/Post';
import PostFull from '@/components/collaboration/PostFull';
import { getAllPosts } from '@/components/collaboration/collaborationService';
import type { PostData } from '@/components/collaboration/types';

export default function Feed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        // Sort posts by date, newest first
        const sortedPosts = allPosts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Latest Updates</h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          onOpenFullPost={() => setSelectedPost(post)}
        />
        ))}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet.</p>
          </div>
        )}
      </div>

      {/* Post Full View */}
      {selectedPost && (
        <div className="fixed inset-0 z-50">
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
        </div>
      )}
    </div>
  );
}
