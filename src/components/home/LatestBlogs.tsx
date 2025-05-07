import Link from 'next/link';
import Image from 'next/image';

const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'The Future of Technology',
      excerpt: 'Exploring upcoming trends in technology and their impact on our lives.',
      date: '2025-05-01',
      image: '/blog/tech-future.jpg',
      slug: 'future-of-technology',
    },
    {
      id: 2,
      title: 'Building Sustainable Solutions',
      excerpt: 'How we can create technology solutions that are environmentally conscious.',
      date: '2025-04-28',
      image: '/blog/sustainability.jpg',
      slug: 'sustainable-solutions',
    },
    {
      id: 3,
      title: 'Innovation in Education',
      excerpt: 'New approaches to learning and teaching in the digital age.',
      date: '2025-04-25',
      image: '/blog/education.jpg',
      slug: 'innovation-education',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest from the Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600">{blog.excerpt}</p>
                  <p className="mt-4 text-blue-600 font-medium group-hover:text-blue-700">
                    Read More →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
