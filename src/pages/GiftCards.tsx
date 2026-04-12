import { motion } from "framer-motion"
import { Gift, CreditCard, Sparkles, Send, CheckCircle2, Info } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui/Button"

export const GiftCards = () => {
  const [amount, setAmount] = useState(50)
  const [recipient, setRecipient] = useState("")

  const GIFT_VALUES = [25, 50, 100, 200, 500]

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
               <Sparkles className="h-4 w-4" /> The Perfect Gift
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-none mb-8">
              Give the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500">Gift of Discovery.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Unlock millions of stories spanning every genre imaginable. Send an instant digital gift card to a fellow book lover today.
            </p>
            
            <div className="space-y-6">
               {[
                 { icon: CheckCircle2, text: "Delivered instantly via email" },
                 { icon: CheckCircle2, text: "No expiration date, ever" },
                 { icon: CheckCircle2, text: "Can be used on any book or audio title" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-foreground font-medium">
                   <item.icon className="h-5 w-5 text-green-500" /> {item.text}
                 </div>
               ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            {/* Visual Gift Card Preview */}
            <div className="aspect-[1.6/1] w-full bg-gradient-to-br from-indigo-600 via-violet-600 to-primary rounded-[32px] p-8 text-white shadow-2xl shadow-primary/20 relative overflow-hidden ring-1 ring-white/20">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-2xl" />
               
               <div className="relative flex flex-col h-full justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <Gift className="h-7 w-7" />
                      </div>
                      <span className="text-2xl font-black tracking-tighter">BookVerse</span>
                    </div>
                    <span className="text-4xl font-black">${amount}</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Gift Card</p>
                    <p className="font-mono text-lg tracking-[0.2em]">**** **** **** 2026</p>
                  </div>
               </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/20 blur-3xl -z-10" />
          </motion.div>
        </div>

        {/* Configuration Form */}
        <div className="bg-card border border-border rounded-[40px] p-8 sm:p-12 shadow-sm">
           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                 <div>
                   <label className="text-sm font-bold text-foreground uppercase tracking-widest mb-4 block">Select Amount</label>
                   <div className="flex flex-wrap gap-3">
                     {GIFT_VALUES.map(v => (
                       <button 
                         key={v}
                         onClick={() => setAmount(v)}
                         className={`h-14 w-20 rounded-2xl font-bold flex items-center justify-center transition-all ${
                           amount === v ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
                         }`}
                       >
                         ${v}
                       </button>
                     ))}
                     <div className="h-14 flex-1 min-w-[120px] relative">
                        <input 
                          type="number" 
                          placeholder="Custom" 
                          className="w-full h-full rounded-2xl border border-input bg-background pl-4 pr-10 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                          onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                     </div>
                   </div>
                 </div>

                 <div>
                   <label className="text-sm font-bold text-foreground uppercase tracking-widest mb-4 block">Recipient Email</label>
                   <div className="relative">
                      <input 
                        type="email" 
                        placeholder="friend@example.com" 
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full h-14 rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <Send className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   </div>
                   <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5"><Info className="h-3.5 w-3.5" /> They will receive the code instantly after checkout.</p>
                 </div>
              </div>

              <div className="flex flex-col justify-end">
                 <div className="p-8 bg-muted/30 rounded-3xl border border-border mb-8">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-muted-foreground">Gift Value</span>
                       <span className="font-bold text-foreground">${amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-6">
                       <span className="text-muted-foreground">Delivery</span>
                       <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Instant</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-4">
                       <span className="text-lg font-bold">Total Due</span>
                       <span className="text-3xl font-black text-primary border-b-2 border-primary/20">${amount.toFixed(2)}</span>
                    </div>
                 </div>
                 
                 <Button size="lg" className="h-16 text-lg rounded-[24px] shadow-xl shadow-primary/20 group">
                    Add Gift Card to Cart <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)
