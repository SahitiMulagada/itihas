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
      className={`flex items-center justify-center gap-6 mb-12 ${className}`}
    >
      <Image
        src="/backgrounds/icon_09.png"
        alt="Decorative icon"
        width={40}
        height={40}
        className="w-10 h-10 object-contain"
      />
      <div className="relative">
        {/* Paint-like background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg transform rotate-1 opacity-80" />
        <div className="absolute -inset-2 bg-gradient-to-l from-blue-50 to-indigo-50 rounded-lg transform -rotate-1 opacity-60" />
        <h2 className="relative text-3xl font-bold text-blue-800 px-6 py-2">
          {title}
        </h2>
      </div>
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
