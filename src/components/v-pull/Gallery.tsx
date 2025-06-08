'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryService } from './galleryService';
import SectionHeading from '@/components/common/SectionHeading';

interface GalleryProps {
  title?: string;
}

interface FullScreenImageProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const FullScreenImage = ({ src, alt, onClose }: FullScreenImageProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  </div>
);

export default function Gallery({ title = "Gallery" }: GalleryProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<{ src: string; alt: string } | null>(null);
  const folders = galleryService.getAllFolders();
  const selectedFolderImages = selectedFolder ? galleryService.getFolderImages(selectedFolder) : [];

  const handleImageClick = (src: string, alt: string) => {
    setFullScreenImage({ src, alt });
  };

  return (
    <div>
      <SectionHeading title={title} />
      
      {/* Show folders when no folder is selected */}
      {!selectedFolder && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {folders.map((folder) => {
            const image = folder.imgs[0];
            return (
              <div 
                key={folder.glry_id}
                onClick={() => folder.imgs.length === 1 
                  ? handleImageClick(image.img_url_tx, image.caption || folder.glry_nm)
                  : setSelectedFolder(folder.glry_id)
                }
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={folder.cover_img_tx || image.img_url_tx}
                    alt={folder.glry_nm}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{folder.glry_nm}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(folder.glry_dt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600 mt-2">{folder.dscn_tx}</p>
                  {folder.imgs.length > 1 && (
                    <p className="text-sm text-blue-600 mt-2">{folder.imgs.length} images →</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Show images when a folder is selected */}
      {selectedFolder && (
        <div>
          <button
            onClick={() => setSelectedFolder(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to folders
          </button>

          {/* Event Details */}
          {folders.map(folder => folder.glry_id === selectedFolder && (
            <div key={folder.glry_id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{folder.glry_nm}</h2>
              <p className="text-sm text-gray-500 mb-2">{new Date(folder.glry_dt).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p className="text-gray-600 mb-6">{folder.dscn_tx}</p>
            </div>
          ))}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedFolderImages.map((image) => (
              <div 
                key={image.img_id}
                onClick={() => handleImageClick(image.img_url_tx, image.caption || 'Gallery image')}
                className="relative group aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Image
                  src={image.img_url_tx}
                  alt={image.caption || 'Gallery image'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Screen Image View */}
      {fullScreenImage && (
        <FullScreenImage
          src={fullScreenImage.src}
          alt={fullScreenImage.alt}
          onClose={() => setFullScreenImage(null)}
        />
      )}
    </div>
  );
}
