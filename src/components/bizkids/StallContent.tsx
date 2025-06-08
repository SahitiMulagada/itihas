'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { type Stall, stallsService , type Review } from './stallsService';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import service from '@/app/store/baseapiservice';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'



interface StallContentProps {
  stallId: number;
  initialStall?: Stall;
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
  // State declarations first
  const [stall, setStall] = useState<Stall | null>(null);
  const [stallLoading, setStallLoading] = useState(true);
  const [stallError, setStallError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [newReview, setNewReview] = useState({
    rvw_ct: 5,
    rvw_tx: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [userName, setUserName] = useState('');
  const [userImageUrl, setUserImageUrl] = useState('');

  // Router hook
  const router = useRouter();

  // All useEffects together
  useEffect(() => {
    const fetchData = async () => {
      setStallLoading(true);
      setStallError(null);
      try {
        // Get stall data first
        const stallData = await stallsService.getStallById(stallId);
        console.log('Stall data:', stallData);
        if (!stallData || !Array.isArray(stallData) || stallData.length === 0) {
          throw new Error('Stall not found');
        }
        const stall = stallData[0]; // Get the first stall from the array
        setStall(stall);

        // Then get reviews
        setReviewsLoading(true);
        const reviewsData = await stallsService.getStallReviews(stall.stl_id || stallId);
        setReviews(reviewsData);

        // Check if user has already reviewed
        if (isBrowser) {
          const userId = getUserIdFromToken();
          if (userId) {
            setHasUserReviewed(reviewsData.some(review => review.usr_id === userId));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setStallError('Failed to load stall details');
      } finally {
        setStallLoading(false);
        setReviewsLoading(false);
      }
    };

    // Check login status and fetch data
    if (isBrowser) {
      const token = localStorage.getItem('googleToken');
      setIsLoggedIn(!!token);
    }
    fetchData();
  }, [stallId]);

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
      const userData = JSON.parse(userDataString);
      setUserName(userData.username || userData.name || '');
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
   const handleReviewSubmit = async () => {
    if (!isLoggedIn) {
      toast.error('Please sign in to submit a review');
      return;
    }

    if (hasUserReviewed) {
      toast.error('You can only submit one review per stall');
      return;
    }

    setSubmitLoading(true);
    try {

      const reviewData = {
        stl_id: stallId.toString(),
        evnt_id: '1', // You might want to make this dynamic
        usr_id: userId,
        usr_nm: userName || '',
        usr_imge_url_tx: userImageUrl || '',
        rvw_ct: newReview.rvw_ct,
        rvw_tx: newReview.rvw_tx
      };

      const submittedReview = await stallsService.submitReview(stallId.toString(), reviewData);
      setReviews([...reviews, submittedReview]);
      setNewReview({ rvw_ct: 5, rvw_tx: "" });
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitLoading(false);
    }
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

  // Calculate ratings
  const totalStars = reviews.reduce((acc, review) => acc + review.rvw_ct + (review.rvw_tx ? 1 : 0), 0);
  const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rvw_ct, 0) / reviews.length : 0;

  if (stallLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (stallError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-600 text-lg">{stallError}</div>
        <Link href="/projects/rainbow-vista/bizkids" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Stalls
        </Link>
      </div>
    );
  }

  if (!stall) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-gray-600 text-lg">Stall not found</div>
        <Link href="/projects/rainbow-vista/bizkids" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Stalls
        </Link>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Link */}
      <div className="bg-white shadow-sm">
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
      <div className="relative py-16 bg-cover bg-center text-white"
     style={{
       backgroundImage: `url('/images/stallcntnt.avif')`,
     }}>
  {/* Animated overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-indigo-700/70 to-purple-700/60 animate-background-blur z-0"></div>

  <div className="relative z-10 container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Cheers to Young Entrepreneurs!
      </h1>
      <p className="text-lg sm:text-xl opacity-90">
        Discover the next generation of business leaders at Stall {stall?.stl_nu || 'N/A'}
      </p>
    </div>
  </div>
</div>


      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Total Stars Section */}
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-yellow-800 mb-2">Total Stars Earned</h2>
                <p className="text-amber-700 text-sm">Each review gets a bonus star for written feedback!</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-yellow-600">{totalStars}</span>
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
          {/* Stall Info */}
         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8 mb-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    <div className="flex-1">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        {stall?.stl_nm || `Stall ${stall?.stl_nu || 'N/A'}`}
      </h2>

      <div className="flex items-center mt-2 flex-wrap">
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
          <span className="ml-2 text-gray-600 text-sm">
            ({isNaN(averageRating) ? '0.0' : averageRating.toFixed(1)} / 5)
          </span>
        </div>
      </div>
    </div>

    <div className="text-left md:text-right flex flex-wrap gap-2">
      {stall?.categories?.map((cat, index) => (
        <span
          key={cat.cat_id || index}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
        >
          {cat.cat_nm}
        </span>
      ))}
    </div>
  </div>

  {/* Entrepreneurs */}
  <div className="mt-6 md:mt-8">
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
      Meet Our Young Entrepreneurs
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {stall?.entrepreneurs?.map((entrepreneur, index) => (
        <div
          key={entrepreneur.mbr_id || index}
          className="bg-gray-50 rounded-lg p-6 border border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                {entrepreneur?.mbr_nm?.[0] || '?'}
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                {entrepreneur?.mbr_nm || 'Unknown'}
              </h4>
              <p className="text-sm text-gray-600">{entrepreneur?.schl_nm || 'N/A'}</p>
              <p className="text-xs text-gray-500">Block: {entrepreneur?.blk_nu || 'N/A'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


          {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Reviews</h3>

  {/* Review Form */}
  <div className="mb-6 p-4 sm:p-5 bg-gray-50 rounded-lg">
    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Write a Review</h4>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setNewReview({ ...newReview, rvw_ct: i + 1 })}
            className={`w-7 h-7 sm:w-8 sm:h-8 ${i < newReview.rvw_ct ? 'text-yellow-400' : 'text-gray-300'
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
      <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
      <textarea
        value={newReview.rvw_tx}
        onChange={(e) => setNewReview({ ...newReview, rvw_tx: e.target.value })}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        placeholder="Share your thoughts about this stall..."
      />
    </div>

    <div>
      {hasUserReviewed ? (
        <div className="text-red-600 text-sm mb-2">
          You have already submitted a review for this stall.
        </div>
      ) : (
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 text-sm"
          disabled={!isLoggedIn || submitLoading}
          onClick={handleReviewSubmit}
        >
          Submit Review
        </button>
      )}

      {!isLoggedIn && (
        <div className="mt-4 text-sm text-red-600">
          <span className="animate-pulse">To submit a review, please Sign In with Google</span>
          <GoogleOAuthProvider clientId={client_id}>
            <div className="mt-3 flex justify-center">
              <div className="relative w-full sm:w-[300px] border border-gray-300 rounded shadow bg-white overflow-hidden hover:shadow-md transition">
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{
                    background: 'linear-gradient(90deg, #db4437, #f4b400, #0f9d58, #4285f4)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 4s linear infinite',
                  }}
                />
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
        </div>
      )}
    </div>
  </div>

  {/* Reviews List */}
  <div className="mt-8 space-y-6">
    {reviewsLoading ? (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading reviews...</p>
      </div>
    ) : reviews.length === 0 ? (
      <div className="text-center py-4 text-gray-600">
        No reviews yet. Be the first to review!
      </div>
    ) : reviews.map((review) => (
      <div key={review.rvw_id} className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {review.usr_imge_url_tx && (
              <img 
                src={review.usr_imge_url_tx} 
                alt={review.usr_nm} 
                className="w-8 h-8 rounded-full"
              />
            )}
            <div>
              <span className="font-medium text-gray-900">{review.usr_nm}</span>
              <div className="text-gray-500 text-sm">
                {new Date(review.rvw_ts).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center">
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
        </div>
        <p className="text-gray-700 text-sm">{review.rvw_tx}</p>
        {review.rvw_tx && (
          <div className="mt-2 text-xs text-yellow-600">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Bonus star earned for providing written feedback!
            </span>
          </div>
        )}
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
