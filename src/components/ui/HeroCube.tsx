import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800"
]

export const HeroCube = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % HERO_IMAGES.length)
        }, 5000) 
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full aspect-square max-w-[400px] [perspective:1200px]">
           {/* Static glowing background drop shadow */}
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/30 rounded-[3rem] rotate-6 scale-105 blur-2xl"></div>
           
           <AnimatePresence mode="popLayout">
               <motion.div
                  key={index}
                  initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                  animate={{ 
                     rotateY: 0, 
                     opacity: 1, 
                     scale: 1,
                     y: [0, -15, 0],
                     x: [0, 10, 0, -10, 0],
                  }}
                  exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                  transition={{ 
                     rotateY: { duration: 1, ease: "easeInOut" },
                     opacity: { duration: 1 },
                     scale: { duration: 1 },
                     
                     // Bouncing / Floating effect applied until unmount
                     y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                     x: { repeat: Infinity, duration: 8, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 rounded-[2rem] shadow-2xl overflow-hidden border-4 border-background"
                  style={{ transformOrigin: "center center -200px" }}
               >
                   <img src={HERO_IMAGES[index]} alt="Hero sequence" className="w-full h-full object-cover" />
               </motion.div>
           </AnimatePresence>
        </div>
    )
}
