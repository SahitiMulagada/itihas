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
  },
  {
    glry_id: '3',
    glry_nm: 'Certificates Distribution',
    glry_dt: '2025-06-08',
    dscn_tx: 'Images during certificate distribution',
    cover_img_tx: '/projects/bizkids/gallery/certificates/IMG_8311.JPG',
    imgs: [
      { img_id: '13', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_1111.jpg', type_tx: 'image' },

      { img_id: '15', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8312.JPG', type_tx: 'image' },
    
      { img_id: '17', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8316.JPG', type_tx: 'image' },
      { img_id: '18', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8317.JPG', type_tx: 'image' },
      { img_id: '19', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8322.JPG', type_tx: 'image' },
      { img_id: '20', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8326.JPG', type_tx: 'image' },
      { img_id: '21', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8329.JPG', type_tx: 'image' },
 
      { img_id: '23', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8332.JPG', type_tx: 'image' },
      { img_id: '24', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8335.JPG', type_tx: 'image' },
      { img_id: '25', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8342.JPG', type_tx: 'image' },
      { img_id: '26', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8345.JPG', type_tx: 'image' },
      { img_id: '27', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8349.JPG', type_tx: 'image' },
      { img_id: '28', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8350.JPG', type_tx: 'image' },
      { img_id: '29', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8355.JPG', type_tx: 'image' },
      { img_id: '30', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8356.JPG', type_tx: 'image' },
      { img_id: '31', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8358.JPG', type_tx: 'image' },
      { img_id: '32', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8360.JPG', type_tx: 'image' },
      { img_id: '33', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8362.JPG', type_tx: 'image' },
      { img_id: '34', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8364.JPG', type_tx: 'image' },
      { img_id: '35', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8368.JPG', type_tx: 'image' },
      { img_id: '36', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8372.JPG', type_tx: 'image' },
      { img_id: '37', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8377.JPG', type_tx: 'image' },
      { img_id: '38', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8380.JPG', type_tx: 'image' },

      { img_id: '40', img_url_tx: '/projects/bizkids/gallery/certificates/IMG_8383.jpg', type_tx: 'image' }
    ]
  }
];

const galleryService: GalleryService = {
  getAllFolders: () => galleryFolders,
  getFolderById: (id: string) => galleryFolders.find(folder => folder.glry_id === id),
  getFolderImages: (id: string) => galleryFolders.find(folder => folder.glry_id === id)?.imgs || []
};

export default galleryService;
