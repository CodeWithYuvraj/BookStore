import { motion, AnimatePresence } from "framer-motion"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Truck, ShieldCheck, BookOpen, RotateCcw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { BookCard } from "../components/ui/BookCard"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"

// Shared book data — same as BookListing so clicking a card works
const BOOK_COVERS = [
  "1544947950-fa07a98d237f", "1512820790803-83ca734da794", "1589829085413-56de8ae18c73",
  "1481627834876-b7833e8f5570", "1495446815901-a7297e633e8d", "1524578271613-d550eacf6090", "1457369804613-52c61a468e7d"
]

const ALL_BOOKS = Array.from({ length: 24 }).map((_, i) => ({
  id: `book-${i}`,
  title: `The Art of ${["Programming", "Design", "Writing", "Thinking", "Leadership", "Creative Coding"][i % 6]}`,
  author: ["Don Norman", "Robert C. Martin", "Martin Fowler", "Kent Beck", "Linus Torvalds"][i % 5],
  price: 15 + (i * 2.5),
  rating: parseFloat((4 + Math.random()).toPrecision(2)),
  category: i % 3 === 0 ? "Fiction" : i % 2 === 0 ? "Design" : "Programming",
  coverUrl: `https://images.unsplash.com/photo-${BOOK_COVERS[i % BOOK_COVERS.length]}?auto=format&fit=crop&q=80&w=600`,
  pages: 200 + (i * 15),
  publisher: ["Penguin", "O'Reilly", "HarperCollins", "Basic Books"][i % 4],
  language: "English",
  publicationDate: `${["Jan", "Mar", "Jun", "Sep"][i % 4]} ${2018 + (i % 5)}, ${i % 4 + 1}`,
  description: "An indispensable guide for anyone wanting to understand the deeper principles at work — whether you are just starting your journey or refining your craft after years of experience. This book will fundamentally change the way you see and approach your work.",
}))

export const BookDetails = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "reviews">("overview")
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()

  const book = ALL_BOOKS.find(b => b.id === id) ?? ALL_BOOKS[0]
  const wishlisted = isWishlisted(book.id)
  const related = ALL_BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, 5)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: book.id, title: book.title, author: book.author, price: book.price, coverUrl: book.coverUrl })
    }
  }

  const handleWishlist = () => {
    toggleItem({ id: book.id, title: book.title, author: book.author, price: book.price, coverUrl: book.coverUrl, category: book.category, rating: book.rating })
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 mb-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground flex-wrap gap-2">
        <Link to="/books" className="hover:text-foreground transition-colors flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Library
        </Link>
        <span>/</span>
        <Link to={`/categories`} className="hover:text-foreground transition-colors">{book.category}</Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 space-y-4"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 3 }}
            className="bg-muted rounded-2xl aspect-[2/3] overflow-hidden shadow-xl border border-border"
            style={{ perspective: 1000 }}
          >
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col"
        >
          <div className="mb-2 text-primary font-semibold tracking-wide uppercase text-xs">{book.category}</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">{book.title}</h1>
          <p className="text-lg text-muted-foreground mb-5">by <span className="font-medium text-foreground">{book.author}</span></p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
              ))}
              <span className="ml-2 font-medium text-foreground">{book.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">(1,240 reviews)</span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border mb-6">
            {(["overview", "details", "reviews"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="sync">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </motion.div>
            )}
            {activeTab === "details" && (
              <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  {[["Pages", book.pages], ["Publisher", book.publisher], ["Language", book.language], ["Published", book.publicationDate]].map(([k, v]) => (
                    <li key={String(k)} className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{k}</span>
                      <span className="font-medium text-foreground">{v}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {activeTab === "reviews" && (
              <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                {[{ name: "Alice M.", rating: 5, text: "Absolutely brilliant! Changed the way I approach my work." }, { name: "John D.", rating: 4, text: "Great read, well-structured and highly informative." }].map(r => (
                  <div key={r.name} className="p-4 bg-muted/50 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-foreground">{r.name}</span>
                      <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Add to Cart Sidebar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24 space-y-5">
            <div className="text-3xl font-bold text-foreground">${book.price.toFixed(2)}</div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              In Stock
            </div>

            {/* Qty */}
            <div className="flex items-center border border-input rounded-lg p-1">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors font-bold text-lg">-</button>
              <span className="flex-1 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors font-bold text-lg">+</button>
            </div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button onClick={handleAddToCart} className="w-full h-12 text-base shadow-md group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Add to Cart <ShoppingCart className="ml-2 h-5 w-5" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button variant="outline" onClick={handleWishlist} className={`w-full h-12 text-base gap-2 ${wishlisted ? "border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10" : ""}`}>
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {wishlisted ? "Wishlisted ✓" : "Add to Wishlist"}
              </Button>
            </motion.div>

            <div className="space-y-3 pt-2 border-t border-border">
              {[
                { icon: Truck, color: "text-green-600", title: "Free Delivery", desc: "Orders over $50" },
                { icon: ShieldCheck, color: "text-blue-600", title: "Secure Payment", desc: "256-bit SSL" },
                { icon: RotateCcw, color: "text-amber-600", title: "30-Day Returns", desc: "No questions asked" },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border text-sm">
              <span className="text-muted-foreground flex items-center"><Share2 className="mr-1.5 h-4 w-4" /> Share</span>
              <div className="flex gap-2">
                {["f", "t", "in"].map(s => (
                  <button key={s} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">{s}</button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Books */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight flex items-center text-foreground">
              <BookOpen className="mr-3 h-6 w-6 text-primary" /> You Might Also Like
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {related.map(book => <BookCard key={book.id} {...book} />)}
          </div>
        </div>
      )}
    </div>
  )
}
