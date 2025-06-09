import { HiCalendar, HiClipboardList, HiOutlineUserGroup, HiViewGrid } from 'react-icons/hi';

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'calendar':
      return <HiCalendar className="w-5 h-5" />;
    case 'clipboard':
      return <HiClipboardList className="w-5 h-5" />;
    case 'group':
      return <HiOutlineUserGroup className="w-5 h-5" />;
    case 'grid':
      return <HiViewGrid className="w-5 h-5" />;
    default:
      return null;
  }
};
