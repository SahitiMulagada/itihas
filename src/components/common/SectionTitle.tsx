import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-12 relative">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-16 bg-[#a67c52]"></div>
        <h2 
          className={`${dancingScript.className} text-[33px] whitespace-nowrap`}
          style={{ color: '#422c16' }}
        >
          {title}
        </h2>
        
        <div className="h-px w-16 bg-[#a67c52]"></div>
      </div>
      {subtitle && (
        <p className="text-3xl font-bold mb-6 text-blue-900">{subtitle}</p>
      )}
    </div>
  );
}
