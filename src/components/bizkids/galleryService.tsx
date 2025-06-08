import { GalleryFolder, GalleryService } from '../projects/types';

const getMediaType = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  return extension === 'mp4' || extension === 'webm' ? 'video' : 'image';
};

const galleryFolders: GalleryFolder[] = [
  {
    glry_id: '1',
    glry_nm: 'Pre-event Arrangements',
    glry_dt: '2025-06-07',
    dscn_tx: 'Images taken before the event',
    cover_img_tx: '/projects/bizkids/gallery/setup/IMG_8260.jpg',
    imgs: [
      {
        img_id: '1',
        img_url_tx: '/projects/bizkids/gallery/setup/IMG_8260.jpg',
        type_tx: 'image'
      },
      {
        img_id: '2',
        img_url_tx: '/projects/bizkids/gallery/setup/IMG_8261.jpg',
        type_tx: 'image'
      },
      {
        img_id: '3',
        img_url_tx: '/projects/bizkids/gallery/setup/IMG_8259.jpg',
        type_tx: 'image'
      },
      {
        img_id: '4',
        img_url_tx: '/projects/bizkids/gallery/setup/IMG_8262.jpg',
        type_tx: 'image'
      }
    ]
  },
  {
    glry_id: '2',
    glry_nm: 'Event Day',
    glry_dt: '2025-06-08',
    dscn_tx: 'Images from the main event',
    cover_img_tx: '/projects/bizkids/gallery/event/stall0.JPG',
    imgs: [
      {
        img_id: '5',
        img_url_tx: '/projects/bizkids/gallery/event/stall0.JPG',
        type_tx: 'image'
      },{
        img_id: '13',
        img_url_tx: '/projects/bizkids/gallery/event/judges.JPG',
        type_tx: 'image'
      },{
        img_id: '6',
        img_url_tx: '/projects/bizkids/gallery/event/stall7.JPG',
        type_tx: 'image'
      },{
        img_id: '6',
        img_url_tx: '/projects/bizkids/gallery/event/stall2.JPG',
        type_tx: 'image'
      },{
        img_id: '7',
        img_url_tx: '/projects/bizkids/gallery/event/team1.JPG',
        type_tx: 'image'
      },{
        img_id: '8',
        img_url_tx: '/projects/bizkids/gallery/event/stall3.JPG',
        type_tx: 'image'
      },{
        img_id: '9',
        img_url_tx: '/projects/bizkids/gallery/event/stall4.JPG',
        type_tx: 'image'
      },{
        img_id: '10',
        img_url_tx: '/projects/bizkids/gallery/event/team2.JPG',
        type_tx: 'image'
      },{
        img_id: '11',
        img_url_tx: '/projects/bizkids/gallery/event/stall5.JPG',
        type_tx: 'image'
      },{
        img_id: '12',
        img_url_tx: '/projects/bizkids/gallery/event/stall6.JPG',
        type_tx: 'image'
      }
    ]
  }
];

const galleryService: GalleryService = {
  getAllFolders: () => galleryFolders,
  getFolderById: (id: string) => galleryFolders.find(folder => folder.glry_id === id),
  getFolderImages: (id: string) => galleryFolders.find(folder => folder.glry_id === id)?.imgs || []
};

export default galleryService;
