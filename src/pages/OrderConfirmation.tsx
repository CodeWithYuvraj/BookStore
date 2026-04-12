import { motion } from "framer-motion"
import { CheckCircle2, Package, Truck, Download, ArrowRight, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"

export const OrderConfirmation = () => {
  // In a real app, we'd fetch order details from state or an API
  const orderDetails = {
    orderId: "BKV-9842-XLL",
    date: "April 12, 2026",
    total: 101.51,
    email: "user@example.com",
    method: "Visa ending in 4242",
    items: [
      { id: 1, title: "The Art of Thinking Volume 4", price: 29.99, quantity: 1 },
      { id: 2, title: "Programming Mastery Edition", price: 71.52, quantity: 1 },
    ]
  }

  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-10"
        >
          <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-500/5">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">Thank you for your order!</h1>
          <p className="text-muted-foreground text-lg">Your order <span className="font-bold text-foreground">#{orderDetails.orderId}</span> has been placed successfully.</p>
          <p className="text-muted-foreground">A confirmation email has been sent to <span className="font-medium text-foreground">{orderDetails.email}</span>.</p>
        </motion.div>

        <div className="grid gap-6 text-left">
          {/* Order Status Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Order Details</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Date:</span> <span className="font-medium">{orderDetails.date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Payment:</span> <span className="font-medium">{orderDetails.method}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status:</span> <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-wider">Processing</span></div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Next Steps</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We'll notify you once your items have shipped. You can track your real-time status here.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full rounded-xl group">
                <Link to="/order-tracking">
                  Track Your Order <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Items Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="p-6 border-b border-border bg-muted/30">
              <h3 className="font-bold text-foreground">Items in this order</h3>
            </div>
            <div className="p-6 space-y-4">
              {orderDetails.items.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-muted rounded-lg shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="p-6 bg-muted/30 border-t border-border flex justify-between items-center text-lg">
              <span className="font-bold">Total Amount Paid</span>
              <span className="text-2xl font-black text-primary">${orderDetails.total.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* Footer Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center py-6"
          >
            <Button asChild size="lg" className="rounded-2xl h-14 px-8 shadow-xl shadow-primary/20">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" /> Return Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl h-14 px-8 border-2">
              <Download className="mr-2 h-5 w-5" /> Download Receipt
            </Button>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
