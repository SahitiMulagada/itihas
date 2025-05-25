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
      <h2 className="text-3xl font-bold text-blue-800">
        {title}
      </h2>
      <Image
        src="/backgrounds/icon_09.png"
        alt="Decorative icon"
        width={40}
        height={40}
        className="w-10 h-10 object-contain"
      />
    </motion.div>
  );
};

export default SectionHeading;
