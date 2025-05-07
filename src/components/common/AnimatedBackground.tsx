const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply animate-float opacity-20" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply animate-float-delayed opacity-20" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply animate-float-slow opacity-20" />
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-pink-200 rounded-full mix-blend-multiply animate-float opacity-20" />
      
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-green-200 rotate-45 animate-spin-slow opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-200 rotate-12 animate-float-delayed opacity-20" 
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
    </div>
  );
};

export default AnimatedBackground;
