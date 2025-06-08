'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiShare, HiOutlineChat, HiX } from 'react-icons/hi';
import PostFull from './PostFull';
import { type PostProps } from './types';

const Post: React.FC<PostProps> = ({ post }) => {
  const [showFullPost, setShowFullPost] = useState(false);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'Just now';
  };

  const renderMedia = () => {
    const imageCount = post.images?.length || 0;
    const videoCount = post.videos?.length || 0;
    const documentCount = post.documents?.length || 0;

    return (
      <div className="mt-4 space-y-4">
        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {post.images.slice(0, 6).map((image, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
            {imageCount > 6 && (
              <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">+{imageCount - 6} more</span>
              </div>
            )}
          </div>
        )}

        {/* Videos */}
        {post.videos && post.videos.length > 0 && (
          <div className="space-y-2">
            {post.videos.slice(0, 1).map((video, index) => (
              <video
                key={index}
                controls
                className="w-full rounded-lg"
                src={URL.createObjectURL(video)}
              />
            ))}
            {videoCount > 1 && (
              <div className="text-gray-600">+{videoCount - 1} more videos</div>
            )}
          </div>
        )}

        {/* Documents */}
        {post.documents && post.documents.length > 0 && (
          <div className="space-y-2">
            {post.documents.slice(0, 2).map((doc, index) => (
              <a
                key={index}
                href={URL.createObjectURL(doc)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="ml-2 text-gray-700">{doc.name}</span>
              </a>
            ))}
            {documentCount > 2 && (
              <div className="text-gray-600">+{documentCount - 2} more documents</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {post.user.avatar ? (
              <Image
                src={post.user.avatar}
                alt={post.user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-medium">
                {post.user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{post.user.name}</h3>
            <p className="text-xs text-gray-500">{formatTimestamp(post.createdAt)}</p>
          </div>
        </div>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1 text-gray-600 text-sm"
          onClick={() => navigator.share?.({ url: window.location.href })}
        >
          <HiShare className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Dates */}
        {post.dates && (
          <div className="text-sm text-gray-500">
            {post.dates.start.toLocaleDateString()} 
            {post.dates.end && ` - ${post.dates.end.toLocaleDateString()}`}
          </div>
        )}

        {/* Location */}
        {post.location && (
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {post.location}
          </div>
        )}

        {/* Description */}
        {post.description && (
          <p className="text-gray-700">
            {post.description.length > 280 ? `${post.description.slice(0, 280)}...` : post.description}
          </p>
        )}

        {/* Media */}
        {renderMedia()}

        {/* HTML Content */}
        {post.htmlContent && (
          <div 
            className="prose max-w-none max-h-40 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-end text-sm">
          <button 
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setShowFullPost(true)}
          >
            <HiOutlineChat className="w-5 h-5" />
            <span>{post.commentsCount || 0} comments</span>
          </button>
        </div>
      </div>

      {/* Full Post Popup */}
      {showFullPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowFullPost(false)}
            >
              <HiX className="w-6 h-6 text-gray-500" />
            </button>
            <PostFull post={post} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
