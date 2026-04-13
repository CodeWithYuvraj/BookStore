import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingCart, Trash2, BookOpen, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { AnimatedDeleteButton } from "../components/ui/AnimatedDeleteButton"
import { useRef } from "react"
import { WishlistItem } from "../context/WishlistContext"

interface WishlistCardProps {
  item: WishlistItem;
  index: number;
  removeItem: (id: string) => void;
  handleMoveToCart: (item: WishlistItem) => void;
}

const WishlistCard = ({ item, index, removeItem, handleMoveToCart }: WishlistCardProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ 
        opacity: [1, 1, 0], 
        scale: [1, 1, 0.9], 
        height: [undefined, undefined, 0], 
        overflow: "hidden" 
      }}
      transition={{ 
        delay: index * 0.05,
        exit: { 
          duration: 2.5, 
          ease: "easeInOut",
          times: [0, 0.72, 1] 
        }
      }}
      layout
      className="group relative flex flex-col rounded-2xl bg-card p-4 shadow-sm border border-border hover:shadow-md transition-shadow"
    >
      {/* Remove button */}
      <div className="absolute top-4 right-4 z-10 bg-background/80 rounded-full backdrop-blur-sm shadow-sm transition-colors border border-border/50 hover:border-destructive/30">
        <AnimatedDeleteButton 
          itemRef={itemRef} 
          onDelete={() => removeItem(item.id)} 
        />
      </div>

      <div ref={itemRef} className="flex flex-col flex-1">
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
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


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

      <AnimatePresence mode="wait">
        {items.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-border"
          >
            <Heart className="h-16 w-16 text-muted-foreground/30 mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">Save books you love to find them again easily.</p>
            <Link to="/books"><Button>Browse Books <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </motion.div>
        ) : (
          <motion.div 
            key="wishlist-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <WishlistCard 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    removeItem={removeItem} 
                    handleMoveToCart={handleMoveToCart} 
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Footer action */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
