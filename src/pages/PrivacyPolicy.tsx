import { motion } from "framer-motion"

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: April 12, 2026</p>

          <div className="prose prose-blue dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
            <p>
              At BookVerse, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our platform.
            </p>

            <h3>Personal Information We Collect</h3>
            <p>
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
            </p>

            <h3>How Do We Use Your Personal Information?</h3>
            <p>
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
            </p>
            <ul>
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>

            <h3>Sharing Your Personal Information</h3>
            <p>
              We share your Personal Information with third parties to help us use your Personal Information, as described above. We also use Google Analytics to help us understand how our customers use the Site.
            </p>

            <h3>Your Rights</h3>
            <p>
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.
            </p>

            <h3>Changes</h3>
            <p>
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>

            <h3>Contact Us</h3>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:privacy@bookverse.com">privacy@bookverse.com</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
