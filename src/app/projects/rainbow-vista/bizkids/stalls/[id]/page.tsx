'use client';

import Image from 'next/image';
import Layout from '../../../../../../components/layout/Layout';
import Link from 'next/link';
import { MdOutlineChevronRight } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { useState, use } from 'react';
import ReviewForm from '../../../../../../components/reviews/ReviewForm';

interface StallDetails {
  id: string;
  name: string;
  category: string;
  coverImage: string;
  profileImage: string;
  entrepreneurs: {
    name: string;
    age: number;
    school: string;
    image: string;
    blockNo: string;
    flatNo: string;
  }[];
  description: string;
  posterImage: string;
  videoUrl: string;
  reviews: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// This would typically come from a database
const getStallDetails = (id: string): StallDetails => {
  // Example data
  return {
    id: 'creative-crafts',
    name: 'Creative Crafts',
    category: 'Arts & Crafts',
    coverImage: '/stalls/creative-crafts-cover.jpg',
    profileImage: '/stalls/creative-crafts-profile.jpg',
    entrepreneurs: [
      {
        name: 'Sarah Johnson',
        age: 12,
        school: 'Rainbow International School',
        image: '/entrepreneurs/sarah.jpg',
        blockNo: 'B4',
        flatNo: '1204',
      },
      {
        name: 'Mike Chen',
        age: 13,
        school: 'Delhi Public School',
        image: '/entrepreneurs/mike.jpg',
        blockNo: 'A2',
        flatNo: '803',
      },
    ],
    description: 'Creative Crafts is a unique stall that showcases handmade artwork and crafts created by young artists. Our mission is to promote creativity and entrepreneurship among youth while providing beautiful, handcrafted items to our customers.',
    posterImage: '/stalls/creative-crafts-poster.jpg',
    videoUrl: 'https://www.youtube.com/embed/example',
    reviews: [
      {
        author: 'John Smith',
        rating: 5,
        comment: 'Amazing creativity and professional presentation!',
        date: '2025-05-01',
      },
      {
        author: 'Emily Brown',
        rating: 4,
        comment: 'Great variety of handmade items.',
        date: '2025-05-02',
      },
    ],
  };
};

export default function StallPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session } = useSession();
  const resolvedParams = use(params);
  const [stall, setStall] = useState(() => getStallDetails(resolvedParams.id));

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    const newReview = {
      author: session?.user?.name || 'Anonymous',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setStall(prev => ({
      ...prev,
      reviews: [newReview, ...prev.reviews]
    }));
  };

  return (
    <Layout>
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center text-sm">
              <Link href="/projects" className="text-green-600 hover:text-green-800">Projects</Link>
              <MdOutlineChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <span className="text-gray-600">Rainbow Vista - BizKids \ Stalls</span>
              <MdOutlineChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <span className="text-gray-600">{stall.name}</span>
            </div>
          </div>
        </nav>

      <div className="min-h-screen">
        {/* Cover Image or Pattern Background */}
        <div className="relative h-[300px] w-full border-b border-gray-200">
          {stall.coverImage ? (
            <>
              <Image
                src={stall.coverImage}
                alt={`${stall.name} Cover`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
            </>
          ) : (
            <div className="h-full w-full bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          )}
 </div>
        {/* Profile Section */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-24 mb-8 flex items-end">
            <div className="relative w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-gray-50">
              {stall.profileImage ? (
                <Image
                  src={stall.profileImage}
                  alt={stall.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <span className="text-6xl font-bold">{stall.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="ml-6 mb-4">
              <div className="text-sm text-blue-600 font-medium mb-2">{stall.category}</div>
              <h1 className="text-3xl font-bold mb-2">{stall.name}</h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Kid Entrepreneurs */}
              <section className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Kid Entrepreneurs</h2>
                <div className="grid grid-cols-1 gap-8">
                  {stall.entrepreneurs.map((entrepreneur, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-50 rounded-xl">
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={entrepreneur.image}
                          alt={entrepreneur.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow space-y-3 text-center md:text-left">
                        <h3 className="text-xl font-semibold">{entrepreneur.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="font-medium">{entrepreneur.age} years</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">School</p>
                            <p className="font-medium">{entrepreneur.school}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Block & Flat</p>
                            <p className="font-medium">B-XX, F-XXX</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* About */}
              <section className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">About Our Stall</h2>
                <p className="text-gray-600 leading-relaxed">{stall.description}</p>
              </section>

              {/* Poster - Only shown if posterImage exists */}
              {stall.posterImage && (
                <section className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Our Poster</h2>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={stall.posterImage}
                      alt="Stall Poster"
                      fill
                      className="object-contain"
                    />
                  </div>
                </section>
              )}

              {/* Video - Only shown if videoUrl exists */}
              {stall.videoUrl && (
                <section className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Watch Our Pitch</h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={stall.videoUrl}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Reviews */}
              <section className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <div className="text-sm text-gray-500">{stall.reviews.length} reviews</div>
                </div>

                {/* Review Form */}
                <div className="mb-8">
                  <ReviewForm onSubmit={handleReviewSubmit} />
                </div>

                <div className="space-y-6">
                  {stall.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{review.author}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
     
    </Layout>
  );
}
