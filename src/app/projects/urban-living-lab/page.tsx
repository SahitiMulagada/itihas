'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/common/SectionHeading';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.2 } }
};

export default function UrbanLivingLab() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative w-full bg-gradient-to-br from-blue-900 to-blue-800 text-white py-24 overflow-hidden"
      >
        <motion.div 
          variants={fadeInUp}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">VPULL - Urban Living Lab</h1>
            <p className="text-xl text-blue-100">Building a collaborative ecosystem for sustainable urban development in Visakhapatnam</p>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm" />
      </motion.section>

      {/* Project Overview Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full bg-gray-50 py-24"
      >
        <motion.div 
          variants={fadeInUp}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="Project Overview" />
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                The Visakhapatnam Platform for Urban Living Lab (VPULL) is an innovative initiative that brings together various stakeholders to create sustainable solutions for urban development challenges. Through this platform, we facilitate collaboration between NGOs, TERI (The Energy and Resources Institute), GVMC (Greater Visakhapatnam Municipal Corporation), and local universities.
              </p>
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-blue-900 text-xl mb-4">Collaboration</h3>
                  <p className="text-gray-600">Fostering partnerships between government, academia, and civil society organizations</p>
                </motion.div>
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-blue-900 text-xl mb-4">Innovation</h3>
                  <p className="text-gray-600">Creating innovative solutions for urban sustainability challenges</p>
                </motion.div>
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-blue-900 text-xl mb-4">Impact</h3>
                  <p className="text-gray-600">Driving positive change in Greater Visakhapatnam&apos;s urban development</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* About V-PULL Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full bg-white py-24"
      >
        <motion.div 
          variants={fadeInUp}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="About V-PULL" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={fadeInUp}
                className="space-y-6"
              >
                <p className="text-gray-600 leading-relaxed text-lg">
                  V-PULL is a pioneering initiative that transforms Visakhapatnam into a living laboratory for sustainable urban development. Our platform brings together diverse stakeholders to co-create innovative solutions for urban challenges.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Multi-stakeholder Collaboration</h3>
                      <p className="text-gray-600">Bringing together government, academia, and civil society</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Innovation Hub</h3>
                      <p className="text-gray-600">Fostering creative solutions for urban challenges</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/urban-living-lab/about.jpg"
                  alt="V-PULL Activities"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* V-PULL Framework Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-24"
      >
        <motion.div 
          variants={fadeInUp}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="V-PULL Framework" />
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600">01</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Problem Identification</h3>
                <p className="text-gray-600">Identifying key urban challenges through stakeholder engagement and data analysis</p>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600">02</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Co-Creation</h3>
                <p className="text-gray-600">Developing solutions through collaborative workshops and innovation sessions</p>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600">03</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Implementation</h3>
                <p className="text-gray-600">Piloting and scaling solutions with continuous monitoring and evaluation</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Project Team Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full bg-white py-24"
      >
        <motion.div 
          variants={fadeInUp}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="Project Team" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  name: 'Dr. Sarah Johnson',
                  role: 'Project Lead',
                  image: '/images/urban-living-lab/team/member1.jpg'
                },
                {
                  name: 'Prof. Raj Kumar',
                  role: 'Research Head',
                  image: '/images/urban-living-lab/team/member2.jpg'
                },
                {
                  name: 'Ms. Priya Sharma',
                  role: 'Community Lead',
                  image: '/images/urban-living-lab/team/member3.jpg'
                },
                {
                  name: 'Mr. David Chen',
                  role: 'Technical Lead',
                  image: '/images/urban-living-lab/team/member4.jpg'
                }
              ].map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-24"
      >
        <motion.div 
          variants={fadeInUp}
          className="container mx-auto px-4"
        >
          <div className="max-w-6xl mx-auto">
            <SectionHeading title="Gallery" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { src: '/images/urban-living-lab/gallery/1.jpg', title: 'Community Workshop' },
                { src: '/images/urban-living-lab/gallery/2.jpg', title: 'Urban Planning Session' },
                { src: '/images/urban-living-lab/gallery/3.jpg', title: 'Stakeholder Meeting' },
                { src: '/images/urban-living-lab/gallery/4.jpg', title: 'Field Research' },
                { src: '/images/urban-living-lab/gallery/5.jpg', title: 'Innovation Lab' },
                { src: '/images/urban-living-lab/gallery/6.jpg', title: 'Project Implementation' }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="group relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

