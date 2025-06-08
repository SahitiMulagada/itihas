"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';

interface Member {
  id: string;
  name: string;
  organization: string;
  education: string;
  role: string;
  image: string;
  bio: string;
  interests: string[];
  contributions: string[];
}

const members: Member[] = [
  {
    id: 'ITH001',
    name: 'Sahiti Mulagada',
    organization: 'itihaS Foundation',
    education: 'Grade 10',
    role: 'Founder & Volunteer',
    image: '/images/sahiti/sahiti.jpg',
    bio: 'A passionate leader who believes in empowering youth to make a difference.',
    interests: ['Social Impact', 'Education', 'Technology', 'Arts'],
    contributions: ['Founded Itihas', 'Led multiple community projects', 'Mentored young members']
  }
];

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter((member) => {
    const name = member.name.toLowerCase();
    const organization = member.organization.toLowerCase();
    const education = member.education.toLowerCase();
    const role = member.role.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      organization.includes(search) ||
      education.includes(search) ||
      role.includes(search)
    );
  });

  return (
    <Layout>
      <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <div className="bg-blue-100 py-5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <SectionTitle title="Our Members" subtitle="Meet the amazing kids who are making a difference in our community" />
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member, index) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.organization}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.education}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* <Link
                          href={`/members/${member.name.toLowerCase().replace(' ', '-')}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Profile
                        </Link> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Want to Join Us?</h2>
              <p className="text-gray-700 mb-8">
                We&apos;re always looking for passionate kids who want to make a difference.
                Join our community and be part of something meaningful!
              </p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
