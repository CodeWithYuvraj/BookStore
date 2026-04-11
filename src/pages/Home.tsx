import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Star, BookOpen, Users, Award, TrendingUp, Sparkles, ChevronRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { BookCard } from "../components/ui/BookCard"

const FEATURED_BOOKS = [
  { id: "1", title: "The Design of Everyday Things", author: "Don Norman", price: 24.99, rating: 4.8, category: "Design", coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" },
  { id: "2", title: "Clean Code", author: "Robert C. Martin", price: 34.50, rating: 4.9, category: "Programming", coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400" },
  { id: "3", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 19.99, rating: 4.7, category: "Psychology", coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" },
  { id: "4", title: "Sapiens", author: "Yuval Noah Harari", price: 22.00, rating: 4.8, category: "History", coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400" },
  { id: "5", title: "Atomic Habits", author: "James Clear", price: 16.99, rating: 4.9, category: "Self-Help", coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400" },
]

const HERO_BOOKS = [
  { coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300", rotate: -15, x: -60, y: 20, z: 1 },
  { coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300", rotate: -5, x: 0, y: 0, z: 3 },
  { coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300", rotate: 12, x: 60, y: 15, z: 2 },
]

const CATEGORIES = [
  { name: "Fiction", count: 1240, emoji: "📖", color: "from-violet-500/20 to-purple-500/10", border: "border-violet-500/30", textColor: "text-violet-400" },
  { name: "Science", count: 420, emoji: "🔬", color: "from-cyan-500/20 to-teal-500/10", border: "border-cyan-500/30", textColor: "text-cyan-400" },
  { name: "History", count: 630, emoji: "🏛", color: "from-amber-500/20 to-yellow-500/10", border: "border-amber-500/30", textColor: "text-amber-400" },
  { name: "Technology", count: 850, emoji: "💻", color: "from-blue-500/20 to-indigo-500/10", border: "border-blue-500/30", textColor: "text-blue-400" },
  { name: "Psychology", count: 310, emoji: "🧠", color: "from-pink-500/20 to-rose-500/10", border: "border-pink-500/30", textColor: "text-pink-400" },
  { name: "Self-Help", count: 520, emoji: "🌱", color: "from-green-500/20 to-emerald-500/10", border: "border-green-500/30", textColor: "text-green-400" },
]

const STATS = [
  { icon: BookOpen, value: "10K+", label: "Books" },
  { icon: Users, value: "50K+", label: "Readers" },
  { icon: Star, value: "4.9★", label: "Rating" },
  { icon: Award, value: "200+", label: "Authors" },
]

// Floating particle component
const Particle = ({ x, y, size, duration, delay }: { x: number; y: number; size: number; duration: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20 pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
)

// Typewriter hook
const useTypewriter = (words: string[], speed = 80, pause = 2000) => {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let wordIdx = 0, charIdx = 0, deleting = false, timeout: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = words[wordIdx]
      if (ref.current) ref.current.textContent = word.slice(0, charIdx)
      if (!deleting && charIdx === word.length) {
        timeout = setTimeout(() => { deleting = true; tick() }, pause)
        return
      }
      if (deleting && charIdx === 0) {
        deleting = false
        wordIdx = (wordIdx + 1) % words.length
      }
      charIdx += deleting ? -1 : 1
      timeout = setTimeout(tick, deleting ? speed / 2 : speed)
    }
    tick()
    return () => clearTimeout(timeout)
  }, [])
  return ref
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } } }

export const Home = () => {
  const navigate = useNavigate()
  const typeRef = useTypewriter(["story", "classic", "journey", "escape", "adventure"])

  const particles = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 3,
  }))

  return (
    <div className="flex flex-col gap-0 pb-16 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-900/10 pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Particles */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
              >
                <Sparkles className="h-4 w-4 animate-pulse" />
                Over 10,000 books available
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
                Discover your next<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400">
                  <span ref={typeRef} />
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Explore thousands of hand-curated books across every genre. From timeless classics to the latest releases — your perfect read is waiting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/books" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow">
                    Explore Books <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/categories" className="inline-flex items-center justify-center rounded-xl border border-border bg-card/60 backdrop-blur-sm px-8 py-4 text-base font-semibold text-foreground hover:bg-card transition-colors">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Trending Now
                  </Link>
                </motion.div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-3"
                  >
                    <s.icon className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xl font-extrabold text-foreground">{s.value}</span>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: floating books */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center h-[520px]"
            >
              {/* Big glow behind books */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              </div>

              {HERO_BOOKS.map((book, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ zIndex: book.z }}
                  animate={{
                    y: [0, -16, 0],
                    rotate: [book.rotate - 2, book.rotate + 2, book.rotate - 2],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  }}
                  initial={{ x: book.x, y: book.y }}
                  whileHover={{ scale: 1.08, zIndex: 10 }}
                >
                  <div
                    className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    style={{
                      transform: `rotate(${book.rotate}deg) translateX(${book.x}px)`,
                      width: i === 1 ? 180 : 140,
                      height: i === 1 ? 260 : 200,
                      boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(139,92,246,0.15)",
                    }}
                  >
                    <img src={book.coverUrl} alt="Book" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRENDING ── */}
      <section className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
              <TrendingUp className="h-4 w-4" /> Trending
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Most Popular Right Now</h2>
          </div>
          <Link to="/books" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {FEATURED_BOOKS.map((book, i) => (
            <motion.div key={book.id} variants={itemVariants} custom={i}>
              <BookCard {...book} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Link to="/books" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all books <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-muted/30 dark:bg-muted/10 py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
                <BookOpen className="h-4 w-4" /> Collections
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Browse by Category</h2>
            </div>
            <Link to="/categories" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              All categories <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.name}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/books?category=${encodeURIComponent(cat.name)}`)}
                className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border bg-gradient-to-br ${cat.color} ${cat.border} text-center hover:shadow-lg transition-shadow`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <p className={`font-bold text-sm ${cat.textColor}`}>{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.count} books</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { emoji: "🚚", title: "Free Shipping", desc: "On all orders over $50. Delivered to your door." },
            { emoji: "🔒", title: "Secure Payment", desc: "256-bit SSL encryption. Your data is safe." },
            { emoji: "↩️", title: "30-Day Returns", desc: "Not satisfied? Return it, no questions asked." },
          ].map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{f.emoji}</span>
              <div>
                <h4 className="font-bold text-foreground mb-1">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 p-10 text-center"
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/20 rounded-full blur-2xl pointer-events-none" />

          <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Start Building Your Library Today
          </h2>
          <p className="relative text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join 50,000+ readers who've discovered their next favorite book. New arrivals every week.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/books" className="inline-flex items-center gap-2 rounded-xl bg-white text-violet-700 px-8 py-3.5 text-base font-bold shadow-xl hover:shadow-2xl transition-shadow">
                <BookOpen className="h-5 w-5" /> Browse All Books
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/categories" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/50 text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors">
                View Categories <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
