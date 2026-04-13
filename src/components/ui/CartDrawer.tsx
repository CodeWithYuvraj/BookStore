import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useToast } from "../../context/ToastContext"
import { Button } from "./Button"
import { AnimatedDeleteButton } from "./AnimatedDeleteButton"
import { useRef } from "react"

const CartDrawerItem = ({ item, closeDrawer, updateQuantity, removeItem }: any) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  return (
    <motion.li 
       key={item.id} 
       className="flex gap-4 transition-opacity duration-300"
       style={{ opacity: hidden ? 0 : 1 }}
       layout
    >
      <div ref={itemRef} className="flex gap-4 flex-1">
        <img src={item.coverUrl} alt={item.title} className="w-20 h-28 object-cover rounded-md border border-border shrink-0" />
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
              <AnimatedDeleteButton 
                itemRef={itemRef} 
                onBeforeDelete={() => setHidden(true)} 
                onDelete={() => removeItem(item.id)} 
              />
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  )
}


export const CartDrawer = () => {
  const { isDrawerOpen, closeDrawer, items, updateQuantity, removeItem } = useCart()
  const { addToast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo("SAVE10")
      addToast("Promo code SAVE10 applied!", "success")
    } else {
      addToast("Invalid promo code. Try SAVE10!", "error")
    }
  }

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
                    <CartDrawerItem 
                      key={item.id} 
                      item={item} 
                      closeDrawer={closeDrawer} 
                      updateQuantity={updateQuantity} 
                      removeItem={removeItem} 
                    />
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/50">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground text-sm">Subtotal</span>
                  <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between mb-2 text-green-600 dark:text-green-400">
                    <span className="text-sm font-medium">Discount (SAVE10)</span>
                    <span className="font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}

                {/* Promo Code Input */}
                <div className="mt-4 mb-6">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Promo code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button variant="outline" size="sm" onClick={handleApplyPromo}>Apply</Button>
                  </div>
                </div>

                <div className="flex justify-between mb-4 border-t border-border pt-4">
                  <span className="font-bold text-foreground text-lg">Total</span>
                  <span className="font-black text-xl text-primary">${total.toFixed(2)}</span>
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
