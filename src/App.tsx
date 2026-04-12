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
const BecomeSeller = lazy(() => import("./pages/BecomeSeller").then(m => ({ default: m.BecomeSeller })))
const AboutUs = lazy(() => import("./pages/AboutUs").then(m => ({ default: m.AboutUs })))
const ContactUs = lazy(() => import("./pages/ContactUs").then(m => ({ default: m.ContactUs })))
const FAQ = lazy(() => import("./pages/FAQ").then(m => ({ default: m.FAQ })))
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })))
const Terms = lazy(() => import("./pages/Terms").then(m => ({ default: m.Terms })))
const AuthorProfile = lazy(() => import("./pages/AuthorProfile").then(m => ({ default: m.AuthorProfile })))
const Deals = lazy(() => import("./pages/Deals").then(m => ({ default: m.Deals })))
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation").then(m => ({ default: m.OrderConfirmation })))
const OrderTracking = lazy(() => import("./pages/OrderTracking").then(m => ({ default: m.OrderTracking })))
const BlogList = lazy(() => import("./pages/BlogList").then(m => ({ default: m.BlogList })))
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail").then(m => ({ default: m.BlogPostDetail })))
const GiftCards = lazy(() => import("./pages/GiftCards").then(m => ({ default: m.GiftCards })))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword").then(m => ({ default: m.ForgotPassword })))
const AdminDashboard = lazy(() => import("./pages/AdminDashboard").then(m => ({ default: m.AdminDashboard })))
const SellerDashboard = lazy(() => import("./pages/SellerDashboard").then(m => ({ default: m.SellerDashboard })))
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })))

const isAuthenticated = () => {
  const email = localStorage.getItem("user_email")
  const password = localStorage.getItem("user_password")
  return !!(email && password)
}

const isSeller = () => {
  return localStorage.getItem("user_role") === "seller"
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to="/auth" replace />

const SellerRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() && isSeller() ? <>{children}</> : <Navigate to="/become-seller" replace />

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
  const isStandalonePage = location.pathname === "/auth" || location.pathname === "/404" || location.pathname === "/forgot-password"
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashDone = useCallback(() => setShowSplash(false), [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onDone={handleSplashDone} />}
      </AnimatePresence>

      {!showSplash && (
        <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
          {!isStandalonePage && <Navbar />}
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
                
                {/* Seller Routes */}
                <Route path="/become-seller" element={<PrivateRoute>{wrap(<BecomeSeller />)}</PrivateRoute>} />
                <Route path="/seller-dashboard" element={<SellerRoute>{wrap(<SellerDashboard />)}</SellerRoute>} />

                <Route path="/auth" element={<PublicOnlyRoute>{wrap(<Auth />)}</PublicOnlyRoute>} />
                
                {/* Core Informational Pages */}
                <Route path="/about" element={wrap(<AboutUs />)} />
                <Route path="/contact" element={wrap(<ContactUs />)} />
                <Route path="/faq" element={wrap(<FAQ />)} />
                <Route path="/privacy-policy" element={wrap(<PrivacyPolicy />)} />
                <Route path="/terms" element={wrap(<Terms />)} />

                {/* Enhanced Catalog Pages */}
                <Route path="/author/:id" element={wrap(<AuthorProfile />)} />
                <Route path="/deals" element={wrap(<Deals />)} />

                {/* Post-Purchase Flow */}
                <Route path="/order-confirmation" element={wrap(<OrderConfirmation />)} />
                <Route path="/order-tracking" element={wrap(<OrderTracking />)} />

                {/* Content & Extras */}
                <Route path="/blog" element={wrap(<BlogList />)} />
                <Route path="/blog/:id" element={wrap(<BlogPostDetail />)} />
                <Route path="/gift-cards" element={wrap(<GiftCards />)} />
                <Route path="/forgot-password" element={wrap(<ForgotPassword />)} />
                <Route path="/admin" element={wrap(<AdminDashboard />)} />

                {/* 404 Routes */}
                <Route path="/404" element={wrap(<NotFound />)} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </motion.div>
          </main>
          {!isStandalonePage && <Footer />}
        </div>
      )}
    </>
  )
}

export default App
