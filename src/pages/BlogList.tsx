import { motion } from "framer-motion"
import { BookOpen, Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"

const BLOG_POSTS = [
  {
    id: "1",
    title: "The Evolution of Modern Book Design",
    excerpt: "Exploring how digital tools and tactile materials are redefining what it means to hold a story in your hands.",
    author: "Elena Vance",
    date: "April 10, 2026",
    category: "Design",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "10 Books to Read Before You Start Your First Startup",
    excerpt: "From psychology to system design, these titles will prepare you for the chaotic world of entrepreneurship.",
    author: "Marcus Aurelius",
    date: "April 08, 2026",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Why High-Fantasy is Making a Massive Comeback in 2026",
    excerpt: "The surge of world-building and folklore in modern literature and why readers are seeking escape now more than ever.",
    author: "Sarah J. Maas",
    date: "April 05, 2026",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
  },
]

export const BlogList = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">BookVerse Editorial</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover stories behind the stories. We explore literature, design, and the culture of reading.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-background/90 backdrop-blur-md text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-border/50">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</div>
                  <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {post.author}</div>
                </div>
                
                <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground mb-8 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <Button asChild variant="ghost" className="p-0 h-auto font-bold group/btn">
                    <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
                      Read Full Story <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-primary/5 rounded-[40px] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
             <h3 className="text-2xl font-bold text-foreground mb-2">Subscribe to our Newsletter</h3>
             <p className="text-muted-foreground">Get the latest stories and book reviews delivered to your inbox.</p>
           </div>
           <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="yours@email.com" 
                className="flex-1 md:w-64 rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button size="lg" className="rounded-2xl">Subscribe</Button>
           </div>
        </div>

      </div>
    </div>
  )
}
