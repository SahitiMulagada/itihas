import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import RecentWorks from '../components/home/RecentWorks';
import LatestProjects from '../components/home/LatestProjects';
import LatestBlogs from '../components/home/LatestBlogs';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <RecentWorks />
      <LatestProjects />
      <LatestBlogs />
      <ContactSection />
    </Layout>
  );
}
