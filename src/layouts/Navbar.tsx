import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, ShoppingCart, Heart, User, Search, Moon, Sun, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../components/theme-provider"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const { cartCount, openDrawer } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Categories", path: "/categories" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80)
    } else {
      setSearchQuery("")
    }
  }, [isSearchOpen])

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate("/auth", { replace: true })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">

          {/* ── Logo ── */}
          <motion.div layout="position" className="shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight text-primary whitespace-nowrap">
              Book<span className="text-blue-600 dark:text-blue-400">Verse</span>
            </Link>
          </motion.div>

          {/* ── Center: Nav Links + Search (always in middle) ── */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-3 min-w-0">

            {/* Nav links — always visible, shift left when search opens */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="flex items-center gap-6 shrink-0"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} layout="position">
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Search bar — expands next to nav links */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form
                  key="search-form"
                  initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                  animate={{ opacity: 1, width: 240, marginLeft: 8 }}
                  exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                  transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.7 }}
                  style={{ overflow: "hidden", flexShrink: 0 }}
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2"
                >
                  <div className="relative" style={{ width: 208 }}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search books, authors..."
                      className="w-full rounded-full border border-primary/40 bg-card/90 backdrop-blur-sm py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSearchOpen(false)}
                    className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── Actions ── */}
          <div className="hidden md:flex items-center gap-4 shrink-0">

            {/* Search toggle icon */}
            <AnimatePresence mode="wait">
              {!isSearchOpen && (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Search className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <button onClick={openDrawer} className="text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                >
                  <span className="text-sm font-bold">{user.email.substring(0, 1).toUpperCase()}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-lg overflow-hidden py-1"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <User className="mr-2 h-4 w-4" /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Theme toggle */}
            <motion.button
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          </div>

          {/* ── Mobile right side ── */}
          <div className="flex md:hidden items-center gap-3 shrink-0 ml-auto">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={openDrawer} className="text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-3">
              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search books, authors..."
                  className="w-full rounded-full border border-input bg-card py-2.5 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </form>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="block rounded-xl px-3 py-2.5 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 border-t border-border pt-4 flex justify-around pb-2">
                <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="h-5 w-5" /> Wishlist
                </Link>
                {user ? (
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <User className="h-5 w-5" /> Profile
                  </Link>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <LogOut className="h-5 w-5" /> Sign In
                  </Link>
                )}
              </div>
              {user && (
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors">
                  <LogOut className="h-4 w-4" /> Sign out ({user.email})
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
