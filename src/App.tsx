import { Suspense, lazy, useState, useCallback } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "./layouts/Navbar"
import { Footer } from "./layouts/Footer"
import { CartDrawer } from "./components/ui/CartDrawer"
import { PageTransition } from "./components/ui/PageTransition"
import { SplashScreen } from "./components/ui/SplashScreen"

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })))
const BookListing = lazy(() => import("./pages/BookListing").then(m => ({ default: m.BookListing })))
const BookDetails = lazy(() => import("./pages/BookDetails").then(m => ({ default: m.BookDetails })))
const Cart = lazy(() => import("./pages/Cart").then(m => ({ default: m.Cart })))
const Checkout = lazy(() => import("./pages/Checkout").then(m => ({ default: m.Checkout })))
const Wishlist = lazy(() => import("./pages/Wishlist").then(m => ({ default: m.Wishlist })))
const Profile = lazy(() => import("./pages/Profile").then(m => ({ default: m.Profile })))
const Auth = lazy(() => import("./pages/Auth").then(m => ({ default: m.Auth })))
const Categories = lazy(() => import("./pages/Categories").then(m => ({ default: m.Categories })))

// Check if user is authenticated via localStorage
const isAuthenticated = () => {
  const email = localStorage.getItem("user_email")
  const password = localStorage.getItem("user_password")
  return !!(email && password)
}

// Blocks logged-out users → redirect to /auth
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/auth" replace />
}

// Blocks logged-in users from accessing /auth → redirect to /
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <>{children}</>
}

// Attractive page loader for Suspense fallback
const PageLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4"
  >
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-b-blue-400/50 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
    </div>
    <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
  </motion.div>
)

const wrap = (Component: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>
    <PageTransition>{Component}</PageTransition>
  </Suspense>
)

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === "/auth"
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashDone = useCallback(() => setShowSplash(false), [])

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={handleSplashDone} />}
      </AnimatePresence>

      {!showSplash && (
        <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
          {!isAuthPage && <Navbar />}
          <CartDrawer />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Protected routes — require login */}
                <Route path="/" element={<PrivateRoute>{wrap(<Home />)}</PrivateRoute>} />
                <Route path="/books" element={<PrivateRoute>{wrap(<BookListing />)}</PrivateRoute>} />
                <Route path="/books/:id" element={<PrivateRoute>{wrap(<BookDetails />)}</PrivateRoute>} />
                <Route path="/cart" element={<PrivateRoute>{wrap(<Cart />)}</PrivateRoute>} />
                <Route path="/checkout" element={<PrivateRoute>{wrap(<Checkout />)}</PrivateRoute>} />
                <Route path="/wishlist" element={<PrivateRoute>{wrap(<Wishlist />)}</PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute>{wrap(<Profile />)}</PrivateRoute>} />
                <Route path="/categories" element={<PrivateRoute>{wrap(<Categories />)}</PrivateRoute>} />

                {/* Public only route — logged-in users are sent home */}
                <Route path="/auth" element={<PublicOnlyRoute>{wrap(<Auth />)}</PublicOnlyRoute>} />
              </Routes>
            </AnimatePresence>
          </main>
          {!isAuthPage && <Footer />}
        </div>
      )}
    </>
  )
}

export default App
