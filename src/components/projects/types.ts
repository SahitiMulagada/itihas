export interface GalleryMedia {
  img_id: string;
  img_url_tx: string;
  type_tx?: 'image' | 'video';
  thumbnail_url?: string;
  dscn_tx?: string;
}

export interface GalleryFolder {
  glry_id: string;
  glry_nm: string;
  glry_dt: string;
  dscn_tx: string;
  imgs: GalleryMedia[];
  cover_img_tx?: string;
}

export interface GalleryService {
  getAllFolders: () => GalleryFolder[];
  getFolderById: (id: string) => GalleryFolder | undefined;
  getFolderImages: (id: string) => GalleryImage[];
}
