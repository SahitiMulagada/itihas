import Link from 'next/link';
import Image from 'next/image';
import AnimatedBackground from '../common/AnimatedBackground';

const projects = [
  {
    id: 1,
    title: 'Rainbow Vista - BizKids',
    description: 'Kids Entrepreneurship event focused on developing business skills',
    image: '/projects/rainbow-vista.jpg',
    slug: 'rainbow-vista/bizkids',
  },
  {
    id: 2,
    title: 'Training Exercises',
    description: 'Collection of training materials and exercises',
    image: '/projects/training.jpg',
    slug: 'training-exercises',
  },
  {
    id: 3,
    title: 'Visakhapatnam Urban Lab',
    description: 'Urban development and planning initiatives',
    image: '/projects/vizag-urban-lab.jpg',
    slug: 'vizag-urban-lab',
  },
  {
    id: 4,
    title: 'Sports Split',
    description: 'Mobile app for sports enthusiasts',
    image: '/projects/sports-split.jpg',
    slug: 'sports-split',
  },
  {
    id: 5,
    title: 'Natural Remedies',
    description: 'Collection of natural health remedies and practices',
    image: '/projects/natural-remedies.jpg',
    slug: 'natural-remedies',
  },
];

const LatestProjects = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: 'transparent'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Stylish Header */}
        <div className="text-center mb-16 relative">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Explore Our Work</span>
          <div className="relative inline-block">
            <h2 className="text-5xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Latest Projects
            </h2>
            <div className="absolute -bottom-4 left-0 right-0 h-4 bg-yellow-200 transform -skew-x-12 opacity-50"></div>
            <div className="absolute -bottom-4 left-2 right-2 h-4 bg-purple-200 transform skew-x-12 opacity-50"></div>
          </div>
          <p className="text-gray-600 mt-8 max-w-2xl mx-auto text-lg">
            Discover our most recent work and innovative solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
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
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestProjects;
