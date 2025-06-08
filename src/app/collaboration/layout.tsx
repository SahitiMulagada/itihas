'use client';

import { collaborationService } from '@/components/collaboration/collaborationService';
import LeftMenu from '@/components/collaboration/LeftMenu';

export default function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = collaborationService.getMenuItems();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftMenu menuItems={menuItems} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
