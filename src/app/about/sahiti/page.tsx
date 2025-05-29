import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';

export default function About() {
  const skills = [
    {
      category: 'Programming Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'HTML/CSS'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Ionic Framework', 'Express', 'TailwindCSS'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'Figma', 'VS Code'],
    },
    {
      category: 'Soft Skills',
      items: ['Project Management', 'Team Leadership', 'Communication', 'Problem Solving'],
    },
  ];

  const hobbies = [
    {
      category: 'Technical',
      items: ['Programming'],
    },
    {
      category: 'Arts',
      items: ['Singing (Western Vocals)'],
    },
    {
      category: 'Sports',
      items: ['Playing Badminton'],
    },
    {
      category: 'Entertainment',
      items: ['Reading Manga'],
    },
  ];

  const clubs = [
    {
      name: 'Entrepreneurship Club',
      role: 'Active Member',
      activities: ['Participating in business competitions', 'Learning about startups', 'Developing entrepreneurial skills'],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center text-sm">
              <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
              <i className="fas fa-chevron-right w-4 h-4 mx-2 text-gray-400"></i>
              <span className="text-gray-800">Sahiti</span>
            </div>
          </div>
        </nav>

        <div className="py-12">
        {/* Profile Section - Full Width */}
        <div className="w-full bg-white mb-16 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 transform hover:scale-[1.01] transition-transform duration-300">
              <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-blue-100 transform hover:rotate-6 transition-transform duration-300">
                <Image
                  src="/images/sahiti/sahiti.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  Sahiti Mulagada
                </h1>
                <div className="text-lg text-gray-600 mb-4">
                  <p>10th Grade • Ganges Valley School</p>
                </div>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  A creative and passionate student with a keen interest in technology and innovation.
                  I love exploring new ideas and bringing them to life through code and design.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    GitHub
                  </a>
                  {/* <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    LinkedIn
                  </a> */}
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Skills Section */}
        <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 py-12">
            <section id="skills" className="max-w-4xl mx-auto">

              <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Skills & Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillGroup, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-blue-600">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* Hobbies & Interests */}
        <div className="w-full bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 py-12">
            <section id="hobbies" className="max-w-4xl mx-auto">

              <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Hobbies & Interests
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {hobbies.map((hobby, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-blue-600">{hobby.category}</h3>
                    <ul className="space-y-2">
                      {hobby.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* School Clubs */}
        <div className="w-full bg-gradient-to-br from-amber-50 to-yellow-50">
          <div className="container mx-auto px-4 py-12">
           <section id="clubs" className="max-w-4xl mx-auto pb-12">

              <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                School Clubs & Activities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {clubs.map((club, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-blue-600">{club.name}</h3>
                    <p className="text-sm text-blue-500 mb-4">{club.role}</p>
                    <ul className="space-y-2 text-sm">
                      {club.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                          • {activity}
                        </li>
                      ))}
                    </ul>
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
