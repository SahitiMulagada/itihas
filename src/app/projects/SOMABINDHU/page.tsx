import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { MdOutlineChevronRight } from 'react-icons/md';
import { GiMedicines, GiHerbsBundle } from 'react-icons/gi';
import { FaRegLightbulb } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';

export default function Somabindhu() {
  return (
    <Layout>
      <div className="min-h-screen bg-green-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center text-sm">
              <Link href="/projects" className="text-green-600 hover:text-green-800">Projects</Link>
              <MdOutlineChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <span className="text-gray-600">Somabindhu</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-100 to-green-200 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <SectionTitle 
                title="Somabindhu" 
                subtitle="Experience the Power of Traditional Ayurvedic Medicine  Discover our natural healing blend, crafted with ancient wisdom for modern wellness." 
              />
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="py-16">

          <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-green-500 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4  items-center text-center">
            <FaRegLightbulb className="w-6 h-6 mr-2 " /> Inspired by Our Grandparents' Wisdom
          </h2>
          <p className="text-gray-700 mb-6">
          This project was inspired by the traditional herbal remedies prepared lovingly by our grandparents. They used to make kashayam from herbs to treat cough, cold, and mild fever.
          </p>
          </div>
          </div>

          </div>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                  <GiHerbsBundle className="w-6 h-6 mr-2" />
                  Natural Ingredients
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-2">Core Ingredients</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Tulsi (Holy Basil)</li>
                      <li>Adrak (Ginger)</li>
                      <li>Dalchini (Cinnamon)</li>
                      <li>Kali Mirch (Black Pepper)</li>
                      <li>Mulethi (Licorice)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-2">Benefits</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>100% Natural & Organic</li>
                      <li>No Artificial Additives</li>
                      <li>Sustainably Sourced</li>
                      <li>Traditional Recipe</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Easy to Prepare Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-green-800 mb-8 text-center flex items-center justify-center">
                <GiMedicines className="w-8 h-8 mr-3" />
                Easy to Prepare
              </h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                    <div className="text-3xl mb-3">1️⃣</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Boil Water</h3>
                    <p className="text-gray-700">Boil 1 cup of water</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                    <div className="text-3xl mb-3">2️⃣</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Add Pill</h3>
                    <p className="text-gray-700">Drop one SOMABINDHU pill into the hot water</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                    <div className="text-3xl mb-3">3️⃣</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Let it Steep</h3>
                    <p className="text-gray-700">Let it dissolve and steep for 3–4 minutes</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                    <div className="text-3xl mb-3">4️⃣</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Enjoy</h3>
                    <p className="text-gray-700">Stir and sip like tea (best taken warm)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Works Section */}
        <div className="bg-green-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-green-800 mb-8 text-center flex items-center justify-center">
                <FaRegLightbulb className="w-8 h-8 mr-3" />
                Why This Works
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <i className="fas fa-history text-green-600 text-2xl mt-1 mr-4"></i>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-3">Ancient Wisdom</h3>
                      <p className="text-gray-700">Based on centuries-old Ayurvedic principles that have been proven effective through generations.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-leaf text-green-600 text-2xl mt-1 mr-4"></i>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-3">Natural Healing</h3>
                      <p className="text-gray-700">Each ingredient is carefully selected for its medicinal properties and combined in the perfect proportion.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-balance-scale text-green-600 text-2xl mt-1 mr-4"></i>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-3">Holistic Approach</h3>
                      <p className="text-gray-700">Addresses not just the symptoms but helps boost overall immunity and wellness.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Team Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-green-800 mb-8 text-center flex items-center justify-center">
                <HiOutlineUserGroup className="w-8 h-8 mr-3" />
                Project Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                      <Image
                        src="/projects/somabindhu/Lokesh.jpg"
                        alt="Lokesh Ch"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800">Lokesh Ch</h3>
                      <p className="text-gray-600">Project Lead</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                      <Image
                        src="/projects/somabindhu/Humsini.jpg"
                        alt="Humsini N"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800">Humsini N</h3>
                      <p className="text-gray-600">Project Lead</p>
                    </div>
                  </div>

                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                      <Image
                        src="/images/sahiti/sahiti.jpg"
                        alt="Team Member"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800">Sahiti Mulagada</h3>
                      <p className="text-gray-600">Knowledge Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
