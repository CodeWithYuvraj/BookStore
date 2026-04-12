import { motion } from "framer-motion"
import { BookOpen, Users, Globe, Zap } from "lucide-react"

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Readers.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            We're building the most expansive, intuitive, and beautiful online platform for book lovers, authors, and sellers alike.
          </motion.p>
        </div>

        {/* Stats / Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: BookOpen, title: "1M+", subtitle: "Books Available" },
            { icon: Users, title: "500k+", subtitle: "Active Readers" },
            { icon: Globe, title: "120", subtitle: "Countries Reached" },
            { icon: Zap, title: "< 24h", subtitle: "Average Delivery" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 text-center hover:bg-card hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                <stat.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">{stat.title}</h3>
              <p className="text-muted-foreground font-medium">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Our Story</h2>
            <div className="w-20 h-2 bg-primary rounded-full" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              BookVerse started in a small garage in 2020 with a simple mission: to make reading accessible and enjoyable for everyone. Frustrated by clunky interfaces and limited selections, we decided to build a platform that felt like a modern, digital bookstore—complete with the charm and discovery of browsing physical shelves.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we partner with thousands of independent publishers and sellers globally to bring you the best titles. Our community is at the heart of everything we do.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl" />
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Library interior" 
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3] border border-border/50"
            />
          </motion.div>
        </div>
        
      </div>
    </div>
  )
}
