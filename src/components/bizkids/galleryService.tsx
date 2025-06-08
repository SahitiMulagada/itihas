import { GalleryFolder, GalleryService } from '../projects/types';

const galleryFolders: GalleryFolder[] = [
  {
    glry_id: '1',
    gplry_nm: 'Pre-event Arrangements',
    glry_dt: '2025-06-07',
    dscn_tx: 'Images taken before the event',
    cover_img_tx: '/projects/bizkids/gallery/setup/IMG_8260.jpg',
    imgs: [
      {
        img_id: '1',
        img_url_tx: '/projects/bizkids/gallery/setup/IMG_8260.jpg'
      },
      {
        img_id: '2',
        img_url_tx: '/projects/bizkids/gallery/setup/IMG_8259.jpg'
      },
      {
        img_id: '3',
        img_url_tx: '/projects/bizkids/gallery/setup/IMG_8262.jpg'
      }
    ]
  },
  {
    glry_id: '2',
    gplry_nm: 'Event Day',
    glry_dt: '2025-06-08',
    dscn_tx: 'Images from the main event',
    cover_img_tx: '/projects/bizkids/gallery/event/IMG_8260.jpg',
    imgs: [
      {
        img_id: '4',
        img_url_tx: '/projects/bizkids/gallery/event/IMG_8260.jpg'
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
