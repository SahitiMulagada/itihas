"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { MdAccessTime, MdLocationOn, MdCalendarToday, MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import Layout from '../../../../components/layout/Layout';
import SectionHeading from '../../../../components/common/SectionHeading';
import RegistrationPanel from '../../../../components/bizkids/RegistrationPanel';
import { getOrganizationStructure } from '@/services/bizkids/organizationService';
import OrganizationStructure from '@/components/bizkids/OrganizationStructure';

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

function BizKidsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'about');
  const [activeFinanceSection, setActiveFinanceSection] = useState('income');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  const organizationStructure = getOrganizationStructure();

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
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-white">
                      <MdCalendarToday className="w-5 h-5 mr-2" />
                      <span>May 15, 2025</span>
                    </div>
                    <div className="flex items-center text-white">
                      <MdAccessTime className="w-5 h-5 mr-2" />
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center text-white">
                      <MdLocationOn className="w-5 h-5 mr-2" />
                      <span>Rainbow Vista Community Center</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex flex-wrap -mx-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`m-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === 'about' && (
              <div>
                <SectionHeading title="About BizKids" />
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    BizKids is an exciting entrepreneurship event designed to inspire and empower young minds to explore the world of business. Through this unique platform, children aged 8-14 can experience firsthand what it means to be an entrepreneur.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What to Expect</h3>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li>Set up and manage your own stall</li>
                    <li>Learn valuable business skills</li>
                    <li>Network with other young entrepreneurs</li>
                    <li>Gain real-world experience in sales and marketing</li>
                    <li>Win exciting prizes and recognition</li>
                  </ul>
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Registration Details</h3>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Age Group:</span>
                        8-14 years
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Registration Fee:</span>
                        ₹500 per stall
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Last Date:</span>
                        May 10, 2025
                      </li>
                    </ul>
                    <button
                      onClick={() => setIsRegistrationOpen(true)}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'board' && (
              <div>
                <SectionHeading title="Top Stall Board Members" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {boardMembers.map((member) => (
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
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stalls' && (
              <div>
                <SectionHeading title="Registered Stalls" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {stalls.map((stall) => (
                    <div key={stall.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                      <div className="relative h-48">
                        <Image
                          src={stall.image}
                          alt={stall.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{stall.name}</h3>
                        <p className="text-gray-600 mb-4">{stall.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {stall.entrepreneurs.map((entrepreneur) => (
                            <div
                              key={entrepreneur.name}
                              className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1"
                            >
                              <div className="relative w-6 h-6">
                                <Image
                                  src={entrepreneur.image}
                                  alt={entrepreneur.name}
                                  fill
                                  className="object-cover rounded-full"
                                />
                              </div>
                              <span className="text-sm text-gray-700">{entrepreneur.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div>
                <SectionHeading title="Financial Overview" />
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setActiveFinanceSection('income')}
                    className={`px-4 py-2 rounded-lg ${
                      activeFinanceSection === 'income'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setActiveFinanceSection('expenses')}
                    className={`px-4 py-2 rounded-lg ${
                      activeFinanceSection === 'expenses'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Expenses
                  </button>
                </div>
                {/* Add finance content here */}
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
                <SectionHeading title="Organization Structure" />
                <div className="mt-8">
                  <OrganizationStructure data={organizationStructure} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Panel */}
      <RegistrationPanel
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />

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
