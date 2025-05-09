import Link from 'next/link';
import SectionTitle from '../common/SectionTitle';

export default function RecentWorks() {
  const works = [
    {
      title: 'Entrepreneurs BizKids',
      description: 'Rainbow Vista Expo',
      color: 'bg-[#e1f7e9]',
      fontFamily: 'font-serif',
      link: '/projects/rainbow-vista/bizkids'
    },
    {
      title: 'Urban Living Lab',
      description: 'Visakapatnam V-PULL Project',
      color: 'bg-[#fefce2]',
      fontFamily: 'font-serif',
      link: '/projects/urban-living-lab'
    },
    {
      title: 'SOMABINDHU',
      description: 'Traditional Ayurvedic Medicine',
      color: 'bg-[#e1f7e9]',
      fontFamily: 'font-serif',
      link: '/projects/somabindhu'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8" >
      <SectionTitle title="Recent Works" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {works.map((work, index) => (
          <Link 
            key={index}
            href={work.link}
            className={`group block rounded-lg transition-all duration-300 hover:scale-105 ${work.color}`}
          >
            <div className="m-1.5 p-6 rounded-lg border-2 border-gray-800 relative text-center">
              <div className="absolute inset-2 border border-gray-800 rounded-md pointer-events-none"></div>
              <div className="relative">
                <h3 className={`text-xl font-bold mb-2 ${work.fontFamily} group-hover:text-gray-900 transition-colors duration-300`}>
                  {work.title}
                </h3>
                <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                  {work.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
