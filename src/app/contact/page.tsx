import Layout from '../../components/layout/Layout';
import SectionTitle from '../../components/common/SectionTitle';

export default function Contact() {
  return (
    <Layout>
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
        <div className="bg-blue-100 py-20 relative">
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
              <form className="space-y-6">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
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
            </div>


          </div>
      </div>     
      </div>

     
    </Layout>
  );
}
