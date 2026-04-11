import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CreditCard, Truck, Receipt, CheckCircle2, Package, RotateCcw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useCart } from "../context/CartContext"

export const Checkout = () => {
  const [step, setStep] = useState(1)
  const { items, removeItem } = useCart()
  const navigate = useNavigate()

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax
  const orderNumber = `BKV-${Math.floor(10000 + Math.random() * 90000)}`

  const handlePlaceOrder = () => {
    setStep(3)
    // Clear cart after short delay so user sees order confirm
    setTimeout(() => items.forEach(i => removeItem(i.id)), 800)
  }

  const stepLabels = [
    { num: 1, label: "Shipping", icon: Truck },
    { num: 2, label: "Payment", icon: CreditCard },
    { num: 3, label: "Confirm", icon: CheckCircle2 },
  ]

  return (
    <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12">
      {/* Step indicator */}
      <div className="mb-10 relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 -z-10 transition-all duration-500"
          style={{ width: step === 1 ? "16%" : step === 2 ? "50%" : "100%" }}
        />
        <div className="flex justify-between">
          {stepLabels.map(({ num, label, icon: Icon }) => (
            <div key={num} className={`flex flex-col items-center gap-2 ${step >= num ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${step >= num ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white scale-110" : "bg-card border border-border"}`}>
                {step > num ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <span className="text-xs font-semibold hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 border-b border-border pb-5 mb-6">
                  <Truck className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Shipping Address</h2>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {["First Name", "Last Name"].map(p => (
                      <div key={p} className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">{p}</label>
                        <input type="text" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" placeholder={p === "First Name" ? "Jane" : "Doe"} />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input type="email" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Street Address</label>
                    <input type="text" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" placeholder="123 Book Street" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[["City", "col-span-2", "San Francisco"], ["State", "col-span-1", "CA"]].map(([label, span, ph]) => (
                      <div key={label as string} className={`${span} space-y-1.5`}>
                        <label className="text-sm font-medium text-foreground">{label}</label>
                        <input type="text" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" placeholder={ph as string} />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full h-12 text-base mt-2" onClick={() => setStep(2)}>Continue to Payment →</Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 border-b border-border pb-5 mb-6">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Payment Details</h2>
                </div>
                <div className="space-y-5">
                  <div className="space-y-1.5 relative">
                    <label className="text-sm font-medium text-foreground">Card Number</label>
                    <div className="relative">
                      <input type="text" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 pl-10 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" placeholder="0000 0000 0000 0000" />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[["Expiry Date", "MM/YY"], ["CVV", "123"]].map(([label, ph]) => (
                      <div key={label} className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">{label}</label>
                        <input type="text" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" placeholder={ph} />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Cardholder Name</label>
                    <input type="text" className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" placeholder="Jane Doe" />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" className="w-1/3 h-12" onClick={() => setStep(1)}>← Back</Button>
                    <Button className="w-2/3 h-12 text-base shadow-md bg-gradient-to-r from-violet-600 to-blue-600" onClick={handlePlaceOrder}>
                      Place Order — ${total.toFixed(2)}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-2xl p-10 sm:p-14 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="h-12 w-12" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <h2 className="text-3xl font-extrabold text-foreground mb-2">Order Confirmed! 🎉</h2>
                  <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
                  <p className="font-mono font-bold text-foreground text-lg mb-6">Order #{orderNumber}</p>
                  <p className="text-muted-foreground text-sm mb-8">A confirmation email has been sent. Estimated delivery: 3–5 business days.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" onClick={() => navigate("/books")}>
                      <Package className="mr-2 h-5 w-5" /> Continue Shopping
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate("/profile")}>
                      <RotateCcw className="mr-2 h-5 w-5" /> View Order History
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        {step < 3 && (
          <div className="lg:col-span-5">
            <div className="bg-muted/40 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                <Receipt className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-base font-bold text-foreground">Order Summary</h3>
              </div>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No items in cart</p>
                ) : items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-16 bg-card rounded-lg border border-border overflow-hidden shrink-0">
                      <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-xs font-semibold text-foreground line-clamp-1">{item.title}</span>
                      <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="text-xs font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 text-sm border-t border-border pt-4 mb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-green-600 dark:text-green-400 font-medium">Free</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-4">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-xl font-extrabold text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
