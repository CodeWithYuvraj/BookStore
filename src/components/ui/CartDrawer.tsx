import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Button } from "./Button"

export const CartDrawer = () => {
  const { isDrawerOpen, closeDrawer, items, updateQuantity, removeItem } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-card shadow-2xl flex flex-col border-l border-border"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold flex items-center">
                <ShoppingCart className="mr-3 h-6 w-6" /> Your Cart
              </h2>
              <button 
                onClick={closeDrawer}
                className="rounded-full p-2 hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-foreground">Your cart is empty</p>
                  <p className="text-muted-foreground mt-2 mb-6">Looks like you haven't added anything yet.</p>
                  <Button onClick={closeDrawer}>Start Shopping</Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <img src={item.coverUrl} alt={item.title} className="w-20 h-28 object-cover rounded-md border border-border" />
                      <div className="flex-1 flex flex-col">
                        <Link to={`/books/${item.id}`} onClick={closeDrawer} className="font-semibold text-foreground hover:text-primary line-clamp-2">
                          {item.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">{item.author}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="font-bold">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-input rounded-md bg-background px-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-foreground hover:bg-muted">-</button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-foreground hover:bg-muted">+</button>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/50">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-foreground">Subtotal</span>
                  <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">Shipping and taxes calculated at checkout.</p>
                <Link to="/checkout" onClick={closeDrawer}>
                  <Button className="w-full h-12 text-base group">
                     Checkout <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/cart" onClick={closeDrawer}>
                   <Button variant="ghost" className="w-full mt-2 text-primary hover:text-primary/90">
                      View full cart
                   </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
