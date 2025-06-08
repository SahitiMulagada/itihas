import { GalleryFolder, GalleryService } from '../projects/types';

const galleryFolders: GalleryFolder[] = [
  {
    glry_id: '1',
    gplry_nm: 'V-Pull Website Launch and Workshop',
    glry_dt: '2025-05-19',
    dscn_tx: 'Website launch event and workshop at Novotel Vizag',
    cover_img_tx: '/projects/v-pull/gallery/vpull-1.jpg',
    imgs: [
      {
        img_id: '1',
        img_url_tx: '/projects/v-pull/gallery/vpull-1.jpg'
      },
      {
        img_id: '2',
        img_url_tx: '/projects/v-pull/gallery/vpull-2.jpg'
      },
      {
        img_id: '3',
        img_url_tx: '/projects/v-pull/gallery/vpull-3.jpg'
      },
      {
        img_id: '4',
        img_url_tx: '/projects/v-pull/gallery/vpull-4.jpg'
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
