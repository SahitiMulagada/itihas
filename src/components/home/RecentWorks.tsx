import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-16">
      {/* Distinct header for Recent Works */}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {works.map((work, index) => (
          <Link 
            key={index} 
            href={work.link}
            className={`block ${work.color} rounded-3xl p-8 text-center transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <h3 className={`text-2xl ${work.fontFamily} mb-2`}>{work.title}</h3>
            <p className="text-gray-600">{work.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
