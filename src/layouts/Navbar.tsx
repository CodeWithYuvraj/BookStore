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

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 150)
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
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo — always visible */}
          <div className="flex shrink-0 items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight text-primary whitespace-nowrap">
              Book<span className="text-blue-600 dark:text-blue-400">Verse</span>
            </Link>
          </div>

          {/* Desktop Nav Links — always visible, compress slightly when search open */}
          <div className="hidden md:block">
            <div className={`flex items-center transition-all duration-200 ${isSearchOpen ? "ml-4 space-x-4" : "ml-6 space-x-8"}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap ${isSearchOpen ? "text-xs" : "text-sm"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Animated Search Bar — compact size */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.form
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 200 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                style={{ overflow: "hidden" }}
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-1.5 ml-auto"
              >
                <div className="relative" style={{ width: 180 }}>
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-full border border-input bg-background py-1.5 pl-8 pr-3 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-5 shrink-0">
            {/* Search toggle */}
            <AnimatePresence>
              {!isSearchOpen && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Search className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <Link to="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-5 w-5" />
            </Link>
            <button onClick={openDrawer} className="text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
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
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
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

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center space-x-3 shrink-0">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={openDrawer} className="text-muted-foreground hover:text-foreground relative">
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
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search books, authors..."
                  className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 border-t border-border pt-4 flex justify-around pb-2">
                <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex flex-col items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                  <Heart className="h-6 w-6 mb-1" />
                  Wishlist
                </Link>
                {user ? (
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex flex-col items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                    <User className="h-6 w-6 mb-1" />
                    Profile
                  </Link>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="flex flex-col items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                    <LogOut className="h-6 w-6 mb-1" />
                    Sign In
                  </Link>
                )}
              </div>
              {user && (
                <div className="px-3 py-2 mt-2">
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20">
                    <LogOut className="h-4 w-4" /> Sign out ({user.email})
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
