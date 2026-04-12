import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Store, UserCheck, CreditCard, ArrowRight, ArrowLeft, UploadCloud, CheckCircle2, ShieldCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"

const STEPS = [
  { id: 1, title: "Store Info", icon: Store },
  { id: 2, title: "Identity", icon: UserCheck },
  { id: 3, title: "Bank Details", icon: CreditCard },
]

export const BecomeSeller = () => {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { updateRole } = useAuth()
  const { addToast } = useToast()

  // Form States
  const [storeName, setStoreName] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [storeDesc, setStoreDesc] = useState("")
  const [taxId, setTaxId] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNum, setAccountNum] = useState("")
  const [routingNum, setRoutingNum] = useState("")

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const getInputStateClass = (val: string) => {
    if (hasAttemptedSubmit && !val.trim()) return "border-red-500 focus:ring-red-500"
    if (val.trim()) return "border-green-500 focus:ring-green-500"
    return "border-input focus:ring-violet-500"
  }

  const handleNext = () => {
    if (step === 1 && (!storeName.trim() || !businessEmail.trim() || !storeDesc.trim())) {
      setHasAttemptedSubmit(true)
      addToast("Please fill all Store Info fields", "error")
      return
    }
    if (step === 2 && !taxId.trim()) {
      setHasAttemptedSubmit(true)
      addToast("Please provide your Tax ID / EIN", "error")
      return
    }
    setHasAttemptedSubmit(false)
    setStep(s => Math.min(3, s + 1))
  }
  const handlePrev = () => setStep(s => Math.max(1, s - 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bankName.trim() || !accountNum.trim() || !routingNum.trim()) {
      setHasAttemptedSubmit(true)
      addToast("Please fill all Bank Details", "error")
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      updateRole("seller")
      navigate("/seller-dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen my-12 bg-background flex flex-col items-center pt-24 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-6">
          <Store className="w-8 h-8 text-violet-600 dark:text-violet-400" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Join as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">Seller</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg">
          Reach thousands of readers. Build your brand. Grow your business.
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-12 relative">
        <div className="absolute top-6 left-6 right-6 h-1 -translate-y-1/2 bg-border rounded-full z-0" />
        <div className="absolute top-6 left-6 right-6 h-1 -translate-y-1/2 z-0">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-violet-600 rounded-full transition-all duration-500 z-0" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
        
        <div className="relative z-10 flex justify-between">
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 font-bold ${
                  step >= s.id ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]" : "bg-card border-2 border-border text-muted-foreground"
                }`}
              >
                {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
              </div>
              <span className={`mt-3 text-sm font-semibold ${step >= s.id ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <motion.div 
        layout
        className="w-full max-w-3xl bg-card rounded-3xl shadow-xl shadow-black/5 dark:shadow-white/5 border border-border p-8 md:p-12"
      >
        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} noValidate>
          <AnimatePresence mode="popLayout">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Store Name</label>
                  <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="e.g. Wonderland Rare Books" className={`w-full bg-background border ${getInputStateClass(storeName)} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-shadow`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Business Email</label>
                  <input type="email" value={businessEmail} onChange={e => setBusinessEmail(e.target.value)} placeholder="contact@wonderlandbooks.com" className={`w-full bg-background border ${getInputStateClass(businessEmail)} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-shadow`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Store Description</label>
                  <textarea value={storeDesc} onChange={e => setStoreDesc(e.target.value)} placeholder="What kind of books do you sell?" className={`w-full h-32 bg-background border ${getInputStateClass(storeDesc)} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-shadow resize-none`} />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Government ID</label>
                  <div className="border-2 border-dashed border-input rounded-2xl p-8 hover:bg-muted/50 transition-colors text-center cursor-pointer group">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or PDF (max. 5MB)</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Tax ID / EIN</label>
                  <input type="text" value={taxId} onChange={e => setTaxId(e.target.value)} placeholder="00-0000000" className={`w-full bg-background border ${getInputStateClass(taxId)} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-shadow`} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Bank Name</label>
                  <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="Chase Bank" className={`w-full bg-background border ${getInputStateClass(bankName)} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-shadow`} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Account Number</label>
                    <input type="text" value={accountNum} onChange={e => setAccountNum(e.target.value)} placeholder="000123456789" className={`w-full bg-background border ${getInputStateClass(accountNum)} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-shadow`} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Routing Number</label>
                    <input type="text" value={routingNum} onChange={e => setRoutingNum(e.target.value)} placeholder="021000021" className={`w-full bg-background border ${getInputStateClass(routingNum)} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-shadow`} />
                  </div>
                </div>
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 flex gap-4">
                  <ShieldCheck className="w-6 h-6 text-violet-500 shrink-0" />
                  <p className="text-sm text-violet-700 dark:text-violet-300">
                    Your banking information is heavily encrypted and securely stored. We only use this to send your payouts automatically.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between pt-6 border-t border-border">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrev} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : <div />}
            
            <Button type="submit" disabled={isSubmitting} className="gap-2 bg-violet-600 hover:bg-violet-700 text-white min-w-[140px]">
              {isSubmitting ? "Verifying..." : step === 3 ? "Complete Registration" : <>Next Step <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
