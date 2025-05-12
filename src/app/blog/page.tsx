import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import SectionTitle from '../../components/common/SectionTitle';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'The Future of Technology',
      excerpt: 'Exploring upcoming trends in technology and their impact on our lives. From artificial intelligence to quantum computing, discover what lies ahead.',
      date: '2025-05-01',
      image: '/blog/tech-future.jpg',
      slug: 'future-of-technology',
      readTime: '5 min read',
      category: 'Technology',
    },
    {
      id: 2,
      title: 'Building Sustainable Solutions',
      excerpt: 'How we can create technology solutions that are environmentally conscious. Learn about green computing and sustainable development practices.',
      date: '2025-04-28',
      image: '/blog/sustainability.jpg',
      slug: 'sustainable-solutions',
      readTime: '4 min read',
      category: 'Sustainability',
    },
    {
      id: 3,
      title: 'Innovation in Education',
      excerpt: 'New approaches to learning and teaching in the digital age. Discover how technology is transforming the educational landscape.',
      date: '2025-04-25',
      image: '/blog/education.jpg',
      slug: 'innovation-education',
      readTime: '6 min read',
      category: 'Education',
    },
    {
      id: 4,
      title: 'The Rise of AI in Business',
      excerpt: 'Understanding how artificial intelligence is reshaping business processes and decision-making in modern enterprises.',
      date: '2025-04-22',
      image: '/blog/ai-business.jpg',
      slug: 'ai-in-business',
      readTime: '7 min read',
      category: 'AI',
    },
    {
      id: 5,
      title: 'Web Development Best Practices',
      excerpt: 'Essential practices and patterns for building modern, scalable web applications. Tips and tricks from real-world experience.',
      date: '2025-04-19',
      image: '/blog/web-dev.jpg',
      slug: 'web-development-best-practices',
      readTime: '8 min read',
      category: 'Development',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <div className="bg-blue-100 py-5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <SectionTitle title="Our Blog" subtitle="Stories, insights, and updates from our journey of making a difference" />
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 py-16">
          


          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
