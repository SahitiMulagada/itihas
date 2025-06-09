'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import Post from '@/components/collaboration/Post';
import Comments from '@/components/collaboration/Comments';

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const mockPost = {
    id: params.id,
    pst_grp_id: '1',
    tmplt_id: '1',
    title: 'Example Post',
    content: 'Post content...',
    user: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/300'
    },
    createdAt: new Date(),
    commentsCount: 2
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center space-x-4">
            <Link
              href="/collaboration/feed"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <HiArrowLeft className="w-5 h-5 mr-2" />
              Back to Feed
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <Post post={mockPost} isExpanded={true} />
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <Comments postId={params.id} comments={mockComments} isLoggedIn={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
