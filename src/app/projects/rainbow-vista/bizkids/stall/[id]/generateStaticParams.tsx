import React from 'react';
import Image from 'next/image';
import Layout from '../../../../../../components/layout/Layout';
import Link from 'next/link';
import { MdOutlineChevronRight } from 'react-icons/md';

import { useSession } from 'next-auth/react';
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
  // In a real app, we would fetch this data based on the id
  const stallData: Record<string, StallDetails> = {
    'creative-crafts': {
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
    },
    'tech-toys': {
      id: 'tech-toys',
      name: 'Tech Toys',
      category: 'Technology & Innovation',
      coverImage: '/stalls/tech-toys-cover.jpg',
      profileImage: '/stalls/tech-toys-profile.jpg',
      entrepreneurs: [
        {
          name: 'Alex Kumar',
          age: 14,
          school: 'Rainbow International School',
          image: '/entrepreneurs/alex.jpg',
          blockNo: 'C2',
          flatNo: '504',
        },
      ],
      description: 'Tech Toys showcases innovative gadgets and toys created by young tech enthusiasts.',
      posterImage: '/stalls/tech-toys-poster.jpg',
      videoUrl: 'https://www.youtube.com/embed/example2',
      reviews: [
        {
          author: 'David Lee',
          rating: 5,
          comment: 'Incredible innovation from young minds!',
          date: '2025-05-03',
        },
      ],
    },
    'eco-friendly': {
      id: 'eco-friendly',
      name: 'Eco Friendly Products',
      category: 'Sustainability',
      coverImage: '/stalls/eco-friendly-cover.jpg',
      profileImage: '/stalls/eco-friendly-profile.jpg',
      entrepreneurs: [
        {
          name: 'Priya Sharma',
          age: 13,
          school: 'Delhi Public School',
          image: '/entrepreneurs/priya.jpg',
          blockNo: 'A1',
          flatNo: '302',
        },
      ],
      description: 'Eco Friendly Products offers sustainable alternatives for everyday items.',
      posterImage: '/stalls/eco-friendly-poster.jpg',
      videoUrl: 'https://www.youtube.com/embed/example3',
      reviews: [
        {
          author: 'Sarah Wilson',
          rating: 5,
          comment: 'Love the eco-friendly initiatives!',
          date: '2025-05-04',
        },
      ],
    },
  };

  return stallData[id] || stallData['creative-crafts'];
};

export async function generateStaticParams() {
  // This would typically come from your database
  // For now, we'll return some example stall IDs
  return [
    { id: 'creative-crafts' },
    { id: 'tech-toys' },
    { id: 'eco-friendly' },
  ];
}

const StallPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { data: session } = useSession();
  const [stall, setStall] = React.useState(() => getStallDetails(params.id));

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
                alt={`${stall.name} cover image`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </>
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600" />
          )}

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-8 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
            <Image
              src={stall.profileImage}
              alt={`${stall.name} profile`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{stall.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{stall.category}</p>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Our Stall</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{stall.description}</p>

                {/* Entrepreneurs Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Meet Our Young Entrepreneurs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stall.entrepreneurs.map((entrepreneur, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={entrepreneur.image}
                            alt={entrepreneur.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{entrepreneur.name}</h4>
                          <p className="text-gray-600 text-sm">Age: {entrepreneur.age}</p>
                          <p className="text-gray-600 text-sm">{entrepreneur.school}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            Block {entrepreneur.blockNo}, Flat {entrepreneur.flatNo}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>
                
                {/* Add Review Form */}
                <div className="mb-8">
                  <ReviewForm onSubmit={handleReviewSubmit} />
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {stall.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{review.author}</h3>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Poster Image */}
              {stall.posterImage && (
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden">
                    <Image
                      src={stall.posterImage}
                      alt={`${stall.name} poster`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Video Embed */}
              {stall.videoUrl && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      src={stall.videoUrl}
                      title={`${stall.name} video`}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StallPage;


