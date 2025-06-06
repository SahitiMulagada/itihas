import { motion } from 'framer-motion';
import Image from 'next/image';

interface SectionHeadingProps {
  title: string;
  className?: string;
}

const SectionHeading = ({ title, className = '' }: SectionHeadingProps) => {
  return (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 text-center sm:text-left ${className}`}
>
  {/* Left Icon */}
  <Image
    src="/backgrounds/icon_09.png"
    alt="Decorative icon"
    width={40}
    height={40}
    className="w-10 h-10 object-contain"
  />

  {/* Title with layered background */}
  <div className="relative inline-block">
    <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg transform rotate-1 opacity-80" />
    <div className="absolute -inset-2 bg-gradient-to-l from-blue-50 to-indigo-50 rounded-lg transform -rotate-1 opacity-60" />
    <h2 className="relative text-xl sm:text-3xl font-bold text-blue-800 px-4 py-2 sm:px-6 sm:py-2 leading-snug">
      {title}
    </h2>
  </div>

  {/* Right Icon */}
  <Image
    src="/backgrounds/icon_09.png"
    alt="Decorative icon"
    width={40}
    height={40}
    className="w-10 h-10 object-contain transform scale-x-[-1]"
  />
</motion.div>

  );
};

export default SectionHeading;
