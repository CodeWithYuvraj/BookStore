import { motion, AnimatePresence } from "framer-motion"
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-border relative flex flex-col md:flex-row"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-md hover:bg-background text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="w-full md:w-2/5 aspect-[2/3] md:aspect-auto bg-muted">
                 <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="w-full md:w-3/5 p-8 flex flex-col">
                 <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{book.category}</div>
                 <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">{book.title}</h2>
                 <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>
                 
                 <div className="flex items-center space-x-1 mb-6">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{book.rating}</span>
                 </div>
                 
                 <p className="text-muted-foreground line-clamp-4 mb-8">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio et diam efficitur mollis. Suspendisse potenti. Nunc sed turpis in neque hendrerit finibus id in elit.
                 </p>
                 
                 <div className="mt-auto flex items-center justify-between gap-6">
                    <div className="text-3xl font-bold text-foreground">${book.price.toFixed(2)}</div>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        addItem(book)
                        onClose()
                      }}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                 </div>
                 
                 <Link to={`/books/${book.id}`} onClick={onClose} className="mt-6 text-center text-sm font-medium text-primary hover:underline">
                    View Full Details
                 </Link>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
