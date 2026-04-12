import { motion } from "framer-motion"
import { KeyRound, Mail, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useToast } from "../context/ToastContext"

export const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setError(true)
      addToast("Please enter a valid email address.", "error")
      return
    }

    setError(false)
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"
          >
            <KeyRound className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground">No worries, it happens. We'll send you a link to reset it in seconds.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl shadow-primary/5">
           {!isSubmitted ? (
             <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="space-y-2">
                   <label className="text-sm font-bold text-foreground">Email Address</label>
                   <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input 
                        type="email" 
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(false)
                        }}
                        className={`w-full h-12 bg-background border rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-all ${
                          error 
                            ? "border-red-500 focus:ring-red-500/20" 
                            : "border-input focus:ring-primary/20"
                        }`}
                      />
                   </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                <div className="text-center">
                   <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                      <ArrowLeft className="h-4 w-4" /> Back to Login
                   </Link>
                </div>
             </form>
           ) : (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center py-4"
             >
                <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Email Sent!</h3>
                <p className="text-sm text-muted-foreground mb-8">
                   We've sent a password reset link to <span className="font-bold text-foreground">{email}</span>. Please check your inbox (and spam folder).
                </p>
                
                <div className="space-y-4">
                   <Button asChild className="w-full rounded-xl">
                      <a href="https://gmail.com" target="_blank" rel="noreferrer">Open Email App</a>
                   </Button>
                   <Button variant="ghost" className="w-full rounded-xl text-muted-foreground" onClick={() => setIsSubmitted(false)}>
                      Try another email address
                   </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                   <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5" /> 
                      Link expires in 24 hours
                   </div>
                </div>
             </motion.div>
           )}
        </div>

      </div>
    </div>
  )
}
