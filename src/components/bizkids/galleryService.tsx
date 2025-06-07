interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    url: '/projects/bizkids/gallery/setup/IMG_8260.jpg',
    category: 'setup'
  },
  {
    id: '2',
    url: '/projects/bizkids/gallery/setup/IMG_8259.jpg',
    category: 'setup'
  },
  {
    id: '3',
    url: '/projects/bizkids/gallery/setup/IMG_8262.jpg',
    category: 'setup'
  },
  {
    id: '4',
    url: '/projects/bizkids/gallery/setup/IMG_8260.jpg',
    category: 'setup'
  }
];

export const galleryService = {
  getAllImages: () => galleryImages,
  getImagesByCategory: (category: string) => galleryImages.filter(img => img.category === category)
};
