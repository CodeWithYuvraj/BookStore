import { Suspense, lazy, useState, useCallback } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { Navbar } from "./layouts/Navbar"
import { Footer } from "./layouts/Footer"
import { CartDrawer } from "./components/ui/CartDrawer"
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

const isAuthenticated = () => {
  const email = localStorage.getItem("user_email")
  const password = localStorage.getItem("user_password")
  return !!(email && password)
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to="/auth" replace />

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <Navigate to="/" replace /> : <>{children}</>

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-b-blue-400/50 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
    </div>
    <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
  </div>
)

const wrap = (el: React.ReactNode) => <Suspense fallback={<PageLoader />}>{el}</Suspense>

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === "/auth"
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashDone = useCallback(() => setShowSplash(false), [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onDone={handleSplashDone} />}
      </AnimatePresence>

      {!showSplash && (
        <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
          {!isAuthPage && <Navbar />}
          <CartDrawer />
          <main className="flex-1">
            {/*
              No AnimatePresence around Routes.
              The motion.div key forces React to UNMOUNT the old page instantly
              and MOUNT a fresh one — no exit animation, no overlap, no stacking.
              The new page fades in. Old page is gone immediately from DOM.
              This eliminates ALL deadlock and duplicate-content issues.
            */}
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={<PrivateRoute>{wrap(<Home />)}</PrivateRoute>} />
                <Route path="/books" element={<PrivateRoute>{wrap(<BookListing />)}</PrivateRoute>} />
                <Route path="/books/:id" element={<PrivateRoute>{wrap(<BookDetails />)}</PrivateRoute>} />
                <Route path="/cart" element={<PrivateRoute>{wrap(<Cart />)}</PrivateRoute>} />
                <Route path="/checkout" element={<PrivateRoute>{wrap(<Checkout />)}</PrivateRoute>} />
                <Route path="/wishlist" element={<PrivateRoute>{wrap(<Wishlist />)}</PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute>{wrap(<Profile />)}</PrivateRoute>} />
                <Route path="/categories" element={<PrivateRoute>{wrap(<Categories />)}</PrivateRoute>} />
                <Route path="/auth" element={<PublicOnlyRoute>{wrap(<Auth />)}</PublicOnlyRoute>} />
              </Routes>
            </motion.div>
          </main>
          {!isAuthPage && <Footer />}
        </div>
      )}
    </>
  )
}

export default App
