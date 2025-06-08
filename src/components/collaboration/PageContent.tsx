'use client';

import { useParams } from 'next/navigation';
import { type PostGroup } from './collaborationService';

interface PageContentProps {
  menuItems: PostGroup[];
}

export default function PageContent({ menuItems }: PageContentProps) {
  const params = useParams();
  const handler = params.handler as string;
  const currentItem = menuItems.find(item => item.hndlr_tx === handler);

  if (!currentItem) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">The requested page does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
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
      
      {/* Content area - to be implemented based on handler */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">Content for {currentItem.pst_grp_nm}</p>
      </div>
    </div>
  );
}
