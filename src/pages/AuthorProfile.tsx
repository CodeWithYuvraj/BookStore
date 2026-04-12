import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, Twitter, Globe, BookCopy } from "lucide-react"
import { BOOKS } from "../data/books"
import { BookCard } from "../components/ui/BookCard"
import { Button } from "../components/ui/Button"

// Mock author data mapped to our existing mock books in an actual app this would come from a backend or DB relation.
const AUTHOR_DATA: Record<string, any> = {
  "sarah-chen": {
    name: "Sarah Chen",
    verified: true,
    bio: "Sarah Chen is an award-winning science fiction author known for weaving complex technological concepts into deeply human stories. Based in Seattle, her work explores the intersection of AI, consciousness, and what it means to be human in the digital age.",
    followers: 12450,
    booksPublished: 7,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Seattle, WA"
  },
  "default": {
    name: "Author Name",
    verified: false,
    bio: "This author's bio is currently being updated. Check back soon for more information about their background and upcoming releases.",
    followers: 120,
    booksPublished: 2,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Unknown"
  }
}

export const AuthorProfile = () => {
  const { id } = useParams()
  // Try to find the author data by id, or fall back to a mock generated from ID format
  const authorDataTemplate = AUTHOR_DATA[id as string] || AUTHOR_DATA["default"]
  const author = id ? {
    ...authorDataTemplate,
    name: authorDataTemplate.name === "Author Name" ? id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : authorDataTemplate.name
  } : authorDataTemplate

  // Mock finding books by this author
  const authorBooks = BOOKS.slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      {/* Author Header Banner */}
      <div className="h-64 sm:h-80 w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead27d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-20 relative">
        {/* Profile Card Overlay */}
        <div className="relative -mt-32 sm:-mt-40 mb-12 flex flex-col md:flex-row gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="shrink-0 relative group"
          >
            <div className="h-48 w-48 sm:h-56 sm:w-56 rounded-full border-4 border-background bg-card overflow-hidden shadow-2xl relative z-10">
              <img src={author.image} alt={author.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            {author.verified && (
              <div className="absolute bottom-4 right-4 bg-background rounded-full p-1 shadow-lg z-20">
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 pt-4 md:pt-36 bg-card/40 backdrop-blur-sm p-6 rounded-3xl border border-border/50 shadow-sm md:bg-transparent md:border-none md:p-0 md:backdrop-blur-none md:shadow-none"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">{author.name}</h1>
                <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                  <Globe className="h-4 w-4" /> {author.location}
                </p>
              </div>
              <div className="flex gap-3 mt-2 sm:mt-0">
                <Button className="rounded-full shadow-md"><BookCopy className="mr-2 h-4 w-4" /> Follow Author</Button>
                <Button variant="outline" size="icon" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="flex gap-6 mb-6">
              <div><span className="font-bold text-foreground text-xl">{author.followers.toLocaleString()}</span> <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold ml-1">Followers</span></div>
              <div><span className="font-bold text-foreground text-xl">{author.booksPublished}</span> <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold ml-1">Books</span></div>
            </div>

            <div className="prose dark:prose-invert max-w-3xl">
              <p className="text-muted-foreground leading-relaxed text-lg">{author.bio}</p>
            </div>
          </motion.div>
        </div>

        {/* Books Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Books by {author.name.split(' ')[0]}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {authorBooks.map((book: any, idx: number) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (idx * 0.05) }}
              >
                <BookCard {...book} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
