'use client';

import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import RecentWorks from '../components/home/RecentWorks';
import LatestProjects from '../components/home/LatestProjects';
import LatestBlogs from '../components/home/LatestBlogs';
import ContactSection from '../components/home/ContactSection';
import ScrollToTop from '../components/common/ScrollToTop';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all sections with the scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <div className="bg-gradient-to-b from-white " style={{ backgroundColor: '#f5f5f5' }}>
        <RecentWorks />
      </div>
      <div className="scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out bg-white">
        <LatestProjects />
      </div>
      <div className="scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out bg-gray-50">
        <LatestBlogs />
      </div>
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800">
        <ContactSection />
      </div>
      <ScrollToTop />
    </>
  );
}
