'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiShare, HiOutlineChat, HiX } from 'react-icons/hi';
import PostFull from './PostFull';
import { type PostProps, type PostData } from './types';

interface PostComponentProps {
  post: PostData;
  isExpanded?: boolean;
  onOpenFullPost?: () => void;
}

const Post: React.FC<PostComponentProps> = ({ post, isExpanded, onOpenFullPost }) => {

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
      <div >
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

  const handleClick = (e: React.MouseEvent) => {
    if (!isExpanded && onOpenFullPost) {
      e.stopPropagation();
      onOpenFullPost();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Title */}
      {post.title && !isExpanded && (
        <div className="px-4 pt-4">
          <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
        </div>
      )}

      {/* Header with user info and share button */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {post.user?.avatar && (
              <Image
                src={post.user.avatar}
                alt={post.user.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{post.user?.name}</div>
            <div className="text-sm text-gray-500">
              {formatTimestamp(new Date(post.createdAt))}
            </div>
          </div>
        </div>
        {!isExpanded && (

        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1 text-gray-600 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            navigator.share?.({ url: window.location.href });
          }}
        >
          <HiShare className="w-5 h-5" />
          <span>Share</span>
        </button>
        )}
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

        {/* Poll */}
        {post.poll && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <h3 className="font-medium text-gray-900">{post.poll.question}</h3>
            <div className="space-y-2">
              {post.poll.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-white hover:border-indigo-500 transition-colors"
                  onClick={onOpenFullPost}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
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
            onClick={(e) => {
              e.stopPropagation();
              onOpenFullPost?.();
            }}
          >
            <HiOutlineChat className="w-5 h-5" />
            <span>{post.commentsCount || 0} comments</span>
          </button>
        </div>
      </div>


    </div>
  );
};

export default Post;
