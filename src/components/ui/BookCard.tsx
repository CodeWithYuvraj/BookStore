import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"
import { QuickViewModal } from "./QuickViewModal"
import { useState } from "react"

interface BookProps {
  id: string
  title: string
  author: string
  price: number
  rating: number
  coverUrl: string
  category: string
}

export const BookCard = ({ id, title, author, price, rating, coverUrl, category }: BookProps) => {
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const wishlisted = isWishlisted(id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem({ id, title, author, price, coverUrl, category, rating })
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative flex flex-col rounded-2xl bg-card p-4 shadow-sm border border-border hover:shadow-lg transition-shadow"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted">
          <Link to={`/books/${id}`}>
            <img
              src={coverUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </Link>

          {/* Quick view */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-lg bg-background/90 py-2.5 text-sm font-semibold text-foreground opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-background"
          >
            <Eye className="h-4 w-4" /> Quick View
          </button>

          {/* Wishlist heart */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleWishlist}
            className={`absolute top-3 right-3 rounded-full p-2 backdrop-blur-sm transition-colors shadow-sm ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-background/80 text-muted-foreground hover:text-red-500 hover:bg-background"
            }`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-white" : ""}`} />
          </motion.button>
        </div>

        <div className="mt-4 flex flex-col flex-1">
          <div className="text-xs text-muted-foreground mb-1 font-medium">{category}</div>
          <Link to={`/books/${id}`}>
            <h3 className="line-clamp-1 text-base font-semibold text-foreground hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </Link>
          <p className="line-clamp-1 text-sm text-muted-foreground mt-0.5">{author}</p>

          <div className="mt-2 flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addItem({ id, title, author, price, coverUrl })}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        book={{ id, title, author, price, rating, coverUrl, category }}
      />
    </>
  )
}
