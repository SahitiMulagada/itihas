'use client';

import SectionTitle from '../../components/common/SectionTitle';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import service from '@/app/store/baseapiservice';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


export default function Contact() {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


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
        lgn_clnt_id: {client_id},
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
            toast.success('Google login successful')
            router.push('/projects')
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


  return (
    <div className="bg-blue-50 min-h-screen relative overflow-hidden">
      {/* Animated Circles - Now spans entire page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-40 h-40 rounded-full bg-blue-200/30 -top-10 -left-10 animate-float-slow"></div>
        <div className="absolute w-32 h-32 rounded-full bg-blue-300/30 top-1/4 -right-5 animate-float-medium"></div>
        <div className="absolute w-24 h-24 rounded-full bg-blue-200/30 bottom-1/3 left-1/4 animate-float-fast"></div>
        <div className="absolute w-20 h-20 rounded-full bg-blue-300/30 top-1/3 right-1/4 animate-float-medium"></div>
        <div className="absolute w-36 h-36 rounded-full bg-blue-200/30 bottom-1/4 right-1/3 animate-float-slow"></div>
        <div className="absolute w-16 h-16 rounded-full bg-blue-300/30 top-2/3 left-1/3 animate-float-fast"></div>
        <div className="absolute w-28 h-28 rounded-full bg-blue-200/30 bottom-10 right-1/4 animate-float-medium"></div>
      </div>

      {/* Header Section */}
      <div className="bg-blue-100 py-10 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle title="Get in Touch" subtitle="Have a question or want to collaborate? We'd love to hear from you" />
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="container mx-auto px-4 pt-16 relative z-10">
        {/* Contact Form */}
        <div className="max-w-3xl mx-auto ">

          <div className="bg-white rounded-lg shadow-lg p-8">




           <div className="text-center space-y-6 ">
  <p className="text-gray-600 text-md font-semibold mb-2">Sign in using your Google account</p>

  {/* Google OAuth */}
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

  <div className="flex items-center gap-4 text-gray-400 pt-4 mb-4">
    <hr className="flex-grow border-dotted border-t border-gray-300" />
    <span className="text-sm font-medium">OR</span>
    <hr className="flex-grow border-dotted border-t border-gray-300" />
  </div>
</div>


            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>

            <style jsx>{`
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`}</style>


          </div>


        </div>
      </div>
    </div>


  );
}
