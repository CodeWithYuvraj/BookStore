import { motion } from "framer-motion"
import { Package, Truck, Home, CheckCircle2, MapPin, Clock } from "lucide-react"

const TRACKING_STEPS = [
  { status: "Order Placed", date: "April 12, 10:30 AM", completed: true, current: false, icon: Package },
  { status: "Processing", date: "April 12, 02:15 PM", completed: true, current: false, icon: Clock },
  { status: "Shipped", date: "April 13, 09:00 AM", completed: true, current: true, icon: Truck },
  { status: "Out for Delivery", date: "Pending", completed: false, current: false, icon: CheckCircle2 },
  { status: "Delivered", date: "Pending", completed: false, current: false, icon: Home },
]

export const OrderTracking = () => {
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Order ID: <span className="text-foreground font-bold">#BKV-9842-XLL</span></p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Timeline */}
            <div className="flex-1 space-y-12 relative">
               {/* Vertical Line Connector */}
               <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-muted md:left-[19px]" />

               {TRACKING_STEPS.map((step, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="relative flex items-start gap-6"
                 >
                   <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                     step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                   } ${step.current ? "ring-4 ring-primary/20 animate-pulse" : ""}`}>
                     <step.icon className="h-5 w-5" />
                   </div>
                   
                   <div>
                     <h3 className={`font-bold text-lg ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                       {step.status}
                       {step.current && <span className="ml-3 text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-widest">Live</span>}
                     </h3>
                     <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
                   </div>
                 </motion.div>
               ))}
            </div>

            {/* Shipment Info Panel */}
            <div className="w-full md:w-80 space-y-6">
              <div className="bg-muted/30 border border-border rounded-2xl p-6">
                 <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Current Location</h4>
                 <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Distribution Center</p>
                      <p className="text-sm text-muted-foreground">South San Francisco, CA</p>
                    </div>
                 </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-2xl p-6">
                 <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Estimated Delivery</h4>
                 <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-indigo-500 shrink-0" />
                    <p className="font-bold text-foreground text-xl">Tommorow, 5 PM</p>
                 </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4">
                 <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                   <Package className="h-6 w-6 text-primary-foreground" />
                 </div>
                 <div className="text-sm">
                   <p className="font-bold text-foreground">Courier Service</p>
                   <p className="text-muted-foreground text-xs">Standard Express (USPS)</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-muted-foreground text-sm">Need help with your shipment? <a href="/contact" className="text-primary font-bold hover:underline">Contact Support</a></p>
        </div>

      </div>
    </div>
  )
}
