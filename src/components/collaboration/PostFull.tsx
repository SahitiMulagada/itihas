'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type PostData } from './types';
import Post from './Post';
import Comments from './Comments';
import { HiX, HiShare, HiArrowsExpand, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PostFullProps {
  post: PostData;
  onClose?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const PostFull: React.FC<PostFullProps> = ({ post, onClose, onNext, onPrevious }) => {
  const [isLoggedIn] = useState(false); // TODO: Replace with actual auth state

  const mockComments = [
    {
      id: '1',
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: 'This is a great initiative! Looking forward to participating.',
      createdAt: new Date('2025-06-09T04:30:00'),
    },
    {
      id: '2',
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      content: 'Thanks for sharing this information. Very helpful!',
      createdAt: new Date('2025-06-09T03:45:00'),
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title || 'Shared Post',
          text: 'Check out this post!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-6 py-4">

                <div className="items-left">
                  {/* Title */}
                  {post.title && (
                  <div className="px-4 pt-4">
                    <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                  </div>
                )}
                </div>

                <div className="flex items-right space-x-2">
                              <button
                                onClick={handleShare}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                title="Share post"
                              >
                                <HiShare className="w-5 h-5" />
                              </button>
                              <Link
                                href={`/collaboration/post/${post.id}`}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                title="Open in full page"
                              >
                                <HiArrowsExpand className="w-5 h-5" />
                              </Link>
                            <button
                              onClick={onClose}
                              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                              title="Close"
                            >
                              <HiX className="w-5 h-5" />
                            </button>
                </div>

          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <Post post={post} isExpanded={true} />
        </div>

        {/* Comments Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Comments postId={post.id} comments={mockComments} isLoggedIn={isLoggedIn} />
        </div>

        {/* Navigation */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 pointer-events-auto"
              title="Previous post"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 pointer-events-auto"
              title="Next post"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
 
  );
};

export default PostFull;
