import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Search, X, BookOpen, Palette, Code2, FlaskConical, Globe, Music, Film, Heart, Star, Cpu, Leaf, Coins, Brain, Brush, Mountain, Telescope, ScrollText, Swords, Baby } from "lucide-react"
import { getBookCountByCategory } from "../data/books"

const CATEGORIES = [
  { name: "Fiction", icon: BookOpen, count: getBookCountByCategory("Fiction"), gradient: "from-violet-500/20 to-purple-500/10", iconColor: "text-violet-500", border: "border-violet-500/20" },
  { name: "Design & Art", icon: Palette, count: getBookCountByCategory("Design & Art"), gradient: "from-pink-500/20 to-rose-500/10", iconColor: "text-pink-500", border: "border-pink-500/20" },
  { name: "Programming", icon: Code2, count: getBookCountByCategory("Programming"), gradient: "from-blue-500/20 to-cyan-500/10", iconColor: "text-blue-500", border: "border-blue-500/20" },
  { name: "Science", icon: FlaskConical, count: getBookCountByCategory("Science"), gradient: "from-teal-500/20 to-emerald-500/10", iconColor: "text-teal-500", border: "border-teal-500/20" },
  { name: "History", icon: ScrollText, count: getBookCountByCategory("History"), gradient: "from-amber-500/20 to-yellow-500/10", iconColor: "text-amber-500", border: "border-amber-500/20" },
  { name: "Travel", icon: Globe, count: getBookCountByCategory("Travel"), gradient: "from-sky-500/20 to-blue-500/10", iconColor: "text-sky-500", border: "border-sky-500/20" },
  { name: "Music", icon: Music, count: getBookCountByCategory("Music"), gradient: "from-indigo-500/20 to-violet-500/10", iconColor: "text-indigo-500", border: "border-indigo-500/20" },
  { name: "Film & Media", icon: Film, count: getBookCountByCategory("Film & Media"), gradient: "from-red-500/20 to-orange-500/10", iconColor: "text-red-500", border: "border-red-500/20" },
  { name: "Romance", icon: Heart, count: getBookCountByCategory("Romance"), gradient: "from-rose-500/20 to-pink-500/10", iconColor: "text-rose-500", border: "border-rose-500/20" },
  { name: "Fantasy", icon: Star, count: getBookCountByCategory("Fantasy"), gradient: "from-fuchsia-500/20 to-purple-500/10", iconColor: "text-fuchsia-500", border: "border-fuchsia-500/20" },
  { name: "Technology", icon: Cpu, count: getBookCountByCategory("Technology"), gradient: "from-cyan-500/20 to-teal-500/10", iconColor: "text-cyan-500", border: "border-cyan-500/20" },
  { name: "Nature", icon: Leaf, count: getBookCountByCategory("Nature"), gradient: "from-green-500/20 to-lime-500/10", iconColor: "text-green-500", border: "border-green-500/20" },
  { name: "Finance", icon: Coins, count: getBookCountByCategory("Finance"), gradient: "from-yellow-500/20 to-amber-500/10", iconColor: "text-yellow-600", border: "border-yellow-500/20" },
  { name: "Psychology", icon: Brain, count: getBookCountByCategory("Psychology"), gradient: "from-purple-500/20 to-indigo-500/10", iconColor: "text-purple-500", border: "border-purple-500/20" },
  { name: "Art History", icon: Brush, count: getBookCountByCategory("Art History"), gradient: "from-orange-500/20 to-red-500/10", iconColor: "text-orange-500", border: "border-orange-500/20" },
  { name: "Adventure", icon: Mountain, count: getBookCountByCategory("Adventure"), gradient: "from-lime-500/20 to-green-500/10", iconColor: "text-lime-600", border: "border-lime-500/20" },
  { name: "Astronomy", icon: Telescope, count: getBookCountByCategory("Astronomy"), gradient: "from-blue-500/20 to-indigo-500/10", iconColor: "text-blue-600", border: "border-blue-600/20" },
  { name: "Action & War", icon: Swords, count: getBookCountByCategory("Action & War"), gradient: "from-red-500/20 to-rose-500/10", iconColor: "text-red-600", border: "border-red-600/20" },
  { name: "Children's", icon: Baby, count: getBookCountByCategory("Children's"), gradient: "from-sky-400/20 to-blue-400/10", iconColor: "text-sky-500", border: "border-sky-400/20" },
  { name: "Non-Fiction", icon: BookOpen, count: getBookCountByCategory("Non-Fiction"), gradient: "from-stone-500/20 to-neutral-500/10", iconColor: "text-stone-500", border: "border-stone-500/20" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
}

export const Categories = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const filtered = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20"
        >
          <BookOpen className="h-4 w-4" />
          {CATEGORIES.length} Categories Available
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
          Explore by Category
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Find your next great read. Browse through every genre we carry and discover something extraordinary.
        </p>
      </motion.div>

      {/* ── Search ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-lg mx-auto mb-12"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search a category..."
            className="w-full rounded-2xl border border-input bg-card py-4 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />

        </div>
        <AnimatePresence>
          {query && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-muted-foreground text-center mt-3"
            >
              {filtered.length > 0
                ? `${filtered.length} categor${filtered.length === 1 ? "y" : "ies"} found`
                : "No categories match your search"}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(cat => (
            <motion.button
              key={cat.name}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/books?category=${encodeURIComponent(cat.name)}`)}
              className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 bg-gradient-to-br ${cat.gradient} ${cat.border} text-center cursor-pointer hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 transition-shadow`}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-background/70 backdrop-blur-sm border border-border/50 shadow-sm ${cat.iconColor}`}
              >
                <cat.icon className="h-6 w-6" />
              </motion.div>
              <div>
                <p className="font-bold text-foreground text-sm leading-tight">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cat.count} books</p>
              </div>
              {/* Hover arrow */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 right-3 text-muted-foreground/50 group-hover:text-muted-foreground text-xs"
              >
                →
              </motion.div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── No results ── */}
      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-1">No categories found</h3>
            <p className="text-muted-foreground">Try a different search term</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
