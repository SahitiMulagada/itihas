"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineChevronRight } from 'react-icons/md';
import RegistrationPanel from '../../../../components/bizkids/RegistrationPanel';
import Layout from '../../../../components/layout/Layout';

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

  const tabs = [
    { id: 'about', label: 'About Event' },
    { id: 'board', label: 'Top Stall Board' },
    { id: 'stalls', label: 'Registered Stalls' },
    { id: 'finance', label: 'Finance' },
    { id: 'gallery', label: 'Gallery' },
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Rainbow Vista - BizKids
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mb-8">
                Empowering young entrepreneurs to shape the future
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
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
                <div className="space-y-12">
                  <section className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Event Details</h2>
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Date & Time</h3>
                          <div className="space-y-2 text-gray-600">
                            <p>Date: August 15, 2025</p>
                            <p>Time: 9:00 AM - 5:00 PM</p>
                            <p>Venue: Rainbow Vista Campus</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Registration</h3>
                          <div className="space-y-2 text-gray-600">
                            <p>Registration Fee: ₹200</p>
                            
                            <p>Deadline: July 31, 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prose max-w-none mb-12">
                      <p className="text-gray-600 leading-relaxed">
                        Rainbow Vista BizKids is an exciting entrepreneurship event designed for young minds aged 7-18. 
                        This one-day extravaganza brings together creative young entrepreneurs to showcase their business ideas, 
                        learn from experts, and network with fellow innovators.
                      </p>
                    </div>
                  </section>

                  <section className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Event Posters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Event Posters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((poster) => (
                  <div key={poster} className="relative h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={'/posters/poster-' + poster + '.jpg'}
                      alt={'Event Poster ' + poster}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
                    </div>
                  </section>

                  <section className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">How to Register</h2>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <ol className="space-y-4">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">1</span>
                          <div>
                            <h3 className="font-semibold mb-1">Fill Registration Form</h3>
                            <p className="text-gray-600">Complete the online registration form with your details and business idea</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">2</span>
                          <div>
                            <h3 className="font-semibold mb-1">Submit Business Plan</h3>
                            <p className="text-gray-600">Upload a simple business plan describing your stall concept</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">3</span>
                          <div>
                            <h3 className="font-semibold mb-1">Pay Registration Fee</h3>
                            <p className="text-gray-600">Complete the payment to secure your spot</p>
                          </div>
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
                  <h2 className="text-3xl font-bold mb-4 text-center">Top Board</h2>

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
                  <h2 className="text-3xl font-bold mb-8 text-center">Registered Stalls</h2>
                  
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
                  <h2 className="text-3xl font-bold mb-4 text-center">Financial Overview</h2>
                  
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
              {activeTab === 'gallery' && (
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center">Event Gallery</h2>
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
