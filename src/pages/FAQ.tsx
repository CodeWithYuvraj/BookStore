import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const FAQS = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'Order History' section. We also send an email with tracking details once your order has shipped."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for physical books in their original condition. E-books and audiobooks are generally non-refundable unless there is a technical issue."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship to over 120 countries. Shipping costs and delivery times vary depending on the destination and will be calculated at checkout."
  },
  {
    question: "Can I cancel or change my order?",
    answer: "Orders can be canceled or modified within 2 hours of placement. Please contact our support team immediately if you need to make changes."
  },
  {
    question: "Are your platforms secure for payment?",
    answer: "Absolutely. We use industry-standard encryption (SSL) to protect your personal information and process payments securely through our trusted payment gateways."
  }
]

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about the product and billing.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary shadow-md bg-primary/5' : 'border-border bg-card/50 hover:border-primary/50'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-base font-bold text-foreground">{faq.question}</span>
                  <div className={`shrink-0 ml-4 h-8 w-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>

        <div className="mt-16 text-center bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a href="/contact" className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Get in touch
          </a>
        </div>

      </div>
    </div>
  )
}
