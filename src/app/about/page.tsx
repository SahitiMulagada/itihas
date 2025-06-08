import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import SectionTitle from '../../components/common/SectionTitle';

export default function About() {
  const members = [
    {
      name: 'Sahiti Mulagada',
      role: 'Founder of itihaS & Volunteer',
      image: '/images/sahiti/sahiti.jpg'
    }
  ];

  const activities = [
    'Helping and guiding younger kids — sharing what we know, helping with homework, or simply being a kind friend',
    'Organizing donation drives — collecting toys, books, clothes, or food for those in need',
    'Planting trees and creating green spaces in our neighborhoods',
    'Raising awareness on important causes like recycling, water conservation, or kindness',
    'Visiting and helping at old-age homes, orphanages, or animal shelters',
    'Running creative campaigns or events that spread positivity and awareness',
    'Creating art, posters, or videos that inspire others to take action'
  ];

  return (
    <Layout>
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="About Us" />
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">
              A Place Where Young Hearts Make a Big Difference!
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              We are a group of like-minded kids who believe that small actions can create big change in the world around us. 
              From helping our local community to supporting environmental and social causes, we come together to learn, 
              collaborate, and take action — all while having fun and building lifelong friendships.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side: Current Members */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-blue-800">🧑‍🤝‍🧑 Current Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {members.slice(0, 4).map((member) => (
                  <Link
                    href={member.name === 'Sahiti Mulagada' ? '/about/sahiti' : `/members/${member.name.toLowerCase()}`}
                    key={member.name}
                    className="block"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-lg font-bold text-center mb-2 text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600 text-center">{member.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link 
                  href="/members"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <span className="mr-2">Show All Members</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right side: Join Our Journey */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-3xl font-bold mb-8 text-center">🌍 Join Our Journey</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4">Growth & Learning</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-3">✨</span>
                      <span>Learning teamwork and leadership skills</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-3">✨</span>
                      <span>Building confidence as a changemaker</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4">Impact & Community</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-3">✨</span>
                      <span>Making a real difference in lives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-3">✨</span>
                      <span>Meeting other passionate kids</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg mb-6 leading-relaxed">
                  Ready to make a difference?<br />
                  Join us and turn your ideas into action!
                </p>
                <div className="mb-6">
                  <Link
                    href="/contact"
                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Join Us Today!
                  </Link>
                </div>
                <p className="text-blue-100 italic text-sm">
                  We welcome kids of all ages and talents — whether you&apos;re an artist, writer, 
                  speaker, organizer, or just someone with a big heart.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white py-16 ">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-blue-800 text-center">💡 What We Do</h3>
              <p className="text-gray-700 mb-4 font-medium text-center text-xl">Our mission is simple:</p>
              <p className="text-gray-700 mb-6 italic text-center text-xl">
                To dream, plan, and act on ideas that help make the world a better place — no matter how big or small.
              </p>
              <p className="text-gray-700 mb-10 text-center text-lg">
                We believe that every contribution matters, from small gestures to big projects.
              </p>
              <h4 className="text-xl font-semibold mb-6 text-gray-800 text-center">We work on things like:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start bg-blue-50 p-4 rounded-lg">
                    <span className="text-green-500 mr-3 mt-1">✅</span>
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 mt-10 font-medium text-center text-xl">
                Every small effort adds up to something meaningful — and together, we can make a difference!
              </p>
            </div>
          </div>
        </div>
    </div>


    </Layout>
  );
}
