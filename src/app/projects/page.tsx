import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import SectionTitle from '../../components/common/SectionTitle';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Rainbow Vista - BizKids',
      description: 'Kids Entrepreneurship event focused on developing business skills and fostering creativity in young minds.',
      image: '/projects/bizkids/logo.jpg',
      slug: 'rainbow-vista/bizkids',
      technologies: ['Workshop Planning', 'Educational Design', 'Interactive Learning'],
    },
    {
      id: 2,
      title: 'Training Exercises',
      description: 'Comprehensive collection of training materials and exercises designed for skill development.',
      image: '/projects/training-exercises/logo.png',
      slug: 'training-exercises',
      technologies: ['Education', 'Training', 'Development'],
    },
    {
      id: 3,
      title: 'Visakhapatnam Urban Lab',
      description: 'Urban development and planning initiatives for sustainable city growth.',
      image: '/projects/v-pull/logo.png',
      slug: 'vizag-urban-lab',
      technologies: ['Urban Planning', 'Development', 'Sustainability'],
    },
    {
      id: 4,
      title: 'Sports Split',
      description: 'Mobile application for sports enthusiasts to connect and organize events.',
      image: '/projects/sports-split/logo.png',
      slug: 'sports-split',
      technologies: ['Mobile Development', 'React Native', 'Node.js'],
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <div className="bg-blue-100 py-5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <SectionTitle title="Our Projects" subtitle="Discover the initiatives and activities that are making a difference in our community" />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {/* <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
