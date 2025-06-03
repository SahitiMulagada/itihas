import Link from 'next/link';

const ContactSection = () => {
  return (
    <section className="py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
