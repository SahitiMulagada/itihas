import { collaborationService } from '@/components/collaboration/collaborationService';
import PageContent from '@/components/collaboration/PageContent';

export function generateStaticParams() {
  const menuItems = collaborationService.getMenuItems();
  return menuItems.map((item) => ({
    handler: item.hndlr_tx,
  }));
}

export default function CollaborationPage({ params }: { params: { handler: string } }) {
  const menuItems = collaborationService.getMenuItems();
  return <PageContent menuItems={menuItems} />;
}
