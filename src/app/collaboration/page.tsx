import { redirect } from 'next/navigation';
import { collaborationService } from '@/components/collaboration/collaborationService';

export default function CollaborationPage() {
  const menuItems = collaborationService.getMenuItems();
  if (menuItems.length > 0) {
    redirect(`/collaboration/page/${menuItems[0].hndlr_tx}`);
  }
  
  return null;
}
