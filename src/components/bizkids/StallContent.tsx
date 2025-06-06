'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { registeredStalls, type Stall } from '../../data/registeredStalls';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import service from '@/app/store/baseapiservice';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "Amazing innovation! The young entrepreneurs are truly inspiring.",
    author: "John D.",
    date: "2025-06-05"
  },
  {
    id: 2,
    rating: 4,
    comment: "Great presentation and wonderful business idea!",
    author: "Sarah M.",
    date: "2025-06-04"
  }
];

interface StallContentProps {
  stallId: number;
}


function Register() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Register</h2>
      {/* Your registration form goes here */}
      <form>
        <input className="border p-2 mb-2 w-full" placeholder="Email" />
        <input className="border p-2 mb-2 w-full" placeholder="Password" type="password" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
}

export default function StallContent({ stallId }: StallContentProps) {
  const stall = registeredStalls.find(s => s.stl_id === stallId);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

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

      localStorage.setItem('gglUsrDtls', btoa(JSON.stringify(userData)));
      console.log(userData, "gglUsrDtls");



      setIsLoading(true)

      const rte = `auth2/ss/google/login`;

      service.post(rte, userData)
        .then((response) => {
          console.log(response, "responsemmmmmmmmmmm")

          if (response.status === 200 && response.data) {
            localStorage.setItem('userData', JSON.stringify(response.data))
            toast.success('Google login successful');
            setIsLoggedIn(true);
            // router.push('/projects')
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

  const userDataString = localStorage.getItem('userData');

let userId = null;
if (userDataString) {
  try {
    const userData = JSON.parse(userDataString);
    userId = userData.usr_id;
  } catch (error) {
    console.error('Error parsing userData from localStorage:', error);
  }
}
   const handleReviewSubmit = async () => {
      setSubmitLoading(true);
      setSubmitError('');
      const reviewData = {
        rating: newReview.rating,
        comment: newReview.comment,
        userId: userId,
        stallId: stallId,
      };
      service.post('/api/reviews', reviewData)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setNewReview({ rating: 5, comment: '' });
            toast.success('Review submitted successfully');
          } else {
            toast.error(response.data?.message || 'Something went wrong');
          }
        })
        .catch((error) => {
          console.error('Review Submission Error:', error);
          const errorMessage = error.message || 'Something went wrong';
          toast.error(errorMessage);
          setSubmitError('Failed to submit review');
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    };
  


  if (!stall) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Stall not found</h1>
          <Link href="/projects/rainbow-vista/bizkids" className="text-blue-600 hover:underline mt-4 block">
            Return to BizKids
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    setIsLoggedIn(!!token);
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Link */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/projects/rainbow-vista/bizkids?tab=stalls"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Stalls List
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cheers to Young Entrepreneurs!
            </h1>
            <p className="text-xl opacity-90">
              Discover the next generation of business leaders at Stall {stall.stl_nu}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Stall Info */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {stall.stl_nm || `Stall ${stall.stl_nu}`}
                </h2>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(averageRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({averageRating.toFixed(1)} / 5)
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">

                <div className="flex flex-wrap gap-2 mt-1">
                  {stall.categories.map((cat, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {cat.cat_nm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Entrepreneurs */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Meet Our Young Entrepreneurs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stall.entrepreneurs.map((entrepreneur, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                          {entrepreneur.mbr_nm[0]}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {entrepreneur.mbr_nm}
                        </h4>
                        <p className="text-gray-600">{entrepreneur.schl_nm}</p>
                        <p className="text-sm text-gray-500">
                          Block: {entrepreneur.blk_nu}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h3>

            {/* Review Form */}
            <div className="-mb-0 p-5 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h4>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      className={`w-8 h-8 ${i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400 focus:outline-none`}
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your thoughts about this stall..."
                />
              </div>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                   disabled={!isLoggedIn || submitLoading} onClick={handleReviewSubmit}
                >
                  Submit Review
                </button>
                
                {!isLoggedIn && (
                  <p className="mt-2 text-sm text-red-600">
                    To submit a review, please{" "}
                    Sign In here with Google

                    <GoogleOAuthProvider clientId={client_id}>
                      <div className="flex justify-center">
                        <div
                          className="relative w-[300px] border border-gray-300 rounded shadow bg-white group overflow-hidden transform transition-transform duration-300 hover:scale-105"
                        >
                          <div
                            className="absolute top-0 left-0 w-full h-1 z-1"
                            style={{
                              background:
                                'linear-gradient(90deg, #db4437, #f4b400, #0f9d58, #4285f4)',
                              backgroundSize: '400% 400%',
                              animation: 'gradientShift 4s linear infinite',
                            }}
                          ></div>

                          <div className="flex items-center justify-center">
                            <GoogleLogin
                              onSuccess={handleGoogleSuccess}
                              onError={handleGoogleFailure}
                              width="300"
                              theme="outline"
                              text="signin_with"
                              shape="rectangular"
                            />
                          </div>
                        </div>
                      </div>
                    </GoogleOAuthProvider>
                  </p>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {review.author}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowRegister(false)}
            >
              &times;
            </button>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
}
