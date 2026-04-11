import { motion, AnimatePresence } from "framer-motion"
import { Trash2, ShoppingCart, ArrowRight, ArrowLeft, ShieldCheck, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

export const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const moveToWishlist = (item: typeof items[0]) => {
    toggleItem({ id: item.id, title: item.title, author: item.author, price: item.price, coverUrl: item.coverUrl, category: "", rating: 0 })
    removeItem(item.id)
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-8 flex items-center gap-3">
        <ShoppingCart className="h-8 w-8 text-primary" /> Shopping Cart
        {items.length > 0 && <span className="text-lg font-medium text-muted-foreground">({items.length} {items.length === 1 ? "item" : "items"})</span>}
      </h1>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center bg-card rounded-2xl border border-border"
        >
          <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added any books yet. Discover your next great read!</p>
          <Link to="/books">
            <Button size="lg">Explore Books <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items */}
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-border p-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-1" />
              </div>

              <ul className="divide-y divide-border">
                <AnimatePresence>
                  {items.map(item => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                      className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link to={`/books/${item.id}`}>
                          <img src={item.coverUrl} alt={item.title} className="w-14 h-20 object-cover rounded-lg border border-border shadow-sm shrink-0" />
                        </Link>
                        <div className="min-w-0">
                          <Link to={`/books/${item.id}`} className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-sm">{item.title}</Link>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.author}</p>
                          <p className="text-sm font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                          <button onClick={() => moveToWishlist(item)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 mt-2 transition-colors">
                            <Heart className={`h-3.5 w-3.5 ${isWishlisted(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                            {isWishlisted(item.id) ? "In Wishlist" : "Save for later"}
                          </button>
                        </div>
                      </div>

                      {/* Qty */}
                      <div className="md:col-span-3 flex justify-start md:justify-center">
                        <div className="flex items-center border border-input rounded-lg p-0.5 bg-background">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors font-bold">-</button>
                          <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-foreground transition-colors font-bold">+</button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 text-right hidden md:block">
                        <span className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      {/* Remove */}
                      <div className="md:col-span-1 flex justify-end">
                        <button onClick={() => removeItem(item.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <Link to="/books" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm mb-5 border-b border-border pb-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-base font-bold">Total</span>
                <span className="text-2xl font-extrabold text-foreground">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout">
                <Button className="w-full h-12 text-base shadow-md group">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> Secure SSL checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
