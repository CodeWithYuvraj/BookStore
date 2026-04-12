import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { Link } from "react-router-dom"

const shakeVariants = {
  shake: {
    x: [0, -4, 4, -4, 4, -2, 2, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 2.5,
      ease: "easeInOut",
    },
  },
}

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Brand */}
          <div className="shrink-0">
            <Link to="/" className="text-xl font-bold tracking-tight text-primary">
              Book<span className="text-blue-600 dark:text-blue-400">Verse</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px] leading-relaxed">
              Discover, read & collect your next great story.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/books" className="hover:text-foreground transition-colors">Books</Link>
            <Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
          </div>

          {/* Subscribe */}
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Bell with pulsing ring */}
            <div className="relative shrink-0">
              <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                <Bell className="h-4 w-4 text-primary" />
              </div>
            </div>

            <input
              type="email"
              placeholder="Your email"
              className="w-44 sm:w-52 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />

            <motion.button
              variants={shakeVariants}
              animate="shake"
              type="submit"
              className="shrink-0 rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
            >
              Subscribe
            </motion.button>
          </form>
        </div>

        {/* Subscribe hint text */}
        <p className="text-[11px] text-muted-foreground mt-4 text-right">
          🔔 Stay updated — get new book & listing alerts directly to your inbox.
        </p>

        {/* Bottom strip */}
        <div className="mt-4 border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} BookVerse. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
