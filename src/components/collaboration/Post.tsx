'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type PostProps } from './types';

const Post: React.FC<PostProps> = ({ post, isExpanded = false }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const renderMedia = () => {
    const imageCount = post.images?.length || 0;
    const videoCount = post.videos?.length || 0;
    const documentCount = post.documents?.length || 0;

    return (
      <div className="mt-4 space-y-4">
        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {post.images.slice(0, expanded ? undefined : 3).map((image, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
            {!expanded && imageCount > 3 && (
              <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">+{imageCount - 3} more</span>
              </div>
            )}
          </div>
        )}

        {/* Videos */}
        {post.videos && post.videos.length > 0 && (
          <div className="space-y-2">
            {post.videos.slice(0, expanded ? undefined : 1).map((video, index) => (
              <video
                key={index}
                controls
                className="w-full rounded-lg"
                src={URL.createObjectURL(video)}
              />
            ))}
            {!expanded && videoCount > 1 && (
              <div className="text-gray-600">+{videoCount - 1} more videos</div>
            )}
          </div>
        )}

        {/* Documents */}
        {post.documents && post.documents.length > 0 && (
          <div className="space-y-2">
            {post.documents.slice(0, expanded ? undefined : 2).map((doc, index) => (
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
            {!expanded && documentCount > 2 && (
              <div className="text-gray-600">+{documentCount - 2} more documents</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Dates */}
      {post.dates && (
        <div className="text-sm text-gray-500 mb-4">
          {post.dates.start.toLocaleDateString()} 
          {post.dates.end && ` - ${post.dates.end.toLocaleDateString()}`}
        </div>
      )}

      {/* Location */}
      {post.location && (
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {post.location}
        </div>
      )}

      {/* Description */}
      {post.description && (
        <div className={`text-gray-700 ${!expanded && 'line-clamp-3'}`}>
          {post.description}
        </div>
      )}

      {/* Media */}
      {renderMedia()}

      {/* Embedded Content */}
      {post.embeddedContent && (
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.embeddedContent }} />
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Poll */}
      {post.poll && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">{post.poll.question}</h3>
          <div className="space-y-2">
            {post.poll.options.map((option, index) => (
              <button
                key={index}
                className="w-full p-2 text-left border border-gray-200 rounded hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Review */}
      {post.review && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < post.review!.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700">{post.review.text}</p>
        </div>
      )}

      {/* HTML Content */}
      {post.htmlContent && (
        <div 
          className={`mt-4 prose max-w-none ${!expanded && 'max-h-40 overflow-hidden'}`}
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      )}

      {/* Expand/Collapse Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>

      {/* Comments Section */}
      {post.allowComments && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">Comments</h3>
          {/* Add comments implementation here */}
        </div>
      )}
    </div>
  );
};

export default Post;
