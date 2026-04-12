import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CreditCard, Truck, Receipt, CheckCircle2, Package, RotateCcw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useCart } from "../context/CartContext"
import { useToast } from "../context/ToastContext"

export const Checkout = () => {
  const [step, setStep] = useState(1)
  const { items, removeItem } = useCart()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  // Form State
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", address: "", city: "", state: ""
  })
  const [payment, setPayment] = useState({
    cardNumber: "", expiry: "", cvv: "", name: ""
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const discount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + tax
  const orderNumber = `BKV-${Math.floor(10000 + Math.random() * 90000)}`

  const validateShipping = () => {
    const newErrors: Record<string, boolean> = {}
    let isValid = true
    Object.keys(shipping).forEach((key) => {
      if (!shipping[key as keyof typeof shipping].trim()) {
        newErrors[key] = true
        isValid = false
      }
    })
    setErrors(newErrors)
    if (!isValid) {
      addToast("Please fill in all shipping fields correctly.", "error")
    }
    return isValid
  }

  const validatePaymentAndSubmit = () => {
    const newErrors: Record<string, boolean> = {}
    let isValid = true
    Object.keys(payment).forEach((key) => {
      if (!payment[key as keyof typeof payment].trim()) {
        newErrors[key] = true
        isValid = false
      }
    })
    setErrors(newErrors)
    
    if (!isValid) {
      addToast("Please provide all payment details.", "error")
      return
    }

    // Success
    items.forEach(i => removeItem(i.id))
    navigate("/order-confirmation")
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo("SAVE10")
    } else {
      addToast("Invalid promo code. Try SAVE10!", "error")
    }
  }

  const stepLabels = [
    { num: 1, label: "Shipping", icon: Truck },
    { num: 2, label: "Payment", icon: CreditCard },
  ]

  const getInputClass = (isError: boolean) => 
    `w-full rounded-xl border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
      isError 
        ? "border-destructive focus:ring-destructive/30 focus:border-destructive" 
        : "border-input focus:ring-primary/30 focus:border-primary"
    }`

  return (
    <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12">
      {/* Step indicator */}
      <div className="mb-10 relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 -z-10 transition-all duration-500"
          style={{ width: step === 1 ? "25%" : "75%" }}
        />
        <div className="flex justify-around">
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
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">First Name <span className="text-destructive">*</span></label>
                      <input value={shipping.firstName} onChange={(e) => setShipping(s => ({...s, firstName: e.target.value}))} type="text" className={getInputClass(errors.firstName)} placeholder="Jane" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Last Name <span className="text-destructive">*</span></label>
                      <input value={shipping.lastName} onChange={(e) => setShipping(s => ({...s, lastName: e.target.value}))} type="text" className={getInputClass(errors.lastName)} placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Email Address <span className="text-destructive">*</span></label>
                    <input value={shipping.email} onChange={(e) => setShipping(s => ({...s, email: e.target.value}))} type="email" className={getInputClass(errors.email)} placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Street Address <span className="text-destructive">*</span></label>
                    <input value={shipping.address} onChange={(e) => setShipping(s => ({...s, address: e.target.value}))} type="text" className={getInputClass(errors.address)} placeholder="123 Book Street" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-sm font-medium text-foreground">City <span className="text-destructive">*</span></label>
                      <input value={shipping.city} onChange={(e) => setShipping(s => ({...s, city: e.target.value}))} type="text" className={getInputClass(errors.city)} placeholder="San Francisco" />
                    </div>
                    <div className="col-span-1 space-y-1.5">
                      <label className="text-sm font-medium text-foreground">State <span className="text-destructive">*</span></label>
                      <input value={shipping.state} onChange={(e) => setShipping(s => ({...s, state: e.target.value}))} type="text" className={getInputClass(errors.state)} placeholder="CA" />
                    </div>
                  </div>
                  <Button className="w-full h-12 text-base mt-2" onClick={() => { if(validateShipping()) setStep(2) }}>Continue to Payment →</Button>
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
                    <label className="text-sm font-medium text-foreground">Card Number <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <input value={payment.cardNumber} onChange={(e) => setPayment(s => ({...s, cardNumber: e.target.value}))} type="text" className={`${getInputClass(errors.cardNumber)} pl-10 font-mono tracking-widest`} placeholder="0000 0000 0000 0000" />
                      <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${errors.cardNumber ? 'text-destructive' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Expiry Date <span className="text-destructive">*</span></label>
                      <input value={payment.expiry} onChange={(e) => setPayment(s => ({...s, expiry: e.target.value}))} type="text" className={getInputClass(errors.expiry)} placeholder="MM/YY" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">CVV <span className="text-destructive">*</span></label>
                      <input value={payment.cvv} onChange={(e) => setPayment(s => ({...s, cvv: e.target.value}))} type="text" className={getInputClass(errors.cvv)} placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Cardholder Name <span className="text-destructive">*</span></label>
                    <input value={payment.name} onChange={(e) => setPayment(s => ({...s, name: e.target.value}))} type="text" className={getInputClass(errors.name)} placeholder="Jane Doe" />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" className="w-1/3 h-12" onClick={() => setStep(1)}>← Back</Button>
                    <Button className="w-2/3 h-12 text-base shadow-md bg-gradient-to-r from-violet-600 to-blue-600" onClick={validatePaymentAndSubmit}>
                      Place Order — ${total.toFixed(2)}
                    </Button>
                  </div>
                </div>
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
                {appliedPromo && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span className="font-medium">Discount (SAVE10)</span>
                    <span className="font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-green-600 dark:text-green-400 font-medium">Free</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              </div>

              {/* Promo Code Input */}
              {!appliedPromo ? (
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleApplyPromo}>Apply</Button>
                </div>
              ) : (
                <div className="mb-4 p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest text-center">
                  Promo Code Applied Successfully!
                </div>
              )}

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
