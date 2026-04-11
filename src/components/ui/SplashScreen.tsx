import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

/* ─── Particle dot ─────────────────────────────────────────── */
const Dot = ({ i }: { i: number }) => {
  const angle = (i / 8) * Math.PI * 2
  const radius = 44
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return (
    <motion.span
      className="absolute w-2 h-2 rounded-full bg-primary"
      style={{ left: "50%", top: "50%", marginLeft: -4, marginTop: -4 }}
      animate={{
        x: [0, x, 0],
        y: [0, y, 0],
        opacity: [0.2, 1, 0.2],
        scale: [0.6, 1.3, 0.6],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        delay: i * 0.18,
        ease: "easeInOut",
      }}
    />
  )
}

/* ─── Splash Screen ─────────────────────────────────────────── */
export const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState<"spin" | "reveal" | "exit">("spin")

  useEffect(() => {
    // spin → reveal logo
    const t1 = setTimeout(() => setPhase("reveal"), 1200)
    // reveal → start exit
    const t2 = setTimeout(() => setPhase("exit"), 2400)
    // exit done → call parent
    const t3 = setTimeout(() => onDone(), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0, scale: 1.03 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background radial glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting dots */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {Array.from({ length: 8 }).map((_, i) => <Dot key={i} i={i} />)}

        {/* Book icon animating to logo */}
        <AnimatePresence mode="wait">
          {phase === "spin" && (
            <motion.div
              key="book-spin"
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10"
            >
              {/* SVG Book */}
              <motion.svg
                viewBox="0 0 48 48"
                width="64"
                height="64"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: 0 }}
              >
                <defs>
                  <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect x="6" y="4" width="24" height="40" rx="3" fill="url(#bookGrad)" />
                <rect x="6" y="4" width="6" height="40" rx="2" fill="#6d28d9" opacity="0.7" />
                <rect x="15" y="13" width="12" height="2" rx="1" fill="white" opacity="0.6" />
                <rect x="15" y="18" width="12" height="2" rx="1" fill="white" opacity="0.6" />
                <rect x="15" y="23" width="8" height="2" rx="1" fill="white" opacity="0.6" />
                <rect x="32" y="8" width="10" height="32" rx="2" fill="url(#bookGrad)" opacity="0.4" />
              </motion.svg>
            </motion.div>
          )}

          {phase !== "spin" && (
            <motion.div
              key="logo-text"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative z-10 flex items-center justify-center text-3xl font-extrabold whitespace-nowrap"
            >
              <span className="text-primary">B</span>
              <span className="text-foreground">V</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brand name reveal */}
      <AnimatePresence>
        {phase !== "spin" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <motion.p
              className="text-3xl font-extrabold tracking-tight"
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "-0.01em", opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-primary">Book</span>
              <span className="text-blue-500">Verse</span>
            </motion.p>
            <motion.p
              className="text-sm text-muted-foreground mt-1 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your Story Awaits
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: phase === "exit" ? "100%" : phase === "reveal" ? "70%" : "35%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.div>
  )
}
