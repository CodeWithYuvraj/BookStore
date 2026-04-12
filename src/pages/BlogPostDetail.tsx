import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, Share2, Bookmark, MessageSquare } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Button } from "../components/ui/Button"

export const BlogPostDetail = () => {
  const { id } = useParams()

  // In a real app, fetch post by ID
  const post = {
    title: "The Evolution of Modern Book Design",
    author: "Elena Vance",
    role: "Creative Director",
    date: "April 10, 2026",
    category: "Design",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>The relationship between a reader and a book has always been deeply physical. Long before we click "buy" on a digital storefront, the weight of the paper, the texture of the cover, and the specific serif of a font play a silent role in our interpretation of a story.</p>
      
      <h3>The Return to Tactility</h3>
      <p>In an increasingly digital age, we've seen a surprising resurgence in premium print editions. Collectors aren't just looking for a story; they're looking for an object that commands presence on a shelf. This shift has forced designers to rethink everything from spine durability to the foil stamping on the jacket.</p>
      
      <p>Modern book design is no longer just about the front cover. It's about the "unboxing" experience—the endpapers, the ribbon markers, and the hidden details under the dust jacket that only the most dedicated readers will find.</p>
      
      <h3>Typography as a Character</h3>
      <p>Choosing a typeface is like casting an actor. The wrong choice can break the immersion, while the right one can breathe life into every paragraph. We're seeing a move away from safe, standard fonts toward more experimental, custom typography that reflects the specific mood and era of the narrative.</p>
    `
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="mx-auto max-w-screen-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <div className="flex gap-2 mb-4">
                 <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-t border-border/50 pt-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">EV</div>
                   <div>
                     <p className="text-foreground font-bold leading-none">{post.author}</p>
                     <p className="text-xs">{post.role}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" /> {post.date}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4" /> 24 Comments
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-screen-md px-4 sm:px-8 mt-12">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="prose prose-lg dark:prose-invert prose-primary max-w-none"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.div>

        {/* Post Actions */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 py-8 border-y border-border">
           <div className="flex gap-4">
             <Button variant="outline" className="rounded-xl gap-2"><Share2 className="h-4 w-4" /> Share</Button>
             <Button variant="outline" className="rounded-xl gap-2"><Bookmark className="h-4 w-4" /> Save</Button>
           </div>
           <div className="flex items-center gap-3">
             <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Tags:</span>
             <div className="flex gap-2">
               {["Design", "Literature", "Art"].map(tag => (
                 <span key={tag} className="text-sm px-3 py-1 bg-muted rounded-full hover:bg-muted/80 cursor-pointer transition-colors text-foreground">{tag}</span>
               ))}
             </div>
           </div>
        </div>

        {/* Author Bio Section */}
        <div className="mt-16 bg-card border border-border p-8 rounded-3xl flex flex-col sm:flex-row gap-8 items-center text-center sm:text-left">
           <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 shrink-0 shadow-lg" />
           <div>
             <h3 className="text-xl font-bold text-foreground mb-2">About {post.author}</h3>
             <p className="text-muted-foreground text-sm leading-relaxed mb-4">
               Elena is a design veteran with over 15 years in the publishing industry. She focuses on the intersection of physical materials and digital reading experiences.
             </p>
             <div className="flex justify-center sm:justify-start gap-4">
                <Button variant="link" className="p-0 h-auto text-primary font-bold">Follow @evance</Button>
                <Button variant="link" className="p-0 h-auto text-primary font-bold">View Portfolio</Button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
