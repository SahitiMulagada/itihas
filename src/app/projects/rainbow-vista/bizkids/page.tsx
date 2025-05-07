"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import { index } from 'langchain/indexes';

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
    image: 'projects/bizkids/board/placeholders.png'
  },
  {
    name: 'Michael Chen',
    role: 'Vice President',
    image: 'projects/kidsbiz/board/placeholders.png'
  },
  {
    name: 'Emma Davis',
    role: 'Secretary',
    image: '/projects/kidsbiz/board/placeholders.png'
  }
];

export default function RainbowVistaBizKids() {
  const [activeTab, setActiveTab] = useState('about');
  const [activeFinanceSection, setActiveFinanceSection] = useState('income');

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
        {/* Hero Section */}
        <div className="relative h-[500px] w-full">
          <Image
            src="/projects/rainbow-vista.jpg"
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
            <div className="flex overflow-x-auto space-x-1 mb-8 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
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
                  </section>
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
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center">Registered Stalls</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stalls.map((stall) => (
                  <Link 
                    href={'/projects/rainbow-vista/bizkids/stalls/' + stall.id} 
                    key={stall.id}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={stall.image}
                          alt={stall.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-blue-600 mb-2">{stall.category}</div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {stall.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{stall.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {stall.entrepreneurs.map((entrepreneur, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="relative w-6 h-6 rounded-full overflow-hidden">
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
                    
                  </Link>
                ))}
              </div>
                </div>
              )}

              {/* Finance Tab */}
              {activeTab === 'finance' && (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4 text-center">Financial Information</h2>
                  
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <button 
                      onClick={() => setActiveFinanceSection('income')}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold mb-2">Amount Collected</h3>
                      <p className="text-2xl font-bold text-green-600">₹3,000</p>
                      <p className="text-sm text-gray-500 mt-2">From 15 Stalls</p>
                    </button>

                    <button 
                      onClick={() => setActiveFinanceSection('expenses')}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
                      <p className="text-2xl font-bold text-red-600">₹3,000</p>
                      <p className="text-sm text-gray-500 mt-2">View Breakdown</p>
                    </button>

                    <button 
                      onClick={() => setActiveFinanceSection('balance')}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold mb-2">Award Money</h3>
                      <p className="text-2xl font-bold text-blue-600">₹10,000</p>
                      <p className="text-sm text-gray-500 mt-2">Community Sponsored</p>
                    </button>
                  </div>

                  {/* Note about awards */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-xl">
                    <p className="text-blue-700">
                      <span className="font-semibold">Note:</span> The remaining amount after expenses will be distributed as awards to the top three stalls based on user reviews:
                      <br />1st Prize: ₹5,000 | 2nd Prize: ₹3,000 | 3rd Prize: ₹2,000
                    </p>
                  </div>

                  {/* Detailed Tables */}
                  {activeFinanceSection === 'income' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Registration Fee</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹200 × 15 stalls</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹3,000</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Total Collection</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹3,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeFinanceSection === 'expenses' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tables & Chairs</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 sets @ ₹100 each</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹1,500</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Transportation</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Setup & Cleanup</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹800</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Banners & Signage</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Event Branding</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹500</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Miscellaneous</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Supplies & Others</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹200</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Total Expenses</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹3,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeFinanceSection === 'balance' && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total Collection</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">From 15 Stalls</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹3,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total Expenses</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Event Operations</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹3,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Community Sponsorship</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rainbow Vista</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹10,000</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Total Award Money</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">₹10,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="space-y-8">
                    {/* Income Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Income</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Total Stalls Registered</span>
                          <span className="font-semibold">15 stalls</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Registration Fee per Stall</span>
                          <span className="font-semibold">₹200</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-4">
                          <span className="font-semibold">Total Collection</span>
                          <span className="font-semibold text-green-600">₹3,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Expenses Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Expenses</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Tables & Chairs Rental (15 sets)</span>
                          <span className="font-semibold text-red-600">₹1,500</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Transportation</span>
                          <span className="font-semibold text-red-600">₹800</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Banners & Signage</span>
                          <span className="font-semibold text-red-600">₹500</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Miscellaneous</span>
                          <span className="font-semibold text-red-600">₹200</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-4">
                          <span className="font-semibold">Total Expenses</span>
                          <span className="font-semibold text-red-600">₹3,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Balance Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Balance Sheet</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Total Collection</span>
                          <span className="font-semibold text-green-600">₹3,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Total Expenses</span>
                          <span className="font-semibold text-red-600">₹3,000</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-4">
                          <span className="font-semibold">Remaining Amount for Awards</span>
                          <span className="font-semibold text-blue-600">₹10,000</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          * Additional award money is sponsored by Rainbow Vista Community
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center">Event Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
                      <div key={img} className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={'/gallery/image-' + img + '.jpg'}
                          alt={'Gallery Image ' + img}
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
