import { notFound } from 'next/navigation';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import SectionTitle from '../../../components/common/SectionTitle';

export default function MemberProfile({ params }: { params: { slug: string } }) {
  const members = {
    rohan: {
      name: 'Rohan',
      role: 'Volunteer & Creative Poster Designer',
      image: '/members/placeholder.jpg',
      bio: 'A creative mind who brings our messages to life through beautiful designs.',
      interests: ['Graphic Design', 'Art', 'Environmental Causes'],
      contributions: [
        'Designed campaign posters',
        'Created social media graphics',
        'Led art workshops'
      ]
    },
    sarah: {
      name: 'Sarah',
      role: 'Event Organizer, "Kindness Drive"',
      image: '/members/placeholder.jpg',
      bio: 'Passionate about spreading kindness and organizing impactful events.',
      interests: ['Event Planning', 'Community Service', 'Leadership'],
      contributions: [
        'Organized multiple donation drives',
        'Coordinated volunteer activities',
        'Led the Kindness Drive initiative'
      ]
    },
    arjun: {
      name: 'Arjun',
      role: 'Tech & Website Wizard',
      image: '/members/placeholder.jpg',
      bio: 'Using technology to help our initiatives reach more people.',
      interests: ['Technology', 'Web Development', 'Digital Media'],
      contributions: [
        'Maintains our website',
        'Creates digital content',
        'Helps with technical workshops'
      ]
    },
    priya: {
      name: 'Priya',
      role: 'Fundraising & Social Media Outreach',
      image: '/members/placeholder.jpg',
      bio: 'Connecting our initiatives with the community through social media.',
      interests: ['Social Media', 'Writing', 'Public Speaking'],
      contributions: [
        'Manages social media accounts',
        'Writes campaign content',
        'Coordinates fundraising efforts'
      ]
    }
  };

  const member = members[params.slug as keyof typeof members];
  
  if (!member) {
    notFound();
  }

  return (
    <Layout>
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <SectionTitle title={member.name} />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <div className="relative h-64 w-full md:w-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                    {member.role}
                  </div>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Interests & Passions</h3>
                <ul className="space-y-2">
                  {member.interests.map((interest, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Contributions</h3>
                <ul className="space-y-2">
                  {member.contributions.map((contribution, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{contribution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
