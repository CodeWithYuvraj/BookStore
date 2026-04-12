import { motion } from "framer-motion"

export const Terms = () => {
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-10">Last updated: April 12, 2026</p>

          <div className="prose prose-blue dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
            <p>
              Welcome to BookVerse. These terms and conditions outline the rules and regulations for the use of BookVerse's Website.
            </p>

            <h3>1. Terms</h3>
            <p>
              By accessing this Website, accessible from bookverse.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.
            </p>

            <h3>2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials on BookVerse's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>

            <h3>3. Disclaimer</h3>
            <p>
              All the materials on BookVerse's Website are provided "as is". BookVerse makes no warranties, may it be expressed or implied, therefore negates all other warranties.
            </p>

            <h3>4. Limitations</h3>
            <p>
              BookVerse or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on BookVerse's Website, even if BookVerse or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
            </p>

            <h3>5. Revisions and Errata</h3>
            <p>
              The materials appearing on BookVerse's Website may include technical, typographical, or photographic errors. BookVerse will not promise that any of the materials in this Website are accurate, complete, or current.
            </p>

            <h3>6. Site Terms of Use Modifications</h3>
            <p>
              BookVerse may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
            </p>

            <h3>7. Governing Law</h3>
            <p>
              Any claim related to BookVerse's Website shall be governed by the laws of our State without regards to its conflict of law provisions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
