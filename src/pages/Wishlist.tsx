import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingCart, Trash2, BookOpen, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"

export const Wishlist = () => {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  const handleMoveToCart = (item: typeof items[0]) => {
    addItem({ id: item.id, title: item.title, author: item.author, price: item.price, coverUrl: item.coverUrl })
    removeItem(item.id)
  }

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      addItem({ id: item.id, title: item.title, author: item.author, price: item.price, coverUrl: item.coverUrl })
      removeItem(item.id)
    })
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" /> My Wishlist
        </h1>
        {items.length > 0 && (
          <span className="text-muted-foreground font-medium text-sm">{items.length} {items.length === 1 ? "item" : "items"}</span>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-border"
        >
          <Heart className="h-16 w-16 text-muted-foreground/30 mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md">Save books you love to find them again easily.</p>
          <Link to="/books"><Button>Browse Books <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
                className="group relative flex flex-col rounded-2xl bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-destructive backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Cover */}
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted mb-4 border border-border/50">
                  <Link to={`/books/${item.id}`}>
                    <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </Link>
                </div>

                <div className="flex flex-col flex-1">
                  {item.category && <span className="text-xs text-primary font-medium mb-1">{item.category}</span>}
                  <Link to={`/books/${item.id}`}>
                    <h3 className="line-clamp-2 text-base font-bold text-foreground hover:text-primary transition-colors">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-0.5 mb-4">{item.author}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">${item.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      onClick={() => handleMoveToCart(item)}
                      className="gap-1.5"
                    >
                      <ShoppingCart className="h-4 w-4" /> Move to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Footer action */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-muted/50 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            {items.length} book{items.length > 1 ? "s" : ""} saved to your wishlist
          </div>
          <Button
            variant="default"
            onClick={handleMoveAllToCart}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Move All to Cart
          </Button>
        </motion.div>
      )}
    </div>
  )
}
