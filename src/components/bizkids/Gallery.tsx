import React, { useState } from 'react';
import Image from 'next/image';
import { galleryService } from './galleryService';
import SectionHeading from '@/components/common/SectionHeading';

interface GalleryProps {
  title?: string;
}

export default function Gallery({ title = "Gallery" }: GalleryProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const folders = galleryService.getAllFolders();
  const selectedFolderImages = selectedFolder ? galleryService.getFolderImages(selectedFolder) : [];

  return (
    <div>
      <SectionHeading title={title} />
      
      {/* Show folders when no folder is selected */}
      {!selectedFolder && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {folders.map((folder) => (
            <div 
              key={folder.glry_id}
              onClick={() => setSelectedFolder(folder.glry_id)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={folder.cover_img_tx || folder.imgs[0]?.img_url_tx || '/placeholder.jpg'}
                  alt={folder.glry_nm}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{folder.glry_nm}</h3>
                <p className="text-sm text-gray-500 mt-1">{new Date(folder.glry_dt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600 mt-2">{folder.dscn_tx}</p>
                <p className="text-sm text-blue-600 mt-2">{folder.imgs.length} images →</p>
              </div>
            </div>
          ))}
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedFolderImages.map((image) => (
              <div 
                key={image.img_id} 
                className="relative group aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all"
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
    </div>
  );
}
