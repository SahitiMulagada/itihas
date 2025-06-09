'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type PostProps } from './types';
import Post from './Post';
import Comments from './Comments';
import { HiX, HiShare, HiArrowsExpand, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PostFullProps extends PostProps {
  onClose?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const PostFull: React.FC<PostFullProps> = ({ post, onClose, onNext, onPrevious }) => {
  if (!onClose) return null; // Don't render modal if no close handler (full page view)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        {/* Vertical centering */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle bg-white rounded-lg shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
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
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              title="Close"
            >
              <HiX className="w-5 h-5" />
            </button>
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
          <div className="flex justify-between px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
              onClick={onPrevious}
              disabled={!onPrevious}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            <button
              onClick={onNext}
              disabled={!onNext}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFull;
