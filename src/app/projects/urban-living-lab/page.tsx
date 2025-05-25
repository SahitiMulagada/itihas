'use client';

import Image from 'next/image';
import SectionTitle from '../../../components/common/SectionTitle';

export default function UrbanLivingLab() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <div className="bg-blue-100 py-5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle 
              title="VPULL - Urban Living Lab" 
              subtitle="Building a collaborative ecosystem for sustainable urban development in Visakhapatnam" 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Overview Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The Visakhapatnam Platform for Urban Living Lab (VPULL) is an innovative initiative that brings together various stakeholders to create sustainable solutions for urban development challenges. Through this platform, we facilitate collaboration between NGOs, TERI (The Energy and Resources Institute), GVMC (Greater Visakhapatnam Municipal Corporation), and local universities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Collaboration</h3>
                <p className="text-sm text-gray-600">Fostering partnerships between government, academia, and civil society organizations</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">Creating innovative solutions for urban sustainability challenges</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Impact</h3>
                <p className="text-sm text-gray-600">Driving positive change in Greater Visakhapatnam's urban development</p>
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Stakeholder Network</h3>
                  <p className="text-gray-600">A comprehensive network connecting NGOs, government bodies, educational institutions, and urban development experts</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Project Repository</h3>
                  <p className="text-gray-600">Centralized database of urban development projects, research, and initiatives</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Event Management</h3>
                  <p className="text-gray-600">Coordination of workshops, seminars, and collaborative sessions</p>
                </div>
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-4">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-semibold text-blue-600">GVMC</span>
                </div>
                <h3 className="font-semibold text-gray-800">Greater Visakhapatnam Municipal Corporation</h3>
              </div>
              <div className="text-center p-4">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-semibold text-blue-600">TERI</span>
                </div>
                <h3 className="font-semibold text-gray-800">The Energy and Resources Institute</h3>
              </div>
              <div className="text-center p-4">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-semibold text-blue-600">AU</span>
                </div>
                <h3 className="font-semibold text-gray-800">Andhra University</h3>
              </div>
            </div>
          </section>

          {/* Get Involved Section */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
            <p className="mb-6">Join us in building a sustainable future for Visakhapatnam. Whether you're an NGO, researcher, or concerned citizen, there's a place for you in our ecosystem.</p>
            <a href="/contact" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
