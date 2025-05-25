"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MdOutlineChevronRight, MdAccessTime, MdLocationOn, MdCalendarToday, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../../../components/layout/Layout';
import SectionHeading from '../../../../components/common/SectionHeading';
import RegistrationPanel from '../../../../components/bizkids/RegistrationPanel';
import { getOrganizationStructure } from '@/services/bizkids/organizationService';

interface Stall {
  id: string;
  name: string;
  category: string;
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

const stalls: Stall[] = [
  {
    id: 'creative-crafts',
    name: 'Creative Crafts',
    category: 'Arts & Crafts',
    image: '/stalls/creative-crafts.jpg',
    entrepreneurs: [
      {
        name: 'Sarah Johnson',
        age: 12,
        school: 'Rainbow International School',
        image: '/entrepreneurs/sarah.jpg',
        blockNo: 'B4',
        flatNo: '1204',
      },
      {
        name: 'Mike Chen',
        age: 13,
        school: 'Delhi Public School',
        image: '/entrepreneurs/mike.jpg',
        blockNo: 'A2',
        flatNo: '803',
      },
    ],
    description: 'Handmade crafts and artwork by young artists',
  },
  {
    id: 'tech-innovators',
    name: 'Tech Innovators',
    category: 'Technology',
    image: '/stalls/tech-innovators.jpg',
    entrepreneurs: [
      {
        name: 'Alex Kumar',
        age: 14,
        school: 'Rainbow International School',
        image: '/entrepreneurs/alex.jpg',
        blockNo: 'C1',
        flatNo: '502',
      },
      {
        name: 'Emily Wong',
        age: 13,
        school: 'Delhi Public School',
        image: '/entrepreneurs/emily.jpg',
        blockNo: 'D3',
        flatNo: '901',
      },
    ],
    description: 'Innovative tech solutions by young minds',
  },
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

export default function RainbowVistaBizKids() {
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'about');
  const [activeFinanceSection, setActiveFinanceSection] = useState('income');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url);
  };



const organizationStructure = getOrganizationStructure();

const tabs = [
    { id: 'about', label: 'About Event' },
    { id: 'board', label: 'Top Stall Board' },
    { id: 'stalls', label: 'Registered Stalls' },
    { id: 'finance', label: 'Finance' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'organization', label: 'Organization' },
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
        <div className="relative h-[500px] w-full">
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
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(37, 99, 235, 0)",
                        "0 0 0 20px rgba(37, 99, 235, 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    className="inline-block"
                  >
                    <button
                      onClick={() => setIsRegistrationOpen(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                      Register Now
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white">
          <div className=" mx-auto px-4 py-8">
            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto mb-8 justify-center">
              <div className="inline-flex rounded-lg border-2 border-blue-800">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 first:rounded-l-lg last:rounded-r-lg ${
                      activeTab === tab.id
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-800 hover:bg-blue-50'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            </div>
            {/* Tab Content */}
            <div className="py-6">
              {/* About Event Tab */}
              {activeTab === 'about' && (
                <div className="space-y-1">
                  <section className="w-full py-16 relative overflow-hidden">
                    {/* Main Background Image with Scale Animation */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full origin-center"
                      animate={{
                        scale: [1, 1.25, 1],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Image
                        src="/backgrounds/intg_back.png"
                        alt="Background pattern"
                        fill
                        className="object-cover opacity-15"
                        priority
                      />
                    </motion.div>

                    {/* Left Top Animated Shape */}
                    <motion.div
                      className="absolute -left-16 top-16 w-64 h-64 pointer-events-none"
                      animate={{
                        x: [0, 80, 0],
                        rotate: [0, 10, 0]
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Image
                        src="/backgrounds/office-location-shape-1.png"
                        alt="Animated shape"
                        fill
                        className="object-contain opacity-15"
                        priority
                      />
                    </motion.div>

                    {/* Right Bottom Animated Shape */}
                    <motion.div
                      className="absolute -right-8 -bottom-8 w-80 h-80 pointer-events-none"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, -5, 0]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Image
                        src="/backgrounds/shape_08.png"
                        alt="Bottom shape"
                        fill
                        className="object-contain opacity-15"
                        priority
                      />
                    </motion.div>

                    <div className="max-w-6xl mx-auto px-4 relative">
                      <SectionHeading title="About the Event" />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left side - Description */}
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                          className="prose max-w-none"
                        >
                          <h3 className="text-4xl font-semibold mb-6 text-blue-800"> Rainbow Vista BizKids</h3>
                          <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            Rainbow Vista BizKids is an exciting entrepreneurship event designed for young minds aged 7-18. 
                            This one-day extravaganza brings together creative young entrepreneurs to showcase their business ideas, 
                            learn from experts, and network with fellow innovators.
                          </p>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            Join us for a day filled with inspiration, learning, and the opportunity to turn your innovative ideas into reality.
                          </p>
                        </motion.div>

                        {/* Right side - Cards */}
                        <div className="space-y-1">
                          {/* Date & Time Card */}
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300"
                          >
                            <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/100 transition-colors duration-300 rounded-xl"></div>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-125"></div>
                            <div className="relative flex items-start">
                              <div className="relative group flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-blue-100 transform scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                                <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 border-2 border-blue-200 group-hover:border-blue-300 transition-colors duration-300">
                                  <MdCalendarToday className="text-xl text-blue-600" />
                                </div>
                              </div>
                              <div className="ml-4 flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Event Date & Time</h3>
                                <p className="text-gray-600 text-sm">Saturday, June 15, 2024</p>
                                <div className="flex items-center text-gray-600 text-sm mt-1">
                                  <MdAccessTime className="mr-1 text-blue-600" />
                                  <span>10:00 AM - 6:00 PM</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Location Card */}
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300"
                          >
                            <div className="absolute inset-0 bg-indigo-50/0 group-hover:bg-indigo-50/100 transition-colors duration-300 rounded-xl"></div>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-125"></div>
                            <div className="relative flex items-start">
                              <div className="relative group flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-indigo-100 transform scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                                <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 border-2 border-indigo-200 group-hover:border-indigo-300 transition-colors duration-300">
                                  <MdLocationOn className="text-xl text-indigo-600" />
                                </div>
                              </div>
                              <div className="ml-4 flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Location</h3>
                                <p className="text-gray-600 text-sm">Rainbow Vista Rock gardens</p>
                                <p className="text-gray-600 text-sm">Before K-Block</p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Registration Deadline Card */}
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300"
                          >
                            <div className="absolute inset-0 bg-purple-50/0 group-hover:bg-purple-50/100 transition-colors duration-300 rounded-xl"></div>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100/50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-125"></div>
                            <div className="relative flex items-start">
                              <div className="relative group flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-purple-100 transform scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                                <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-purple-50 border-2 border-purple-200 group-hover:border-purple-300 transition-colors duration-300">
                                  <MdCalendarToday className="text-xl text-purple-600" />
                                </div>
                              </div>
                              <div className="ml-4 flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Registration Deadline</h3>
                                <p className="text-gray-600 text-sm">Last day for registration:</p>
                                <p className="text-purple-600 font-semibold text-sm mt-1">May 30, 2025</p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="w-full py-16 relative overflow-hidden bg-gradient-to-br from-indigo-50/90 to-blue-50/90">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src="/backgrounds/service_bg_1.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                      />
                    </div>

                    {/* Floating Circles */}
                    <motion.div
                      className="absolute left-10 top-20 w-32 h-32 rounded-full bg-blue-200/20 blur-xl"
                      animate={{
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute right-20 bottom-40 w-40 h-40 rounded-full bg-indigo-200/20 blur-xl"
                      animate={{
                        y: [0, 40, 0],
                        scale: [1, 0.8, 1],
                        opacity: [0.2, 0.1, 0.2]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute left-1/2 top-1/3 w-24 h-24 rounded-full bg-purple-200/20 blur-xl"
                      animate={{
                        x: [-30, 30, -30],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <div className="max-w-4xl mx-auto px-4 relative z-10">

                      <SectionHeading title="Event Posters" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                          { id: 1, src: '/projects/bizkids/posters/biztalk_1.jpg' },
                          { id: 2, src: '/projects/bizkids/posters/biztalk_2.jpg' }
                        ].map((poster) => (
                          <div 
                            key={poster.id} 
                            className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-white/80 backdrop-blur-sm"
                            onClick={() => setSelectedPoster(poster.src)}
                          >
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                            <Image
                              src={poster.src}
                              alt={`Event Poster ${poster.id}`}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Screen Modal */}
                    {selectedPoster && (
                      <div 
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedPoster(null)}
                      >
                        <div className="relative w-full max-w-5xl max-h-[90vh] aspect-[3/4]">
                          <Image
                            src={selectedPoster}
                            alt="Full size poster"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <button 
                          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
                          onClick={() => setSelectedPoster(null)}
                        >
                          <MdClose className="text-3xl" />
                        </button>
                      </div>
                    )}
                  </section>

                  <section className="max-w-6xl mx-auto py-16">
                    <SectionHeading title="How to Register" />
                    <div className="px-4">
                      <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <li className="group p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-[45px] font-medium leading-none" style={{
                              backgroundImage: 'linear-gradient(to right, #09b850, #09b850)',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextStrokeWidth: '2px',
                              WebkitTextStrokeColor: 'transparent',
                              color: '#fff',
                              letterSpacing: '1px'
                            }}>01</span>
                            <h3 className="text-xl font-semibold text-gray-800">Fill Registration Form</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed ml-[60px]">Complete the online registration form with your details and business idea</p>
                        </li>
                        <li className="group p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-[45px] font-medium leading-none" style={{
                              backgroundImage: 'linear-gradient(to right, #09b850, #09b850)',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextStrokeWidth: '2px',
                              WebkitTextStrokeColor: 'transparent',
                              color: '#fff',
                              letterSpacing: '1px'
                            }}>02</span>
                            <h3 className="text-xl font-semibold text-gray-800">Submit Business Plan</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed ml-[60px]">Upload a simple business plan describing your stall concept</p>
                        </li>
                        <li className="group p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-[45px] font-medium leading-none" style={{
                              backgroundImage: 'linear-gradient(to right, #09b850, #09b850)',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextStrokeWidth: '2px',
                              WebkitTextStrokeColor: 'transparent',
                              color: '#fff',
                              letterSpacing: '1px'
                            }}>03</span>
                            <h3 className="text-xl font-semibold text-gray-800">Pay Registration Fee</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed ml-[60px]">Complete the payment process to secure your spot</p>
                        </li>
                      </ol>
                    </div>

                    <div className="text-center mt-8">
                      <button
                        onClick={() => setIsRegistrationOpen(true)}
                        className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        Register Now
                      </button>
                    </div>
                  </section>

                  {/* Registration Panel */}
                  <RegistrationPanel
                    isOpen={isRegistrationOpen}
                    onClose={() => setIsRegistrationOpen(false)}
                  />
                </div>
              )}

              {/* Top Board Tab */}
              {activeTab === 'board' && (
                <div className="max-w-4xl mx-auto">
                  <SectionHeading title="Top Board" />

                  {/* Rating Note */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8 rounded-r-xl">
                    <p className="text-yellow-700">
                      <span className="font-semibold">Rating System:</span> Each stall can earn up to 6 stars
                      <br />★★★★★ - Based on customer reviews during the event
                      <br />★ - Bonus star for providing detailed stall description
                      <br /><span className="text-sm">* Only ratings given during the event day will be considered</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {boardMembers.map((member, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden p-4 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Registered Stalls Tab */}
              {activeTab === 'stalls' && (
                <div className="max-w-6xl mx-auto">
                  <SectionHeading title="Registered Stalls" />
                  
                  {/* Category Chips */}
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === null
                        ? 'bg-blue-800 text-white border-2 border-blue-800'
                        : 'bg-blue-50 text-blue-800 border-2 border-blue-200 hover:border-blue-400'
                      }`}
                    >
                      <span className="font-medium">All</span>
                      <span className="ml-2 px-2 py-0.5 bg-white text-blue-800 rounded-full text-xs">{stalls.length}</span>
                    </button>
                    {Object.entries(stalls.reduce((acc, stall) => {
                      acc[stall.category] = (acc[stall.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)).map(([category, count]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category
                          ? 'bg-blue-800 text-white border-2 border-blue-800'
                          : 'bg-blue-50 text-blue-800 border-2 border-blue-200 hover:border-blue-400'
                        }`}
                      >
                        <span className="font-medium">{category}</span>
                        <span className="ml-2 px-2 py-0.5 bg-white text-blue-800 rounded-full text-xs">{count}</span>
                      </button>
                    ))}
                  </div>

                  {/* Stalls Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stalls
                      .filter(stall => selectedCategory === null || stall.category === selectedCategory)
                      .map((stall) => (
                      <Link 
                        href={'/projects/rainbow-vista/bizkids/stalls/' + stall.id} 
                        key={stall.id}
                        className="group block"
                      >
                        <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-100 hover:border-blue-500 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={stall.image}
                              alt={stall.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6">
                            <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800 mb-3">
                              {stall.category}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                              {stall.name}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{stall.description}</p>
                            <div className="flex flex-wrap gap-3">
                              {stall.entrepreneurs.map((entrepreneur, index) => (
                                <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                                    <Image
                                      src={entrepreneur.image}
                                      alt={entrepreneur.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-sm text-gray-600">{entrepreneur.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Finance Tab */}
              {activeTab === 'finance' && (
                <div className="max-w-4xl mx-auto">
                  <SectionHeading title="Financial Overview" />
                  
                  {/* Finance Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div 
                      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${activeFinanceSection === 'income' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-white hover:shadow-lg'}`}
                      onClick={() => setActiveFinanceSection('income')}
                    >
                      <h3 className="text-lg font-semibold mb-2">Amount Collected</h3>
                      <p className="text-gray-600">Track stall registration payments</p>
                    </div>
                    
                    <div 
                      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${activeFinanceSection === 'expenses' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-white hover:shadow-lg'}`}
                      onClick={() => setActiveFinanceSection('expenses')}
                    >
                      <h3 className="text-lg font-semibold mb-2">Expenses</h3>
                      <p className="text-gray-600">Track event expenses</p>
                    </div>
                    
                    <div 
                      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${activeFinanceSection === 'balance' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-white hover:shadow-lg'}`}
                      onClick={() => setActiveFinanceSection('balance')}
                    >
                      <h3 className="text-lg font-semibold mb-2">Remaining Money</h3>
                      <p className="text-gray-600">Prize money distribution</p>
                    </div>
                  </div>

                  {/* Income Section */}
                  {activeFinanceSection === 'income' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stall Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {stalls.map((stall, index) => (
                            <tr key={stall.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stall.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stall.category}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹200</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2025</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50 font-medium">
                            <td className="px-6 py-4 whitespace-nowrap text-sm" colSpan={3}>Total Collection</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">₹3,000</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Expenses Section */}
                  {activeFinanceSection === 'expenses' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tables & Chairs</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1,500</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">₹1,500</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 20, 2025</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Banners & Signage</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹500</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">₹500</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 19, 2025</td>
                          </tr>
                          <tr className="bg-gray-50 font-medium">
                            <td className="px-6 py-4 whitespace-nowrap text-sm" colSpan={2}>Total Expenses</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">₹2,000</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Balance Section */}
                  {activeFinanceSection === 'balance' && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="space-y-6">
                        <div className="text-center">
                          <p className="text-lg mb-2">Total Collection: <span className="text-green-600 font-medium">₹3,000</span></p>
                          <p className="text-lg mb-2">Total Expenses: <span className="text-red-600 font-medium">₹2,000</span></p>
                          <p className="text-lg font-medium">Remaining Balance: <span className="text-blue-600">₹1,000</span></p>
                        </div>
                        
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                          <p className="text-yellow-700">
                            <span className="font-semibold">Prize Money Distribution:</span><br/>
                            The remaining amount will be distributed among the top three rated stalls as prize money based on customer reviews and overall performance during the event.
                          </p>
                          <ul className="mt-3 list-disc list-inside text-yellow-700">
                            <li>First Place: ₹500</li>
                            <li>Second Place: ₹300</li>
                            <li>Third Place: ₹200</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Gallery Tab */}
              {activeTab === 'organization' && (
                <div className="max-w-4xl mx-auto">
                  <SectionHeading title="Organization Structure" />
                  
                  <div className="space-y-8">
                    {Object.values(organizationStructure).map((committee) => (
                      <div key={committee.title} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">{committee.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {committee.members.map((member) => (
                            <div key={member.name} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-blue-800 font-semibold">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{member.name}</h4>
                                <p className="text-sm text-gray-600">{member.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="max-w-6xl mx-auto">
                  <SectionHeading title="Event Gallery" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
                      <div key={img} className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={'/gallery/image-' + img + '.jpg'}
                          alt={`Gallery Image ${img}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
     
    </div>

    </Layout>
  );
