import { Tag, Calendar, Percent, Plus, Trash2, Edit2, Play, Pause } from "lucide-react"
import { Button } from "../ui/Button"
import { AnimatedDeleteButton } from "../ui/AnimatedDeleteButton"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Promotion {
  id: string;
  code: string;
  discount: string;
  type: string;
  expiry: string;
  status: string;
  usage: string;
}

const PromoCard = ({ promo }: { promo: Promotion }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      animate={{ opacity: 1, scale: 1 }}
      exit={{ 
        opacity: [1, 1, 0], 
        scale: [1, 1, 0.9], 
        height: [undefined, undefined, 0], 
        overflow: "hidden" 
      }}
      transition={{ 
        exit: { 
          duration: 2.5, 
          times: [0, 0.72, 1] 
        } 
      }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col"
      layout
    >
      <div ref={itemRef} className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
           <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${promo.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
              <Tag className="h-6 w-6" />
           </div>
           <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
             promo.status === 'Active' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'
           }`}>
             {promo.status}
           </span>
        </div>
        
        <div className="flex-1">
           <h3 className="text-2xl font-black text-foreground tracking-tight mb-1">{promo.code}</h3>
           <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5"><Percent className="h-3.5 w-3.5" /> {promo.discount} discount ({promo.type})</p>
           
           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Total Usage</span>
                 <span className="text-sm font-semibold">{promo.usage}</span>
              </div>
              <div className="space-y-1 text-right">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block text-right">Expires On</span>
                 <span className="text-sm font-semibold flex items-center justify-end gap-1"><Calendar className="h-3.5 w-3.5" /> {promo.expiry}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-border mt-auto">
         <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-1.5 text-xs">
           {promo.status === 'Active' ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
           {promo.status === 'Active' ? "Pause" : "Start"}
         </Button>
         <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
            <Edit2 className="h-4 w-4" />
         </Button>
         <AnimatedDeleteButton 
            itemRef={itemRef} 
            onDelete={() => console.log('Deleting promo', promo.id)} 
            className="h-9 w-9 p-0 rounded-xl"
         />
      </div>
    </motion.div>
  )
}


const MOCK_PROMOS = [
  { id: "1", code: "SAVE10", discount: "10%", type: "Percentage", expiry: "Dec 31, 2026", status: "Active", usage: "1,240 times" },
  { id: "2", code: "WELCOME2026", discount: "$5", type: "Fixed Amount", expiry: "Jan 15, 2027", status: "Active", usage: "452 times" },
  { id: "3", code: "HOLIDAY", discount: "25%", type: "Percentage", expiry: "Jan 01, 2026", status: "Expired", usage: "8,900 times" },
]

export const PromotionsManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Promotions & Coupons</h2>
          <p className="text-muted-foreground text-sm">Create and manage platform-wide discount campaigns.</p>
        </div>
        <Button className="rounded-xl gap-2"><Plus className="h-4 w-4" /> Create Coupon</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {MOCK_PROMOS.map((promo) => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </AnimatePresence>

         {/* Add card */}
         <button className="bg-background border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all group">
            <div className="h-10 w-10 rounded-full border border-current flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
               <Plus className="h-6 w-6" />
            </div>
            <span className="font-bold text-sm">New Campaign</span>
         </button>
      </div>
    </div>
  )
}
