import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsUrl = "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/697945ca6b876878dba3b23fbd2f1561/manifest/video.m3u8";
  const mp4FallbackUrl = "/_videos/v1/f0c78f536d5f21a047fb7792723a36f9d647daa1";

  useEffect(() => {
    let hls: Hls | null = null;
    if (videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        hls = new Hls({
          startLevel: -1,
          capLevelToPlayerSize: true,    
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            // Setup auto-play policy catch block if needed
          });
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari)
        video.src = hlsUrl;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(() => {});
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <section className="relative w-full pt-20 md:pt-32 overflow-hidden flex flex-col items-center justify-center bg-[#010101]">
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center max-w-4xl pt-8">
        
        {/* Announcement Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(28,27,36,0.15)] px-3 py-1.5 backdrop-blur-md mb-8"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6] shadow-[0_0_15px_rgba(201,103,232,0.5)]">
            <Zap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-300">Used by founders. Loved by devs.</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-[48px] md:text-[80px] font-bold leading-[1.1] tracking-tight">
            <span className="text-white block">Your Vision</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6] block">
              Our Digital Reality.
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-2xl text-[17px] md:text-xl text-white/80"
        >
          We turn bold ideas into modern designs that don't just look amazing, they grow your business fast.
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 mb-10 p-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm shadow-xl"
        >
          <button className="flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 text-black transition-all hover:scale-[1.02] active:scale-[0.98]">
            <span className="font-semibold whitespace-nowrap text-base md:text-lg">Book a 15-min call</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FA93FA] via-[#C967E8] to-[#983AD6]">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Video section with overlay */}
      <div className="relative w-full z-10 -mt-[80px] md:-mt-[150px] mix-blend-screen pointer-events-none">
        {/* Top/Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101] z-20 pointer-events-none" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-cover"
        >
          <source src={mp4FallbackUrl} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
