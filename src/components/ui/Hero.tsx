import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Zap, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundPaths } from "./background-paths";

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#010101] overflow-hidden">
      {/* Background Animation Component */}
      <div className="absolute inset-0 z-0">
        <BackgroundPaths title="" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center max-w-5xl"
      >
        {/* Announcement Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md mb-8"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
            <Zap className="h-3.5 w-3.5 text-white fill-current" />
          </div>
          <span className="text-sm font-medium text-gray-300">Discover your next favorite story.</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight text-white mb-8"
        >
          Your Vision. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500 drop-shadow-sm">
            Our Literary Reality.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-[clamp(1rem,3vw,1.25rem)] text-white/70 mb-12 leading-relaxed"
        >
          Step into a world of endless imagination. From timeless classics to modern bestsellers, 
          we bring the best of literature right to your doorstep.
        </motion.p>

        {/* Action Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button className="group relative flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-black transition-all hover:scale-[1.05] active:scale-[0.98] shadow-2xl">
            <span className="font-bold text-lg">Explore Library</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-white backdrop-blur-md transition-all hover:bg-white/10">
            <span className="font-semibold">Bestsellers</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Fade out mask at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#010101] to-transparent z-10" />
    </section>
  );
}
