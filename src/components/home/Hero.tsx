import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
      {/* Background text - Itihas */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden">
        <div className="transform -translate-x-1/4">
          <div className="text-[20rem] font-black opacity-5 leading-none">
            ITIHAS
          </div>
          <div className="text-[20rem] font-black opacity-5 leading-none transform scale-y-[-1] blur-sm">
            ITIHAS
          </div>
        </div>
      </div>

      {/* Background text - Sahiti */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
        <div className="transform -translate-x-1/3 rotate-90 origin-right">
          <div className="text-[12rem] font-black opacity-5 leading-none tracking-wider">
            SAHITI
          </div>
          <div className="text-[12rem] font-black opacity-5 leading-none tracking-wider transform scale-x-[-1] blur-sm">
            SAHITI
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Welcome to Itihas
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Exploring innovation through technology and creativity. Building solutions that make a difference.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/projects"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};



export default Hero;
