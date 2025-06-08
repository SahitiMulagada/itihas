'use client';

import { type PostProps } from './types';
import Post from './Post';

const PostFull: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Post post={post} isExpanded={true} />
    </div>
  );
};

export default PostFull;
