import Image from 'next/image';
import Layout from '../../../components/layout/Layout';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
  image: string;
}

// This would typically come from a CMS or database
const getBlogPost = (slug: string): BlogPost => {
  // Example post data
  return {
    title: 'The Future of Technology',
    date: '2025-05-01',
    author: 'John Doe',
    category: 'Technology',
    content: `
      The future of technology is an exciting frontier that continues to evolve at an unprecedented pace. As we look ahead, several key trends are shaping the way we interact with technology and how it influences our daily lives.

      ## Artificial Intelligence and Machine Learning

      One of the most significant developments in recent years has been the advancement of artificial intelligence and machine learning. These technologies are becoming increasingly sophisticated, enabling new applications across various industries:

      - Healthcare diagnostics and treatment planning
      - Autonomous vehicles and transportation systems
      - Personalized education and learning experiences
      - Smart city infrastructure and management

      ## Quantum Computing

      Quantum computing represents another frontier in technological advancement. This revolutionary approach to computation has the potential to solve complex problems that are beyond the capabilities of classical computers:

      - Drug discovery and development
      - Climate modeling and weather prediction
      - Financial modeling and risk assessment
      - Cryptography and security systems

      ## Sustainable Technology

      As we move forward, the focus on sustainable technology solutions becomes increasingly important:

      - Renewable energy systems
      - Energy-efficient computing
      - Sustainable manufacturing processes
      - Green infrastructure development

      ## The Impact on Society

      These technological advancements will have far-reaching implications for society:

      1. Changing workforce dynamics
      2. New educational requirements
      3. Ethical considerations
      4. Privacy and security challenges

      ## Conclusion

      The future of technology holds immense promise for solving some of humanity's greatest challenges. However, it's crucial that we approach these developments thoughtfully and responsibly, ensuring that technological progress benefits all of society.
    `,
    image: '/blog/tech-future.jpg',
  };
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  return (
    <Layout>
      <article className="pt-0 pb-16">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-200">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('##')) {
                  // Handle subheadings
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                } else if (paragraph.trim().startsWith('-')) {
                  // Handle bullet points
                  return (
                    <ul key={index} className="list-disc pl-6 mb-4">
                      <li>{paragraph.replace('-', '').trim()}</li>
                    </ul>
                  );
                } else if (paragraph.trim().match(/^\d\./)) {
                  // Handle numbered lists
                  return (
                    <ol key={index} className="list-decimal pl-6 mb-4">
                      <li>{paragraph.replace(/^\d\./, '').trim()}</li>
                    </ol>
                  );
                } else if (paragraph.trim()) {
                  // Handle regular paragraphs
                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Share and Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Share:</span>
                  <button className="text-gray-600 hover:text-blue-600">
                    Twitter
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    LinkedIn
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
