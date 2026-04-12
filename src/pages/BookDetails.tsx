import { motion, AnimatePresence } from "framer-motion"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Truck, ShieldCheck, BookOpen, RotateCcw, UploadCloud, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/Button"
import { BookCard } from "../components/ui/BookCard"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"

import { BOOKS } from "../data/books"


type Review = {
  id: string
  name: string
  rating: number
  text: string
  date: string
  isVerified: boolean
  helpfulVotes: number
  imageUrl?: string | null
}

const INITIAL_REVIEWS: Review[] = [
  { id: "r1", name: "Alice M.", rating: 5, text: "Absolutely brilliant! Changed the way I approach my work.", date: "2 days ago", isVerified: true, helpfulVotes: 12 },
  { id: "r2", name: "John D.", rating: 4, text: "Great read, well-structured and highly informative. Wish the cover was hardback.", date: "1 week ago", isVerified: true, helpfulVotes: 5 }
]

export const BookDetails = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "reviews">("overview")
  
  // Review System State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)
  const [newReviewText, setNewReviewText] = useState("")
  const [newReviewRating, setNewReviewRating] = useState(5)
  const [isHoveringRating, setIsHoveringRating] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showReader, setShowReader] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()

  const book = BOOKS.find(b => b.id === id) ?? BOOKS[0]
  const wishlisted = isWishlisted(book.id)
  const related = BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, 5)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: book.id, title: book.title, author: book.author, price: book.price, coverUrl: book.coverUrl })
    }
  }

  const handleWishlist = () => {
    toggleItem({ id: book.id, title: book.title, author: book.author, price: book.price, coverUrl: book.coverUrl, category: book.category, rating: book.rating })
  }

  // File Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        setPreviewImage(URL.createObjectURL(file))
      }
    }
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReviewText.trim()) return

    const review: Review = {
      id: Date.now().toString(),
      name: "Guest User",
      rating: newReviewRating,
      text: newReviewText,
      date: "Just now",
      imageUrl: previewImage,
      isVerified: false,
      helpfulVotes: 0,
    }
    
    setReviews([review, ...reviews])
    setNewReviewText("")
    setNewReviewRating(5)
    setPreviewImage(null)
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
            className="relative bg-muted rounded-2xl aspect-[2/3] overflow-hidden shadow-xl border border-border group"
            style={{ perspective: 1000 }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                src={book.images ? book.images[currentImageIndex] : book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>
            
            {book.images && book.images.length > 1 && (
              <>
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-10 custom-carousel-nav transition-opacity opacity-0 group-hover:opacity-100">
                  {book.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-primary w-4' : 'bg-primary/30 hover:bg-primary/60'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + book.images!.length) % book.images!.length); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-md border border-border text-foreground z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % book.images!.length); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-md border border-border text-foreground z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            {/* Fallback space when images loading */}
            <div className="w-full h-full" />
          </motion.div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowReader(true)}
            className="w-full h-12 rounded-xl border-dashed border-2 hover:border-primary hover:bg-primary/5 gap-2 group"
          >
            <BookOpen className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            Read Sample Chapter
          </Button>
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
              <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                
                {/* Write Review Form */}
                <form onSubmit={handleSubmitReview} className="p-5 bg-card border border-border shadow-sm rounded-2xl space-y-4">
                  <h3 className="font-semibold text-foreground text-lg">Write a Review</h3>
                  
                  {/* Interactive Star Rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        onMouseEnter={() => setIsHoveringRating(star)}
                        onMouseLeave={() => setIsHoveringRating(0)}
                        onClick={() => setNewReviewRating(star)}
                        className={`h-6 w-6 cursor-pointer transition-colors ${star <= (isHoveringRating || newReviewRating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} 
                      />
                    ))}
                  </div>

                  {/* Drag & Drop Image Zone */}
                  {previewImage ? (
                    <div className="relative w-max">
                      <img src={previewImage} alt="Preview" className="h-24 w-24 object-cover rounded-xl border border-border" />
                      <button type="button" onClick={() => setPreviewImage(null)} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-muted/20"}`}
                    >
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setPreviewImage(URL.createObjectURL(e.target.files[0]))
                          }
                        }}
                      />
                      <div className="flex flex-col items-center gap-2 text-muted-foreground pointer-events-none">
                        <UploadCloud className={`h-8 w-8 ${isDragging ? "text-primary transition-transform scale-110" : ""}`} />
                        <p className="text-sm"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                        <p className="text-xs">SVG, PNG, JPG or WEBP (max. 800x400px)</p>
                      </div>
                    </div>
                  )}

                  <textarea 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="What did you think about this book?"
                    className="w-full min-h-[100px] p-3 rounded-xl border border-input bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-y text-sm text-foreground transition-all"
                  />

                  <Button type="submit" className="w-full sm:w-auto h-10 px-8 disabled:opacity-50 hover:scale-105 active:scale-95 transition-all" disabled={!newReviewText.trim()}>
                    Post Review
                  </Button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {reviews.map((r, i) => (
                      <motion.div 
                        layout
                        key={r.id} 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="p-5 bg-card/50 rounded-2xl border border-border/50 hover:border-border transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {r.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-foreground block">{r.name}</span>
                                {r.isVerified && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                                    <ShieldCheck className="h-3 w-3" /> Verified
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{r.date}</span>
                            </div>
                          </div>
                          <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />)}</div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.text}</p>
                        {r.imageUrl && (
                          <motion.img 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={r.imageUrl} 
                            alt="Review attachment" 
                            className="mb-4 h-32 w-auto object-cover rounded-lg border border-border shadow-sm group-hover:shadow-md transition-all" 
                          />
                        )}
                        <div className="flex items-center gap-4 border-t border-border/50 pt-3">
                           <button className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1.5">
                             Helpful ({r.helpfulVotes})
                           </button>
                           <button className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
                             Report
                           </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
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
              <BookOpen className="mr-3 h-6 w-6 text-primary" /> Customers Also Bought
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {related.map(book => <BookCard key={book.id} {...book} />)}
          </div>
        </div>
      )}

      {/* Cinematic Reader Modal */}
      <AnimatePresence>
        {showReader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReader(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border shadow-2xl rounded-[32px] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Reader Header */}
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-14 rounded shadow-md overflow-hidden shrink-0">
                    <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground leading-tight">{book.title}</h3>
                    <p className="text-xs text-muted-foreground">Sample Chapter: The Architecture of Choice</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowReader(false)}
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Reader Body */}
              <div className="flex-1 overflow-y-auto p-8 sm:p-12 font-serif leading-relaxed text-lg text-foreground/90 selection:bg-primary/20">
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Chapter One</span>
                    <h2 className="text-3xl font-bold mt-2">The Hidden Patterns</h2>
                  </div>
                  
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                    It began with a simple observation. In the world of design, most people look at the surface. They see the colors, the typography, the whitespace. But beneath the surface lies a complex web of neural pathways and psychological triggers that dictate how we perceive value.
                  </p>

                  <p>
                    Choice architecture is the practice of influencing choice by changing the context in which people make decisions. For example, by changing which items are displayed most prominently or through the use of default options. When done effectively, it creates a seamless path from desire to action.
                  </p>

                  <div className="py-8 my-8 border-y border-border/50 italic text-muted-foreground text-center px-6">
                    "The best interface is one that feels like an extension of the mind, not a barrier to it."
                  </div>

                  <p>
                    As we delve deeper into this study, we find that the most successful products don't just solve problems—they anticipate them. They create a dialogue with the user that is so intuitive it requires no conscious thought. This is the art of invisible design.
                  </p>

                  <p>
                    Consider the way a physical book feels in your hands. The weight, the texture of the paper, the smell of the ink. These are not secondary characteristics; they are core to the experience of reading. In the digital realm, we must find equivalents for these sensory inputs to create a truly immersive experience.
                  </p>

                  <div className="h-64 bg-gradient-to-t from-card to-transparent border-t border-dashed border-border flex items-center justify-center text-center p-8 mt-12 rounded-b-3xl">
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">End of Sample</p>
                      <h4 className="text-xl font-bold text-foreground">Enjoyed the preview?</h4>
                      <Button onClick={() => { setShowReader(false); handleAddToCart(); }} className="rounded-full px-8">Buy Full Book Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
