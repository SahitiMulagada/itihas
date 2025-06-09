"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense, useCallback } from 'react';
import { MdAccessTime, MdLocationOn, MdCalendarToday, MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import Layout from '../../../../components/layout/Layout';
import SectionHeading from '../../../../components/common/SectionHeading';
import Gallery from '@/components/projects/Gallery';
import { GalleryService } from '@/components/projects/types';
import galleryService from '@/components/bizkids/galleryService';

import { type Stall } from '../../../../data/registeredStalls';
import { stallsService, type EventReview } from '../../../../components/bizkids/stallsService';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import service from '@/app/store/baseapiservice';



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
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams ? searchParams.get('tab') : null;
  const [activeTab, setActiveTab] = useState(tabParam || 'about');
  const [registeredStalls, setRegisteredStalls] = useState<Stall[]>([]);
  const [registeredStallsLoading, setRegisteredStallsLoading] = useState(true);
  const [topStalls, setTopStalls] = useState<import('@/components/bizkids/stallsService').TopStall[]>([]);
  const [topStallsLoading, setTopStallsLoading] = useState(true);

  // Add animation styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = floatAnimation;
    document.head.appendChild(styleElement);
    return () => styleElement.remove();
  }, []);

  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState<EventReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImageUrl, setUserImageUrl] = useState('');

  const pastelBgClasses = [
    'bg-yellow-50',
    'bg-blue-50',
    'bg-pink-50',
    'bg-green-50',
    'bg-purple-50'
  ];

  const tabs = [
    { id: 'about', label: 'About Event' },
    { id: 'stalls', label: 'Registered Stalls' },
    { id: 'board', label: 'Stall Board' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'organization', label: 'Organized by' }
  ];

  const fetchReviews = useCallback(async () => {
    setReviewsLoading(true);
    setError(null);
    console.log('fetchReviews called');
    try {
      const reviewsData = await stallsService.getEventReviews(1);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching event reviews:', error);
      setError('Failed to load reviews. Please try again later.');
      toast.error('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
      console.log('fetchReviews finished');
    }
  }, []);

  const fetchTopStalls = useCallback(async () => {
    setTopStallsLoading(true);
    try {
      const topStallsData = await stallsService.getTopReviewBoard();
      setTopStalls(topStallsData);
    } catch (error) {
      console.error('Error fetching top stalls:', error);
      toast.error('Failed to load top stalls');
    } finally {
      setTopStallsLoading(false);
    }
  }, []);

  const fetchRegisteredStalls = useCallback(async () => {
    setRegisteredStallsLoading(true);
    try {
      const data = await stallsService.getStalls();
      setRegisteredStalls(data);
    } catch (error) {
      console.error('Error fetching stalls:', error);
      toast.error('Failed to load stalls');
    } finally {
      setRegisteredStallsLoading(false);
    }
  }, []);

  useEffect(() => {
    const tabFromUrl = searchParams ? searchParams.get('tab') || 'about' : 'about';
    setActiveTab(tabFromUrl);

    if (tabFromUrl === 'feedback') {
      fetchReviews();
    } else if (tabFromUrl === 'board') {
      fetchTopStalls();
    } else if (tabFromUrl === 'stalls') {
      fetchRegisteredStalls();
    }
  }, [fetchReviews, fetchTopStalls, fetchRegisteredStalls, searchParams]);

 

    useEffect(() => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('x-access-token');
    const gglUsrDtls = localStorage.getItem('gglUsrDtls');
    setIsLoggedIn(!!token && !!gglUsrDtls);
  }
}, []);
  
    const client_id = '374543033973-ekqtviiojjn3corsoqrureeehs258et4.apps.googleusercontent.com';
  
    const handleGoogleSuccess = (credentialResponse: any) => {
      if (credentialResponse?.credential) {
        const decoded: any = jwtDecode(credentialResponse.credential)
        console.log('Google Response Decoded:', decoded)
  
        const userData = {
          user_name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          ggl_usr_id: decoded.sub,
          // ggl_res: decoded,
          lgn_clnt_id:  client_id ,
          lgn_clnt_nm: 'Ithihas',
          app: 'web'
        }
  
        if (isBrowser) {
          localStorage.setItem('gglUsrDtls', btoa(JSON.stringify(userData)));
        }
        console.log(userData, "gglUsrDtls");
  
        setIsLoading(true)
  
        const rte = `auth2/ss/google/login`;
  
        service.post(rte, userData)
          .then((response) => {
            console.log(response, "responsemmmmmmmmmmm")
  
            if (response.status === 200 && response.data) {
              if (isBrowser) {
                localStorage.setItem('userData', JSON.stringify(response.data));
              }
              toast.success('Google login successful');
              setIsLoggedIn(true);
            } else {
              toast.error(response.data.message || 'Something went wrong')
            }
          })
          .catch((error) => {
            console.error('Goole Authentication Error:', error)
            const errorMessage = error.message || 'Something went wrong'
            toast.error(errorMessage)
          })
          .finally(() => {
            setIsLoading(false)
          })
  
  
  
  
  
      }
    }
  
  
    const handleGoogleFailure = () => {
      toast.error('Google login failed')
    }
  
    
  useEffect(() => {
  const userDataString = localStorage.getItem('gglUsrDtls');
  if (userDataString) {
    try {
      const decodedString = atob(userDataString);
      const userData = JSON.parse(decodedString);
      setUserName(userData.user_name || userData.name || '');
      setUserImageUrl(userData.userImageUrl || userData.picture || '');
    } catch {}
  }
}, []);



  
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';


  let userId = null;
function getUserIdFromToken() {
  if (!isBrowser) return null;
  
  const token = localStorage.getItem('x-access-token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.usr_id;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
}

userId = getUserIdFromToken();

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Please sign in to submit a review');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review before submitting');
      return;
    }

    const userId = getUserIdFromToken();
    if (!userId) {
      toast.error('Please sign in again');
      return;
    }

    setSubmittingReview(true);
    setError(null);
    try {
      const token = localStorage.getItem('x-access-token');
      const decoded: any = jwtDecode(token!);
      
      await stallsService.submitEventReview(1, {
        evnt_id: 1,
        evnt_hndlr: 'bizkids-2025',
        usr_id: userId,
        usr_nm: decoded.name,
        usr_imge_url_tx: decoded.picture,
        rvw_ct: reviewRating,
        rvw_tx: reviewText.trim()
      });
      await fetchReviews();
      setReviewText('');
      setReviewRating(5);
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
      toast.error('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url);

    if (tabId === 'reviews') {
      fetchReviews();
    }
  };

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
                        <span>Before K,L Blocks</span>
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
          <div className="mb-8">
            {/* Mobile Tabs - 2x3 Grid */}
            <div className="md:hidden grid grid-cols-2 gap-2 px-4">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`p-3 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop Tabs - Horizontal List */}
            <div className="hidden md:flex justify-center overflow-x-auto">
              <div className="inline-flex flex-nowrap bg-gray-100 p-1 rounded-xl shadow-sm">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-base whitespace-nowrap ${index > 0 ? 'ml-1' : ''} ${activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
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
                        <MdLocationOn className="mr-2 text-blue-600" /> Before K,L Blocks 
                      </p>
                      <div className="flex items-center">
                        <span className="text-blue-600 font-semibold">(Rainbow Vista Rock gardens)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg text-gray-700 mb-6 p-4 rounded-2xl shadow-lg border-gray-200 border">
                    
                  <p className="p-5" style={{textIndent: '50px', textAlign: 'justify'}}>BizKids is an exciting entrepreneurship event designed to inspire and empower young minds to explore the world of business. Through this unique platform, children below 18 years can experience firsthand what it means to be an entrepreneur.</p>
                    <div className="text-blue-700 font-semibold border-b pt-2">This is an event organized by kids for the kids for non profit.</div>
                    <div className="text-blue-700 font-semibold border-b">We are doing our best to make this event a success and accomodate every intrested young entrepreneur.</div>
                    <div className="text-blue-700 font-semibold border-b">Please bear with us if we are making any first timer mistakes and we are learning as we go.</div>
                  </div>
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
                      <div className="relative w-96 h-96 flex-shrink-0 hidden md:flex items-center justify-center">
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
                  <div className="bg-blue-50 rounded-lg p-6 mb-6 mt-12">
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
                <SectionHeading title="Top Rated Stalls" />




                {topStallsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="pt-5" style={{textIndent: '50px', textAlign: 'justify'}}>The list is based on the reviews on each stall page.</div>
                    <div className="pt-1 pb-5" style={{textIndent: '50px', textAlign: 'justify'}}>You can click on the stall details to go to the stall page.</div>
                    <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-200 border-b-2 border-gray-300">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">Rank</th>
                          <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">Stall Name</th>
                          <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">Young Entrepreneurs</th>
                          <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">Stars received</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {topStalls.map((stall, index) => (
                          <tr key={stall.stl_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} onClick={() => router.push(`/projects/rainbow-vista/bizkids/stall/${stall.stl_id}`)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stall.stl_nm}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{stall.mbr_lst.split(',').join(', ')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stall.str_ct.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stalls' && (
              <div>
                <SectionHeading title="Registered Stalls" />
                <div className="mb-6">
                  <div className="relative max-w-md w-full mx-auto px-1 sm:px-0">
  <input
    type="text"
    placeholder="Search by name, school, block, or category..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-4 pr-10 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
  />
  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</div>

                </div>
                {/* Desktop View */}
                <div className="hidden md:block mt-8 overflow-x-auto">
                <div className="pt-1 pb-5" style={{textIndent: '50px', textAlign: 'justify'}}>You can click on the stall details to go to the stall page.</div>
                  <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-200 border-b-2 border-gray-300">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">S.No</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">Stall No</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">Stall Name</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase border-r border-gray-300">Young Entrepreneurs</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase">Categories</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {registeredStalls.filter(stall => {
                        const searchLower = searchTerm.toLowerCase();
                        return stall.entrepreneurs.some(entrepreneur => 
                          entrepreneur.mbr_nm.toLowerCase().includes(searchLower) ||
                          entrepreneur.schl_nm.toLowerCase().includes(searchLower) ||
                          entrepreneur.blk_nu.toLowerCase().includes(searchLower)
                        ) || stall.categories.some(category =>
                          category.ctgry_nm.toLowerCase().includes(searchLower)
                        );
                      }).map((stall, index) => (
                        <tr 
                          key={index} 
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 hover:text-black transition-colors duration-150 cursor-pointer border-b border-gray-200`} 
                          onClick={() => router.push(`/projects/rainbow-vista/bizkids/stall/${stall.stl_id}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">{stall.stl_nu || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">{stall.stl_nm || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-200">
                            <div className="space-y-2">
                              {stall.entrepreneurs.map((entrepreneur, eIndex) => (
                                <div key={eIndex} className="flex flex-col">
                                  <span className="font-medium">{entrepreneur.mbr_nm}</span>
                                  <span className="text-xs text-gray-400">{entrepreneur.schl_nm}</span>
                                  <span className="text-xs text-gray-400">Block: {entrepreneur.blk_nu}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex flex-wrap gap-2">
                              {stall.categories.map((category, cIndex) => (
                                <span key={cIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {category.ctgry_nm}
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
                <div className="pt-1 pb-5" style={{textIndent: '50px', textAlign: 'justify'}}>You can click on the stall details to go to the stall page.</div>
                  {registeredStalls.filter(stall => {
                    const searchLower = searchTerm.toLowerCase();
                    return stall.entrepreneurs.some(entrepreneur => 
                      entrepreneur.mbr_nm.toLowerCase().includes(searchLower) ||
                      entrepreneur.schl_nm.toLowerCase().includes(searchLower) ||
                      entrepreneur.blk_nu.toLowerCase().includes(searchLower)
                    ) || stall.categories.some(category =>
                      category.ctgry_nm.toLowerCase().includes(searchLower)
                    );
                  }).map((stall, index) => (
                  <div 
  key={index} 
  className={`rounded-2xl shadow-lg border border-transparent hover:border-blue-400 hover:shadow-xl transition-all duration-300 p-5 relative overflow-hidden ${pastelBgClasses[index % pastelBgClasses.length]}`}
  onClick={() => router.push(`/projects/rainbow-vista/bizkids/stall/${stall.stl_id}`)}
>

  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
    <div className="flex items-center space-x-3">
      <span className="text-lg font-bold text-blue-600 group-hover:scale-110 transition-transform">#{index + 1}</span>
      <span className="text-sm text-gray-500 font-medium">(Stall {stall.stl_nu || '-'}) <b className="text-blue-600 font-semibold text-lg">{stall.stl_nm}</b></span>
    </div>
    <div className="flex flex-wrap gap-1">
      {stall.categories.map((category, cIndex) => (
        <span 
          key={cIndex}
          className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full border border-blue-100"
        >
          {category.ctgry_nm}
        </span>
      ))}
    </div>
  </div>

  {/* Entrepreneurs */}
  <div className="space-y-4">
    {stall.entrepreneurs.map((entrepreneur, eIndex) => (
      <div
        key={eIndex}
        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition group"
      >
        <h3 className="font-semibold text-gray-900 text-base mb-1 flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
            {entrepreneur.mbr_nm[0]}
          </span>
          {entrepreneur.mbr_nm}
        </h3>
        <div className="text-sm text-gray-600 space-y-1 mt-2">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-blue-100 text-blue-600 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="leading-snug">{entrepreneur.schl_nm}</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-1 bg-green-100 text-green-600 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="leading-snug">Block {entrepreneur.blk_nu}</p>
          </div>
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
                <SectionHeading title="Finance" />
                <div className="p-6 mb-8">
                  <p className="text-blue-800 text-lg mb-4 font-semibold">We want to keep the money collected and expenses transparent.</p>
                  <p className="text-blue-700 font-semibold">This is an event organized by kids for the kids for non profit.</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-12">
                  <div className="bg-green-50 rounded-lg shadow-sm p-6 border-2 border-green-500">
                    <h4 className="text-sm font-medium text-green-600 mb-1">Amount Collected</h4>
                    <p className="text-2xl font-bold text-green-700">₹36,600</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg shadow-sm p-6 border-2 border-blue-500">
                    <h4 className="text-sm font-medium text-blue-600 mb-1">Donations Received</h4>
                    <p className="text-2xl font-bold text-blue-700">₹500</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg shadow-sm p-6 border-2 border-amber-500">
                    <h4 className="text-sm font-medium text-amber-600 mb-1">Total Expenses</h4>
                    <p className="text-2xl font-bold text-amber-700">₹53,900</p>
                  </div>
                </div>

                {/* Amount Collected */}
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 px-6">Amount Collected</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-2 border-green-500 rounded-lg overflow-hidden divide-y divide-green-200">
                      <thead className="bg-green-50 border-b border-green-300">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-green-200">S.No</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-green-200">Name/ Category</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-green-200">Quantity</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-green-200">Unit Cost</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-green-200">Total Paid</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-green-200">
                        {[
                          { sno: 1, name: 'Half Stalls Registered', quantity: 30, unitCost: 750, totalPaid: 22500 },
                          { sno: 2, name: 'Full Stalls Registered', quantity: 8, unitCost: 1500, totalPaid: 12000 },
                          { sno: 3, name: 'Late Registration Full Stall', quantity: 1, unitCost: 2100, totalPaid: 2100 }
                        ].map((item) => (
                          <tr key={item.sno} className="hover:bg-green-50 transition-all duration-200 ease-in-out hover:shadow-inner border-b border-green-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-green-200">{item.sno}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 border-r border-green-200">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-green-200 text-center">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-green-200 text-right">{item.unitCost}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-green-200 text-right">{item.totalPaid}</td>
                          </tr>
                        ))}
                        <tr className="bg-green-50 font-semibold">
                          <td colSpan={4} className="px-6 py-4 text-right text-sm text-gray-900 border-r border-green-200">Total Amount Collected</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-green-200 text-right">36600</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Donations Received */}
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 px-6">Donations Received</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-2 border-blue-500 rounded-lg overflow-hidden divide-y divide-blue-200">
                      <thead className="bg-blue-50 border-b border-blue-300">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-blue-200">S.No</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-blue-200">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-blue-200">Flat</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-r border-blue-200">Quantity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-200">
                        {[
                          { sno: 1, name: 'Panduranga Rao Kondreddi', flat: 'K 1310', quantity: 500 }
                        ].map((item) => (
                          <tr key={item.sno} className="hover:bg-blue-50 transition-all duration-200 ease-in-out hover:shadow-inner border-b border-blue-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-blue-200">{item.sno}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 border-r border-blue-200">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-blue-200">{item.flat}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-blue-200 text-right">{item.quantity}</td>
                          </tr>
                        ))}
                        <tr className="bg-blue-50 font-semibold">
                          <td colSpan={3} className="px-6 py-4 text-right text-sm text-gray-900 border-r border-blue-200">Total Donations</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-blue-200 text-right">500</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Expenses */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 px-6">Expenses</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border-2 border-amber-500 rounded-lg overflow-hidden divide-y divide-amber-200">
                    <thead className="bg-amber-50 border-b border-amber-300">
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
                        { sno: 1, name: 'Stall Rent\nInclude Canopy, \n4 tables(2 L tables arrangement with table cloth),1 light,\n 3 plastic chairs', quantity: 24, unitCost: 2100, totalExpense: 50400, unit: 'Per Stall' },
                        { sno: 2, name: 'Certificate', quantity: 60, unitCost: 30, totalExpense: 1800, unit: 'Per Certificate' },
                        { sno: 3, name: 'Trophies', quantity: 1, unitCost: 500, totalExpense: 500, unit: '1st,2nd,3rd Trophies' },
                        { sno: 4, name: 'Posters & flyers & Stall No prints', quantity: 200, unitCost: 0, totalExpense: null, unit: 'Prints taken care by Sahiti' },
                        { sno: 5, name: 'Big Banner', quantity: 1, unitCost: 900, totalExpense: 900, unit: '' },
                        { sno: 6, name: 'Postal charges', quantity: 1, unitCost: 300, totalExpense: 300, unit: '' },
                        { sno: 7, name: 'QR Codes prints', quantity: 40, unitCost: 0, totalExpense: 0, unit: 'Taken care by Sahiti' },
                        { sno: 8, name: 'Additional Chairs', quantity: 1, unitCost: 0, totalExpense: 0, unit: 'Taken care by Rainbow Vistal Team' },
                        { sno: 9, name: 'Electracity', quantity: null, unitCost: 0, totalExpense: 0, unit: 'Taken care by Rainbow Vistal Team' },
                        { sno: 10, name: 'Cleaning', quantity: null, unitCost: 0, totalExpense: 0, unit: 'Taken care by Rainbow Vistal Team' },
                        { sno: 11, name: 'Mike and speaker', quantity: null, unitCost: null, totalExpense: null, unit: '' },
                        { sno: 12, name: 'Arrangement charges if any', quantity: null, unitCost: null, totalExpense: null, unit: '' },
                      ].map((item) => (
                        <tr key={item.sno} className="hover:bg-blue-50 transition-all duration-200 ease-in-out hover:shadow-inner border-b border-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">{item.sno}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-pre-line border-r border-gray-200">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-center">{item.quantity || ''}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-right">{item.unitCost || ''}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 text-right">{item.totalExpense || ''}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.unit}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-semibold border-t-2 border-gray-300">
                        <td colSpan={4} className="px-6 py-4 text-right text-sm text-gray-900 border-r border-gray-200">Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">53900</td>
                        <td className="px-6 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div>
                <SectionHeading title="Feedback" />
                <div className="max-w-4xl mx-auto">
                  {/* Reviews Stats */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{reviews.length > 0
                        ? (reviews.reduce((acc, review) => acc + review.rvw_ct, 0) / reviews.length).toFixed(1)
                        : '0.0'}</div>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-5 h-5 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Average Rating</div>
                      </div>
                  </div>

                  {/* Reviews List */}
                  {/* Review Form */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    {error && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                        {error}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-4">Please write your feedback</h3>
                    {!isLoggedIn ? (
                      <GoogleOAuthProvider clientId={client_id}>
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <p className="text-gray-600 text-sm">Sign in with Google to write your feedback</p>
                          <div className="relative w-full max-w-md">
                            <div className="h-0.5 w-full bg-gray-100 absolute -z-10">
                              <div
                                className="h-full w-1/4"
                                style={{
                                  background: 'linear-gradient(90deg, #db4437, #f4b400, #0f9d58, #4285f4)',
                                  backgroundSize: '400% 400%',
                                  animation: 'gradientShift 4s linear infinite',
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-center py-3">
                              <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleFailure}
                                width="280"
                                theme="outline"
                                text="signin_with"
                                shape="rectangular"
                              />
                            </div>
                          </div>
                        </div>
                      </GoogleOAuthProvider>
                    ) : (
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                       {isLoggedIn && (
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                              <img
                                src={userImageUrl}
                                alt={userImageUrl || ''}
                                className="w-10 h-10 rounded-full"
                              />
                          </div>
                          <div>
                            <p className="font-medium">{userName}</p>
                          </div>
                        </div>
                            )}

                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setReviewRating(i + 1)}
                              className="focus:outline-none"
                            >
                              <svg
                                className={`w-6 h-6 ${i < reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience at BizKids..."
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          required
                        />
                        <button
                          type="submit"
                          disabled={submittingReview || !reviewText.trim()}
                          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                        >
                          {submittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Reviews List */}
                  {reviewsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading reviews...</p>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No reviews/feedback yet. Be the first to review/give feedback!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.rvw_id} className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              {review.usr_imge_url_tx && (
                                <img
                                  src={review.usr_imge_url_tx}
                                  alt={review.usr_nm}
                                  className="w-8 h-8 rounded-full"
                                />
                              )}
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{review.usr_nm}</h3>
                                <p className="text-sm text-gray-500">
                                  {new Date(review.rvw_ts).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rvw_ct ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-700">{review.rvw_tx}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="container mx-auto px-4">
                <div className="mt-8">
                  <Gallery galleryService={galleryService as GalleryService} />
                </div>
              </div>
            )}

            {activeTab === 'organization' && (
              <div>
                <SectionHeading title="Organized by" />

                <div className="p-6 mb-8">
                  
                  <p className="text-blue-700 font-semibold text-center text-lg">This is an event organized by kids for the kids for non profit.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mt-8 px-4">
                  {[
                    { name: 'Sahiti Mulagada', role: 'Team Member & Event Initiator', block: 'K', school: 'Ganges Valley School', image: '/images/sahiti/sahiti.jpg' },
                    { name: 'Adwitha Udumala', role: 'Team Member', block: 'K', school: 'Delhi Public School' , image: '/projects/bizkids/profiles/adwitha.jpg'},
                    { name: 'Akshika Sangal', role: 'Team Member', block: 'H', school: 'Ganges Valley School' , image: '/projects/bizkids/profiles/akshika.jpg'},
                    { name: 'Savar Kokatnur', role: 'Team Member', block: 'M', school: 'Delhi Public School' , image: '/projects/bizkids/profiles/savar.jpg'},
                    { name: 'Vidya Chinni', role: 'Team Member', block: 'L', school: 'Allen' , image: '/projects/bizkids/profiles/vidya.jpg'},
                    { name: 'Nishika Choppa', role: 'Team Member', block: 'O', school: 'Ganges Valley School' , image: '/projects/bizkids/profiles/nishika.jpg' }
                  ].map((member) => (
                    <div 
                      key={member.name} 
                      className="text-center p-6 bg-white rounded-xl border-2 border-gray-100 shadow-sm 
                        hover:shadow-lg hover:border-blue-200 hover:scale-105 
                        transition-all duration-300 ease-in-out"
                    >
                      <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-50 shadow-md">
                        <div className="w-full h-full transform transition-transform duration-300 hover:scale-110">
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
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                            <span className="text-3xl font-bold text-blue-600">
                              {member.name.split(' ').map(word => word[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mt-4 group-hover:text-blue-700">{member.name}</h3>
                      <p className="text-sm font-medium text-blue-600 mt-2">{member.role}</p>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">{member.school}</p>
                        <p className="text-sm font-medium text-gray-500 mt-1"> {member.block} Block @ Rainbow Vista Rock Gardens</p>
                      </div>
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
