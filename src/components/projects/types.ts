export interface GalleryImage {
  img_id: string;
  img_url_tx: string;
  caption?: string;
}

export interface GalleryFolder {
  glry_id: string;
  gplry_nm: string;
  glry_dt: string;
  dscn_tx: string;
  imgs: GalleryImage[];
  cover_img_tx?: string;
}

export interface GalleryService {
  getAllFolders: () => GalleryFolder[];
  getFolderById: (id: string) => GalleryFolder | undefined;
  getFolderImages: (id: string) => GalleryImage[];
}
