import { motion, useScroll, useTransform } from "framer-motion"
import { Zap, Tag, ArrowRight, Flame, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { BOOKS } from "../data/books"
import { BookCard } from "../components/ui/BookCard"
import { Button } from "../components/ui/Button"
import { useRef, useEffect, useState } from "react"

export const Deals = () => {
  const flashSaleBooks = BOOKS.slice(0, 4)
  const bundleDeals = BOOKS.slice(4, 6)
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Fake timer logic for visual flair
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 })
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev
        if (s > 0) s--
        else { s = 59; if (m > 0) m--; else { m = 59; h-- } }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20 overflow-hidden">
       {/* Cinematic Hero */}
       <div ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center py-24 sm:py-32 overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 bg-background" />
          <motion.div 
             animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-rose-600/20 blur-[120px] rounded-full pointer-events-none"
          />
          <motion.div 
             animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay opacity-10 pointer-events-none" />

          {/* Hero Content */}
          <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
             <motion.div 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500/20 to-orange-500/20 border border-orange-500/30 backdrop-blur-md rounded-full text-sm font-bold tracking-widest uppercase mb-6 text-orange-500"
             >
               <Flame className="h-4 w-4 animate-pulse" /> Summer Mega Sale
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
               className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/50 drop-shadow-xl"
             >
               Unmissable <br className="hidden sm:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Book Deals</span>
             </motion.h1>
             
             <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
               className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-2xl font-medium"
             >
               Immerse yourself in our finest selection. Grab premium physical and digital editions at historically low prices before the timer expires.
             </motion.p>
             
             {/* Countdown Timer */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
               className="flex gap-4 sm:gap-6 items-center bg-card/40 px-8 py-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl"
             >
                <TimerBlock label="Hours" value={timeLeft.h} />
                <span className="text-3xl font-black text-muted-foreground/50 animate-pulse">:</span>
                <TimerBlock label="Mins" value={timeLeft.m} />
                <span className="text-3xl font-black text-muted-foreground/50 animate-pulse">:</span>
                <TimerBlock label="Secs" value={timeLeft.s} />
             </motion.div>
          </motion.div>
       </div>

       <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-20 -mt-10 sm:-mt-20">
         {/* Flash Sale Grid */}
         <div className="mb-24">
           <div className="flex items-end justify-between mb-8 px-2">
             <div>
               <h2 className="text-3xl font-bold flex items-center gap-3"><Zap className="h-8 w-8 text-amber-500 animate-pulse" /> Lightning Deals</h2>
               <p className="text-muted-foreground mt-2 text-sm">Quantities are severely limited.</p>
             </div>
             <Button variant="outline" asChild className="hidden sm:flex rounded-full border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all">
               <Link to="/books">View All Deals</Link>
             </Button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
             {flashSaleBooks.map((book: any, idx: number) => (
               <motion.div 
                 key={book.id}
                 initial={{ opacity: 0, y: 50, rotateX: 10 }}
                 whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                 animate={{
                   y: [0, -8, 0],
                   rotateX: [0, -2, 0],
                   rotateY: [0, 2, 0]
                 }}
                 // @ts-ignore
                 transition={{
                   y: { duration: 4 + idx * 0.5, repeat: Infinity, ease: "easeInOut" },
                   rotateX: { duration: 5 + idx * 0.5, repeat: Infinity, ease: "easeInOut" },
                   rotateY: { duration: 6 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }
                 }}
                 style={{ perspective: 1000 }}
                 className="relative group h-full block"
               >
                 <div className="absolute -top-4 -right-4 bg-gradient-to-br from-rose-500 to-red-600 text-white text-sm font-black px-4 py-2 rounded-full z-20 shadow-xl shadow-red-500/30 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                   -50%
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/20 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 blur-xl pointer-events-none" />
                 <BookCard {...book} />
               </motion.div>
             ))}
           </div>
         </div>

         {/* Cinematic Bundle Deals */}
         <div className="mb-10">
           <div className="flex items-center gap-3 mb-10 px-2">
             <div className="p-3 bg-indigo-500/20 rounded-2xl">
               <Sparkles className="h-6 w-6 text-indigo-500" />
             </div>
             <h2 className="text-3xl font-bold">Premium Bundles</h2>
           </div>
           
           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
             {bundleDeals.map((book: any, i: number) => (
               <motion.div 
                 key={book.id}
                 initial={{ opacity: 0, scale: 0.95, x: i % 2 === 0 ? -50 : 50 }}
                 whileInView={{ opacity: 1, scale: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                 whileHover={{ y: -10 }}
                 className="relative group bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl flex flex-col sm:flex-row items-center gap-8 overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 <div className="shrink-0 w-40 sm:w-48 relative perspective-1000">
                   <motion.div 
                     whileHover={{ rotateY: 15, rotateX: 5, scale: 1.05 }}
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                     className="relative z-10 drop-shadow-2xl"
                   >
                     <img src={book.coverUrl} alt={book.title} className="w-full rounded-lg shadow-2xl border border-white/10" />
                   </motion.div>
                   <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/40 blur-xl rounded-full" />
                 </div>

                 <div className="relative z-10 text-center sm:text-left flex-1">
                   <div className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-500 bg-indigo-500/10 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
                     <Tag className="h-3 w-3" /> Exclusives
                   </div>
                   <h3 className="text-2xl font-black text-foreground mb-3 leading-tight group-hover:text-indigo-500 transition-colors duration-300">{book.title} Master Collection</h3>
                   <p className="text-sm text-muted-foreground mb-6 font-medium leading-relaxed">Secure the complete master collection in stunning hardcover. Includes exclusive digital artwork and author notes.</p>
                   
                   <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                     <div className="flex items-baseline gap-3">
                       <span className="text-3xl font-black text-foreground">${(book.price * 2.5).toFixed(2)}</span>
                       <span className="text-sm font-bold text-muted-foreground line-through decoration-red-500/50">${(book.price * 4).toFixed(2)}</span>
                     </div>
                     <Button className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold bg-foreground text-background hover:bg-indigo-600 hover:text-white transition-all shadow-xl group-hover:shadow-indigo-500/25">
                       Claim Bundle <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>

       </div>
    </div>
  )
}

const TimerBlock = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-4xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 tracking-tighter w-16 sm:w-20 text-center">
      {value.toString().padStart(2, '0')}
    </div>
    <span className="text-[10px] sm:text-xs uppercase font-black text-muted-foreground tracking-widest mt-1">{label}</span>
  </div>
)
