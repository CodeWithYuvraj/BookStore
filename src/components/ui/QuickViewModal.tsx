import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { X, ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./Button"
import { useCart } from "../../context/CartContext"

interface QuickViewModalProps {
  isOpen: boolean
  onClose: () => void
  book: {
    id: string
    title: string
    author: string
    price: number
    rating: number
    coverUrl: string
    category: string
  }
}

export const QuickViewModal = ({ isOpen, onClose, book }: QuickViewModalProps) => {
  const { addItem } = useCart()

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal card */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-border relative flex flex-col md:flex-row pointer-events-auto"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-md hover:bg-background text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Cover image */}
              <div className="w-full md:w-2/5 aspect-[2/3] md:aspect-auto bg-muted shrink-0">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-3/5 p-8 flex flex-col">
                <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                  {book.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2 leading-tight">
                  {book.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>

                <div className="flex items-center gap-1.5 mb-6">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{book.rating}</span>
                  <span className="text-muted-foreground text-sm">(1,240 reviews)</span>
                </div>

                <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-8">
                  An indispensable guide that fundamentally changes the way you see and approach your work. Whether you're just starting your journey or refining your craft after years of experience, this book has something for everyone.
                </p>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="text-3xl font-bold text-foreground">
                    ${book.price.toFixed(2)}
                  </div>
                  <Button
                    className="flex-1 h-11 shadow-md"
                    onClick={() => {
                      addItem(book)
                      onClose()
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>

                <Link
                  to={`/books/${book.id}`}
                  onClick={onClose}
                  className="mt-5 text-center text-sm font-medium text-primary hover:underline"
                >
                  View Full Details →
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )

  // Render through portal so Framer Motion parent transforms don't trap fixed positioning
  return createPortal(modal, document.body)
}
