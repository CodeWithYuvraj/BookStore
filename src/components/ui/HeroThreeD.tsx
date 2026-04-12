import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, BookOpen, Users, Star, Award } from "lucide-react"

export function HeroThreeD() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax / tilt setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the mouse values
  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Map mouse values to rotations (-15deg to 15deg)
  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"])
  // Map mouse values to subtle translations
  const translateX = useTransform(x, [-0.5, 0.5], ["-20px", "20px"])
  const translateY = useTransform(y, [-0.5, 0.5], ["-20px", "20px"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalize mouse position between -0.5 and 0.5
    const normX = (e.clientX - rect.left) / rect.width - 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(normX)
    mouseY.set(normY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden flex items-center bg-background transition-colors duration-300"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-violet-500/10 dark:bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-20 pb-16 lg:py-0">
        
        {/* ── LEFT: TEXT CONTENT ── */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center max-w-xl xl:max-w-2xl"
        >
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-1.5 text-sm font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <Sparkles size={14} />
            Over 10,000 titles curated for you
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Your next great{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 dark:from-violet-400 dark:via-blue-400 dark:to-cyan-300">
              story
            </span>
            <br />
            is waiting for you.
          </h1>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
            Dive into hand-picked books across every genre — from timeless classics
            to this season's most-talked-about releases. BookVerse is where readers live.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to="/books"
              className="inline-flex items-center justify-center gap-2 font-bold rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 text-base shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_45px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Books <ArrowRight size={18} />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm hover:bg-muted text-foreground px-8 py-4 text-base transition-all duration-300"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border/50">
            {[
              { val: "10K+", lbl: "Books", icon: BookOpen },
              { val: "50K+", lbl: "Readers", icon: Users },
              { val: "4.9★", lbl: "Rating", icon: Star },
              { val: "200+", lbl: "Authors", icon: Award }
            ].map(({ val, lbl, icon: Icon }) => (
              <div key={lbl} className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-violet-500" />
                  <span className="text-foreground font-extrabold text-xl">{val}</span>
                </div>
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">{lbl}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: 3D IMAGE SCENE ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-[400px] sm:h-[500px] lg:h-[650px] w-full perspective-1000 flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          {/* Main floating wrapper mapped to mouse movement */}
          <motion.div 
            style={{ 
              rotateX, 
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: "preserve-3d"
            }}
            className="relative w-[85%] h-[85%] md:w-[75%] md:h-[85%] rounded-[2rem] shadow-2xl overflow-visible group"
          >
            {/* The actual realistic image */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-white/10 dark:border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000" 
                alt="Girl peacefully reading a book" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle overlay gradient to blend image nicely */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Removed the extra floating UI elements here as requested previously */}

          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
