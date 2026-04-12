import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone, Send, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useState } from "react"
import { useToast } from "../context/ToastContext"

export const ContactUs = () => {
  const { addToast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    let valid = true
    let errorMessage = "Please fill in all required fields."

    if (!form.firstName.trim()) { newErrors.firstName = true; valid = false }
    if (!form.lastName.trim()) { newErrors.lastName = true; valid = false }
    
    if (!form.email.trim()) {
      newErrors.email = true
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = true
      valid = false
      errorMessage = "Please enter a valid email address."
    }

    if (!form.message.trim()) { newErrors.message = true; valid = false }
    
    setErrors(newErrors)
    if (!valid) addToast(errorMessage, "error")
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    addToast("Message sent successfully!", "success")
  }

  const getInputClass = (key: string, extra = "") =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all duration-300 ${extra} ${
      errors[key] 
        ? "border-destructive focus:ring-2 focus:ring-destructive/30 focus:border-destructive" 
        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`

  const update = (key: string, val: string) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: false }))
  }

  return (
    <div className="min-h-screen bg-background pt-10 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[15%] w-[60vw] h-[60vw] bg-blue-500/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] bg-indigo-500/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6"
          >
            <Sparkles className="h-4 w-4" /> We'd Love to Hear From You
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Have a question, feedback, or need support? Our team is here to help you 24/7.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 p-8 rounded-3xl h-full shadow-sm hover:shadow-lg transition-all duration-500 group">
              <h3 className="text-2xl font-bold text-foreground mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email Us", sub: "Our friendly team is here to help.", value: "support@bookverse.com", href: "mailto:support@bookverse.com" },
                  { icon: MapPin, title: "Visit Us", sub: "Come say hello at our HQ.", value: "100 Market St, San Francisco, CA 94105" },
                  { icon: Phone, title: "Call Us", sub: "Mon-Fri from 8am to 5pm.", value: "+1 (555) 000-0000" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4 group/item"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors"
                    >
                      <item.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm mb-1">{item.sub}</p>
                      {item.href ? (
                        <a href={item.href} className="text-primary font-medium hover:underline">{item.value}</a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
               
               <AnimatePresence mode="wait">
                 {!submitted ? (
                   <motion.div key="form" exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }}>
                     <h3 className="text-2xl font-bold text-foreground mb-6">Send us a message</h3>
                     
                     <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-sm font-semibold text-foreground">First Name <span className="text-destructive">*</span></label>
                           <input 
                             value={form.firstName}
                             onChange={(e) => update("firstName", e.target.value)}
                             type="text" 
                             className={getInputClass("firstName")} 
                             placeholder="Jane" 
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-sm font-semibold text-foreground">Last Name <span className="text-destructive">*</span></label>
                           <input 
                             value={form.lastName}
                             onChange={(e) => update("lastName", e.target.value)}
                             type="text" 
                             className={getInputClass("lastName")} 
                             placeholder="Doe" 
                           />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <label className="text-sm font-semibold text-foreground">Email <span className="text-destructive">*</span></label>
                         <input 
                           value={form.email}
                           onChange={(e) => update("email", e.target.value)}
                           type="email" 
                           className={getInputClass("email")} 
                           placeholder="jane@example.com" 
                         />
                       </div>

                       <div className="space-y-2">
                         <label className="text-sm font-semibold text-foreground">Message <span className="text-destructive">*</span></label>
                         <textarea 
                           value={form.message}
                           onChange={(e) => update("message", e.target.value)}
                           rows={5} 
                           className={getInputClass("message", "resize-none")} 
                           placeholder="How can we help?" 
                         />
                       </div>

                       <Button type="submit" className="w-full md:w-auto px-10 h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all group">
                         <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" /> Send Message
                       </Button>
                     </form>
                   </motion.div>
                 ) : (
                   <motion.div 
                     key="success" 
                     initial={{ opacity: 0, scale: 0.8, y: 30 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                     className="flex flex-col items-center justify-center text-center py-16 sm:py-24"
                   >
                     <motion.div
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                       className="relative mb-8"
                     >
                       <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full animate-pulse" />
                       <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30 relative z-10">
                         <CheckCircle className="h-12 w-12 text-white" />
                       </div>
                     </motion.div>
                     
                     <motion.h3 
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.4 }}
                       className="text-3xl font-black text-foreground mb-3"
                     >
                       Message Sent!
                     </motion.h3>
                     <motion.p 
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                       className="text-muted-foreground max-w-sm mb-8"
                     >
                       Thanks for reaching out, {form.firstName}! We'll get back to you within 24 hours.
                     </motion.p>
                     <motion.div
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.6 }}
                     >
                       <Button 
                         variant="outline" 
                         className="h-12 px-8 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all"
                         onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", message: "" }) }}
                       >
                         Send Another Message
                       </Button>
                     </motion.div>

                     {/* Confetti-like particles */}
                     {[...Array(12)].map((_, i) => (
                       <motion.div
                         key={i}
                         initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                         animate={{ 
                           opacity: 0, 
                           scale: 1,
                           x: (Math.cos(i * 30 * Math.PI / 180)) * (80 + i * 15),
                           y: (Math.sin(i * 30 * Math.PI / 180)) * (80 + i * 15),
                         }}
                         transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                         className={`absolute w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-green-400' : i % 3 === 1 ? 'bg-emerald-500' : 'bg-primary'}`}
                         style={{ top: "40%", left: "50%" }}
                       />
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
