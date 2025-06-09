'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HiReply } from 'react-icons/hi';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
  isLoggedIn: boolean;
}

export default function Comments({ postId, comments, isLoggedIn }: CommentsProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit comment
    setNewComment('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-900">
        Comments ({comments.length})
      </h3>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600">Please log in to comment</p>
          <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
            Log in
          </button>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                {comment.user.avatar && (
                  <Image
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">
                  {comment.user.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <p className="text-sm text-gray-600">{comment.content}</p>
              <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700">
                <HiReply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
