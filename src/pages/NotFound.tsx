import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Search, Home, ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "../components/ui/Button"

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-background px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center"
        >
          {/* Animated Icon */}
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <BookOpen className="h-32 w-32 sm:h-40 sm:w-40 text-primary drop-shadow-lg relative z-10" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -right-4 -top-4"
            >
              <Search className="h-10 w-10 text-muted-foreground opacity-50" />
            </motion.div>
            {/* X mark over the book */}
            <motion.div 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <svg viewBox="0 0 100 100" className="w-32 h-32 sm:w-40 sm:h-40">
                <motion.line 
                  x1="25" y1="25" x2="75" y2="75" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  className="text-destructive/50"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.line 
                  x1="75" y1="25" x2="25" y2="75" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  className="text-destructive/50"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </svg>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-600 drop-shadow-sm mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-md mx-auto mb-10 text-lg"
          >
            The dusty page you're looking for seems to have been lost in the archives. It might have been moved or doesn't exist anymore.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
             <Link to="/">
               <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                 <Home className="mr-2 h-5 w-5" /> Back to Home
               </Button>
             </Link>
             
             <Link to="/books">
               <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl text-base font-bold border-2 hover:bg-muted hover:scale-105 active:scale-95 transition-all">
                 <ArrowLeft className="mr-2 h-5 w-5" /> Browse Books
               </Button>
             </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative floating numeric glitches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: "100vh" }}
             animate={{ 
               opacity: [0, 0.1, 0], 
               y: "-20vh",
               x: Math.sin(i) * 50
             }}
             transition={{ 
               duration: 10 + i * 2, 
               repeat: Infinity, 
               delay: i * 1.2,
               ease: "linear"
             }}
             className="absolute text-5xl sm:text-8xl font-black text-muted-foreground/10"
             style={{ 
               left: `${10 + (i * 15) % 80}%`,
               transform: `rotate(${i * 8}deg)`
             }}
           >
             404
           </motion.div>
         ))}
      </div>
    </div>
  )
}
