import { usePublicData } from '../hooks/useData';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Training from '../components/Training';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Languages from '../components/Languages';
import References from '../components/References';
import Contact from '../components/Contact';

export default function Home() {
  const { data, loading, error } = usePublicData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center container-main text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Failed to load content</h1>
          <p className="text-gray-600 dark:text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero data={data?.profile} />
      <About data={data?.profile} />
      <Experience data={data?.experience} />
      <Training data={data?.training} />
      <Skills data={data?.skills} />
      <Education data={data?.education} />
      <Languages data={data?.languages} />
      <References data={data?.references} />
      <Contact />
    </>
  );
}