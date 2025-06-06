"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { MdAccessTime, MdLocationOn, MdCalendarToday, MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import Layout from '../../../../components/layout/Layout';
import SectionHeading from '../../../../components/common/SectionHeading';


interface Stall {
  id: string;
  name: string;
  categories: string[];
  image: string;
  entrepreneurs: {
    name: string;
    age: number;
    school: string;
    image: string;
    blockNo: string;
    flatNo: string;
  }[];
  description: string;
}

const registeredStalls = [
  {
    stallNo: 'S1',
    entrepreneurs: [{ name: 'Thridha & Aadhya', school: 'P Obulreddy', blockNo: 'L' }],
    categories: ['Arts & Crafts', 'Handmade Items']
  },
  {
    stallNo: 'S2',
    entrepreneurs: [{ name: 'Kartheeka', school: 'Allen', blockNo: 'L' }],
    categories: ['Food', 'Beverages']
  },
  {
    stallNo: 'S3',
    entrepreneurs: [{ name: 'V Advik Gupta', school: 'Glendale International School', blockNo: 'I' }],
    categories: ['Technology', 'Games']
  },
  {
    stallNo: 'S4',
    entrepreneurs: [{ name: 'Siddharth', school: 'Silveroaks international school', blockNo: 'F' }],
    categories: ['Arts & Crafts', 'Stationery']
  },
  {
    stallNo: 'S5',
    entrepreneurs: [{ name: 'Geetali Movva', school: 'FKS', blockNo: 'K' }],
    categories: ['Food', 'Snacks']
  },
  {
    stallNo: 'S6',
    entrepreneurs: [{ name: 'Swetcha Kommu', school: 'PM Shri Kendriya Vidyalaya, AFS B', blockNo: 'H' }],
    categories: ['Games', 'Entertainment']
  },
  {
    stallNo: 'S7',
    entrepreneurs: [{ name: 'B.Pragnika', school: 'Chirec International School', blockNo: 'K' }],
    categories: ['Arts & Crafts']
  },
  {
    stallNo: 'S8',
    entrepreneurs: [{ name: 'KRISHNA BHARGAV', school: 'PHOENIX GREENS', blockNo: 'I' }],
    categories: ['Technology', 'Education']
  },
  {
    stallNo: 'S9',
    entrepreneurs: [{ name: 'Saanvi CH and Nandan Sriram CH', school: 'Vyasa School', blockNo: 'P' }],
    categories: ['Food', 'Healthy Snacks']
  },
  {
    stallNo: 'S10',
    entrepreneurs: [{ name: 'srishti,vismaya', school: 'Akshara International school', blockNo: 'M' }],
    categories: ['Arts & Crafts', 'Jewelry']
  },
  {
    stallNo: 'S11',
    entrepreneurs: [{ name: 'Meghana ,Deeksha', school: 'Bharatiya Vidya Bhavan\'s Atmakuri', blockNo: 'H' }],
    categories: ['Games', 'Entertainment']
  },
  {
    stallNo: 'S12',
    entrepreneurs: [{ name: 'AANVY', school: 'Meridian school', blockNo: 'K' }],
    categories: ['Food', 'Desserts']
  },
  {
    stallNo: 'S13',
    entrepreneurs: [{ name: 'Myra Josyula', school: 'Gitanjali', blockNo: 'I' }],
    categories: ['Arts & Crafts', 'Painting']
  },
  {
    stallNo: 'S14',
    entrepreneurs: [{ name: 'Siddharth Mulagada', school: 'Ganges Valley School', blockNo: 'K' }],
    categories: ['Technology', 'Robotics']
  },
  {
    stallNo: 'S15',
    entrepreneurs: [{ name: 'Aarohi and Sarayu', school: 'Meridian School Madhapur', blockNo: 'Q Block, G Block' }],
    categories: ['Food', 'Beverages']
  },
  {
    stallNo: 'S16',
    entrepreneurs: [{ name: 'Yug Rathi', school: 'Euro School', blockNo: 'J' }],
    categories: ['Games', 'Technology']
  },
  {
    stallNo: 'S17',
    entrepreneurs: [{ name: 'Shriya Deshpande', school: 'Oakridge International school Bachi', blockNo: 'L' }],
    categories: ['Arts & Crafts']
  },
  {
    stallNo: 'S18',
    entrepreneurs: [{ name: 'Vrinda', school: 'Jubilee Hills Public School', blockNo: 'N' }],
    categories: ['Food', 'Healthy Snacks']
  },
  {
    stallNo: 'S19',
    entrepreneurs: [{ name: 'Srinika Manneri', school: 'Chirec international school', blockNo: 'I' }],
    categories: ['Arts & Crafts', 'Jewelry']
  },
  {
    stallNo: 'S20',
    entrepreneurs: [{ name: 'Bhavya J', school: 'Ganges Valley School', blockNo: 'Q' }],
    categories: ['Technology', 'Games']
  },
  {
    stallNo: 'S21',
    entrepreneurs: [{ name: 'Avishi Mahanyu', school: 'Silver Oaks International School', blockNo: 'I' }],
    categories: ['Food', 'Beverages']
  },
  {
    stallNo: 'S22',
    entrepreneurs: [{ name: 'Khyathi Ganapathiraju', school: 'Ganges Valley School', blockNo: 'G' }],
    categories: ['Arts & Crafts', 'Handmade Items']
  },
  {
    stallNo: 'S23',
    entrepreneurs: [{ name: 'Saanvi B', school: 'Phoenix Greens', blockNo: 'J' }],
    categories: ['Technology', 'Education']
  },
  {
    stallNo: 'S24',
    entrepreneurs: [{ name: 'Riya', school: 'Gaudium', blockNo: 'I' }],
    categories: ['Games', 'Entertainment']
  },
  {
    stallNo: 'S25',
    entrepreneurs: [{ name: 'Amairra sood', school: 'Hps begumpet', blockNo: 'N' }],
    categories: ['Food', 'Snacks']
  },
  {
    stallNo: 'S26',
    entrepreneurs: [{ name: 'Aayush Jain', school: 'Bhavans atmakuri', blockNo: 'M' }],
    categories: ['Technology', 'Games']
  },
  {
    stallNo: 'S27',
    entrepreneurs: [{ name: 'Hetanshi Sai Kartika M', school: 'Hyderabad Public School', blockNo: 'K' }],
    categories: ['Arts & Crafts', 'Painting']
  },
  {
    stallNo: 'S28',
    entrepreneurs: [{ name: 'Shanmukh Srikar G, Moksha Sarvani K', school: 'DPS and Allen', blockNo: '' }],
    categories: ['Food', 'Beverages']
  },
  {
    stallNo: 'S29',
    entrepreneurs: [{ name: 'Swayam, Yashvi, Bhumika, Aryaman', school: '', blockNo: '' }],
    categories: ['Games', 'Technology']
  }
];

const boardMembers = [
  {
    name: 'Sarah Johnson',
    role: 'President',
    image: '/projects/bizkids/board/placeholders.png'
  },
  {
    name: 'Michael Chen',
    role: 'Vice President',
    image: '/projects/kidsbiz/board/placeholders.png'
  },
  {
    name: 'Emma Davis',
    role: 'Secretary',
    image: '/projects/kidsbiz/board/placeholders.png'
  }
];

const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

function BizKidsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'about');

  // Add animation styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = floatAnimation;
    document.head.appendChild(styleElement);
    return () => styleElement.remove();
  }, []);
  const [activeFinanceSection, setActiveFinanceSection] = useState('income');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');



  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url);
  };

  const tabs = [
    { id: 'about', label: 'About Event' },
    { id: 'board', label: 'Top Stall Board' },
    { id: 'stalls', label: 'Registered Stalls' },
    { id: 'finance', label: 'Finance' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'organization', label: 'Organized by' },
  ];

  return (
    <Layout>
      <div className="pt-0">
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/projects" className="text-gray-500 hover:text-blue-600">Projects</Link>
              <span className="text-gray-400">/</span>
              <Link href="/projects/rainbow-vista/bizkids" className="text-gray-500 hover:text-blue-600">BizKids</Link>
              {activeTab === 'stalls' && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900">Stalls</span>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative h-[500px] w-full hidden md:block">
          <div className="absolute top-4 right-4 z-10 bg-white rounded-lg p-2 shadow-md">
            <Image
              src="/projects/bizkids/logo.jpg"
              alt="BizKids Logo"
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>
          <Image
            src="/projects/bizkids/header.jpg"
            alt="Rainbow Vista BizKids"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="text-left mb-12 relative overflow-hidden">
                <motion.h1
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-5xl md:text-6xl font-bold text-white mb-4" 
                >
                  Rainbow Vista - BizKids
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-xl text-gray-200 max-w-2xl mb-8"
                >
                  Empowering young entrepreneurs to shape the future
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-white">
                        <MdCalendarToday className="w-5 h-5 mr-2" />
                        <span>7th June, 2025</span>
                      </div>
                      <div className="flex items-center text-white">
                        <MdAccessTime className="w-5 h-5 mr-2" />
                        <span>04:00 PM - 09:00 PM</span>
                      </div>
                      <div className="flex items-center text-white">
                        <MdLocationOn className="w-5 h-5 mr-2" />
                        <span>Before K,L,M,N Blocks</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">

                      <div className="text-white text-sm">
                        Registration closes on Thursday, 5th June 2025
                      </div>
                      {/* <a
                        href="https://forms.gle/yvmLebM5NdHnsajo7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 w-fit"
                      >
                        Register Now
                      </a> */}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden w-full p-4">
          <Image
            src="/projects/bizkids/logo.jpg"
            alt="BizKids Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="inline-flex flex-wrap md:flex-nowrap bg-gray-100 p-1 rounded-xl shadow-sm">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-3 md:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm md:text-base whitespace-nowrap ${index > 0 ? 'ml-1' : ''} ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white  p-0">
            {activeTab === 'about' && (
              <div>
                <SectionHeading title="About BizKids" />
                <div className="prose max-w-none">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg mb-8">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Welcome to BizKids 2025!</h2>
                    <div className="flex flex-col items-center space-y-3 text-gray-700 text-lg">
                      <p className="flex items-center">
                        <MdCalendarToday className="mr-2 text-blue-600" /> 7th June, 2025
                      </p>
                      <p className="flex items-center">
                        <MdAccessTime className="mr-2 text-blue-600" /> 04:00 PM - 09:00 PM
                      </p>
                      <p className="flex items-center">
                        <MdLocationOn className="mr-2 text-blue-600" /> Before K,L,M,N Blocks (Rainbow Vista Rock gardens)
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 mb-6">
                    BizKids is an exciting entrepreneurship event designed to inspire and empower young minds to explore the world of business. Through this unique platform, children below 18 years can experience firsthand what it means to be an entrepreneur.
                  </p>
                  <div className="mt-12 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-6 text-blue-900 border-b-2 border-blue-200 pb-2 inline-block">What to Expect</h3>
                        <ul className="space-y-4 text-gray-700">
                          <li className="flex items-center space-x-3 transition-transform hover:translate-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Young entrepreneurs showcasing their business ideas</span>
                          </li>
                          <li className="flex items-center space-x-3 transition-transform hover:translate-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Creative and innovative stalls</span>
                          </li>
                          <li className="flex items-center space-x-3 transition-transform hover:translate-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Fun activities and games</span>
                          </li>
                          <li className="flex items-center space-x-3 transition-transform hover:translate-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Food and refreshments</span>
                          </li>
                          <li className="flex items-center space-x-3 transition-transform hover:translate-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Networking opportunities</span>
                          </li>
                          <li className="flex items-center space-x-3 transition-transform hover:translate-x-2">
                            <span className="text-blue-500">•</span>
                            <span>Learning experience for children</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative w-96 h-96 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/projects/bizkids/logo.jpg"
                          alt="BizKids Logo"
                          width={384}
                          height={384}
                          className="rounded-lg shadow-xl animate-float object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Registration Details</h3>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Age Group:</span>
                        Any age below 18 years
                      </li>
                      <li className="flex items-center">

                      <div className="text-lg">
                        Registration Fee:
                        <span className="ml-2 font-semibold">₹750 (Half Stall) | ₹1,500 (Full Stall)</span>
                      </div>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Last Date:</span>
                        05th June, 2025
                      </li>
                    </ul>
                    {/* <a
                        href="https://forms.gle/yvmLebM5NdHnsajo7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 w-fit"
                      >
                        Register Now
                      </a> */}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'board' && (
              <div>
                <SectionHeading title="Top Stall Board Members" />

                <div className="p-6 mb-8">
                  <p className="text-blue-800 text-lg mb-4 font-semibold">We will update the top rated stalls here after the event.</p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {/* {boardMembers.map((member) => (
                    <div key={member.name} className="text-center">
                      <div className="relative w-48 h-48 mx-auto mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                      <p className="text-blue-600">{member.role}</p>
                    </div>
                  ))} */}
                </div>
              </div>
            )}

            {activeTab === 'stalls' && (
              <div>
                <SectionHeading title="Registered Stalls" />
                <div className="mb-6">
                  <div className="relative max-w-md mx-auto">
                    <input
                      type="text"
                      placeholder="Search by name, school, block, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Desktop View */}
                <div className="hidden md:block mt-8 overflow-x-auto">
                  <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase">S.No</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase">Stall No</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase">Young Entrepreneurs</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase">Categories</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {registeredStalls.filter(stall => {
                        const searchLower = searchTerm.toLowerCase();
                        return stall.entrepreneurs.some(entrepreneur => 
                          entrepreneur.name.toLowerCase().includes(searchLower) ||
                          entrepreneur.school.toLowerCase().includes(searchLower) ||
                          entrepreneur.blockNo.toLowerCase().includes(searchLower)
                        ) || stall.categories.some(category =>
                          category.toLowerCase().includes(searchLower)
                        );
                      }).map((stall, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stall.stallNo || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="space-y-2">
                              {stall.entrepreneurs.map((entrepreneur, eIndex) => (
                                <div key={eIndex} className="flex flex-col">
                                  <span className="font-medium">{entrepreneur.name}</span>
                                  <span className="text-xs text-gray-400">{entrepreneur.school}</span>
                                  <span className="text-xs text-gray-400">Block: {entrepreneur.blockNo}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex flex-wrap gap-2">
                              {stall.categories.map((category, cIndex) => (
                                <span key={cIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {category}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden grid gap-6 mt-8">
                  {registeredStalls.filter(stall => {
                    const searchLower = searchTerm.toLowerCase();
                    return stall.entrepreneurs.some(entrepreneur => 
                      entrepreneur.name.toLowerCase().includes(searchLower) ||
                      entrepreneur.school.toLowerCase().includes(searchLower) ||
                      entrepreneur.blockNo.toLowerCase().includes(searchLower)
                    ) || stall.categories.some(category =>
                      category.toLowerCase().includes(searchLower)
                    );
                  }).map((stall, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex justify-between items-center mb-4 bg-gray-50 -mx-6 -mt-6 p-4 border-b">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                          <span className="text-sm font-medium text-gray-500">({stall.stallNo || '-'})</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {stall.categories.map((category, cIndex) => (
                            <span key={cIndex} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {stall.entrepreneurs.map((entrepreneur, eIndex) => (
                          <div key={eIndex} className="bg-gray-50 rounded-lg p-3">
                            <h3 className="font-medium text-gray-900 mb-2 text-lg">{entrepreneur.name}</h3>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {entrepreneur.school}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Block {entrepreneur.blockNo}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
             
            )}

            {activeTab === 'finance' && (
              <div>
                <SectionHeading title="Financial Overview" />
                <div className="p-6 mb-8">
                  <p className="text-blue-800 text-lg mb-4 font-semibold">We want to keep the money collected and expenses transparent.</p>
                  <p className="text-blue-700 font-semibold">This is an event organized by kids for the kids for non profit.</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-300">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-gray-200">S.No</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-gray-200">Name/ Category</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-gray-200">Quantity</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-gray-200">Unit Cost</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-gray-200">Total Expense</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { sno: 1, name: 'Stall Rent\nInclude Canopy, 2 tables,1 light\n2 L tables arrangement with table cloth', quantity: 23, unitCost: 2200, totalExpense: 50600, unit: 'Per Stall' },
                        { sno: 2, name: 'Certificate', quantity: 60, unitCost: 30, totalExpense: 1800, unit: 'Per Certificate' },
                        { sno: 3, name: 'Trophies', quantity: 1, unitCost: 500, totalExpense: 500, unit: '1st,2nd,3rd Trophies' },
                        { sno: 4, name: 'Posters & flyers & Stall No prints', quantity: 200, unitCost: 0, totalExpense: null, unit: 'Prints taken care by Sahiti' },
                        { sno: 5, name: 'Big Banner', quantity: 1, unitCost: 900, totalExpense: 900, unit: '' },
                        { sno: 6, name: 'Postal charges', quantity: 1, unitCost: 300, totalExpense: 300, unit: '' },
                        { sno: 7, name: 'QR Codes prints', quantity: 40, unitCost: 0, totalExpense: 0, unit: 'Taken care by Sahiti' },
                        { sno: 8, name: 'Additional Chairs', quantity: null, unitCost: 0, totalExpense: 0, unit: 'Taken care by Rainbow Vistal Team' },
                        { sno: 9, name: 'Electracity', quantity: null, unitCost: 0, totalExpense: 0, unit: 'Taken care by Rainbow Vistal Team' },
                        { sno: 10, name: 'Cleaning', quantity: null, unitCost: 0, totalExpense: 0, unit: 'Taken care by Rainbow Vistal Team' },
                        { sno: 11, name: 'Mike and speaker', quantity: null, unitCost: null, totalExpense: null, unit: '' },
                        { sno: 12, name: 'Arrangement charges if any', quantity: null, unitCost: null, totalExpense: null, unit: '' },
                      ].map((item) => (
                        <tr key={item.sno} className="hover:bg-blue-50 transition-all duration-200 ease-in-out hover:shadow-inner border-b border-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">{item.sno}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-pre-line border-r border-gray-200">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">{item.quantity || ''}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">{item.unitCost || ''}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">{item.totalExpense || ''}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.unit}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-semibold border-t-2 border-gray-300">
                        <td colSpan={4} className="px-6 py-4 text-right text-sm text-gray-900 border-r border-gray-200">Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">54100</td>
                        <td className="px-6 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <SectionHeading title="Event Gallery" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                  {/* Add gallery content here */}
                </div>
              </div>
            )}

            {activeTab === 'organization' && (
              <div>
                <SectionHeading title="Organized by" />

                <div className="p-6 mb-8">
                  
                  <p className="text-blue-700 font-semibold text-center text-lg">This is an event organized by kids for the kids for non profit.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                  {[
                    { name: 'Sahiti Mulagada', role: 'Team Member & Event Initiator', block: 'K', school: 'Ganges Valley School', image: '/images/sahiti/sahiti.jpg' },
                    { name: 'Adwitha Udumala', role: 'Team Member', block: 'K', school: 'Ganges Valley School' },
                    { name: 'Akshika Sangal', role: 'Team Member', block: 'H', school: 'Ganges Valley School' , image: '/projects/bizkids/profiles/akshika.jpg'},
                    { name: 'Savar Kokatnur', role: 'Team Member', block: 'M', school: 'Delhi Public School' , image: '/projects/bizkids/profiles/savar.jpg'},
                    { name: 'Vidya Chinni', role: 'Team Member', block: 'L', school: 'Ganges Valley School' },
                    { name: 'Nishika Choppa', role: 'Team Member', block: 'O', school: 'Ganges Valley School' , image: '/projects/bizkids/profiles/nishika.jpg' }
                  ].map((member) => (
                    <div key={member.name} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        {member.image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-2xl font-semibold text-blue-600">
                              {member.name.split(' ').map(word => word[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                      <p className="text-blue-600 text-sm mt-1">{member.role}</p>
                      <p className="text-gray-600 text-sm">Block {member.block}</p>
                      {member.school && (
                        <p className="text-gray-600 text-sm">{member.school}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Panel */}
      {/* <RegistrationPanel
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      /> */}

      {/* Image Preview Modal */}
      {selectedPoster && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <MdClose className="w-8 h-8" />
            </button>
            <Image
              src={selectedPoster}
              alt="Poster Preview"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default function RainbowVistaBizKids() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BizKidsContent />
    </Suspense>
  );
}
