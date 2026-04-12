import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, User as UserIcon, Github, BookOpen, ArrowRight, Eye, EyeOff, KeyRound, ChevronLeft, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"

// "step" drives the view: "login" | "signup" | "forgot" | "otp"
type Step = "login" | "signup" | "forgot" | "otp"

const DEMO_EMAIL = "demo@gmail.com"
const DEMO_OTP = "123456"
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const Auth = () => {
  const [step, setStep] = useState<Step>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSellerLogin, setIsSellerLogin] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const { user, login: contextLogin, isLoading } = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToast()

  useEffect(() => {
    if (!isLoading && user) navigate("/")
  }, [user, isLoading, navigate])

  // ── Login submit ──────────────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailRegex.test(email)) { addToast("Enter a valid email address", "error"); return }
    const isEmailWrong = email !== DEMO_EMAIL
    const isPasswordWrong = password !== "demo123"
    if (isEmailWrong && isPasswordWrong) { addToast("Both Email and Password are wrong", "error"); return }
    if (isEmailWrong) { addToast("Email is wrong", "error"); return }
    if (isPasswordWrong) { addToast("Password is wrong", "error"); return }
    contextLogin(email, isSellerLogin ? "seller" : "user")
    addToast(isSellerLogin ? "Welcome back, Merchant!" : "Welcome back!", "success")
    navigate("/")
  }

  // ── Forgot password submit ────────────────────────────────────────────────
  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailRegex.test(forgotEmail)) { addToast("Enter a valid email address", "error"); return }
    if (forgotEmail !== DEMO_EMAIL) { addToast("No account found with this email", "error"); return }
    // Bouncing OTP toast
    addToast("OTP has been sent to your email! 📬", "success")
    setStep("otp")
  }

  // ── OTP input handling ────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, 6).split("")
    const next = [...otp]
    data.forEach((ch, i) => { if (/\d/.test(ch)) next[i] = ch })
    setOtp(next)
    otpRefs.current[Math.min(data.length, 5)]?.focus()
    e.preventDefault()
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    const entered = otp.join("")
    if (entered.length < 6) { addToast("Please enter the full 6-digit OTP", "error"); return }
    if (entered !== DEMO_OTP) { addToast("Incorrect OTP. Try 123456", "error"); return }
    addToast("Identity verified! You may now log in.", "success")
    setStep("login")
    setOtp(["", "", "", "", "", ""])
    setForgotEmail("")
  }

  if (isLoading || user) return <div className="min-h-screen bg-background" />

  // ── title per step ────────────────────────────────────────────────────────
  const titles: Record<Step, string> = {
    login: "Welcome back",
    signup: "Create an account",
    forgot: "Forgot password?",
    otp: "Verify your email",
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden relative">

      {/* Decorative blobs */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-card/80 backdrop-blur-2xl shadow-xl rounded-3xl p-8 border border-border"
        >
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-primary">
                Book<span className="text-blue-600 dark:text-blue-400">Verse</span>
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h2 key={step + "-title"}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-center text-2xl font-extrabold text-foreground mb-8">
              {titles[step]}
            </motion.h2>
          </AnimatePresence>

          {/* ── Forms ── */}
          <AnimatePresence mode="wait">

            {/* LOGIN */}
            {step === "login" && (
              <motion.form key="login"
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="Email address (demo@gmail.com)"
                      className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Password (demo123)"
                      className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center cursor-pointer group">
                      <input type="checkbox" className="rounded border-input bg-background text-primary focus:ring-primary mr-2" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input type="checkbox" checked={isSellerLogin} onChange={e => setIsSellerLogin(e.target.checked)} className="rounded border-input bg-background text-violet-500 focus:ring-violet-500 mr-2" />
                      <span className="text-violet-600 dark:text-violet-400 font-semibold group-hover:text-violet-500 transition-colors">Login as Seller</span>
                    </label>
                  </div>
                  <button type="button" onClick={() => setStep("forgot")}
                    className="font-medium text-primary hover:underline focus:outline-none">
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm text-base font-bold">
                  Sign In <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.form>
            )}

            {/* SIGNUP */}
            {step === "signup" && (
              <motion.form key="signup"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="space-y-6" onSubmit={e => { e.preventDefault(); addToast("Signup is currently disabled in demo mode.", "info") }}>
                <div className="space-y-4">
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Full Name"
                      className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm text-base font-bold">
                  Sign Up <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.form>
            )}

            {/* FORGOT */}
            {step === "forgot" && (
              <motion.form key="forgot"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="space-y-6" onSubmit={handleForgot}>
                <p className="text-sm text-muted-foreground text-center -mt-4">
                  Enter your registered email and we'll send you a one-time passcode.
                </p>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-medium" />
                </div>
                <Button type="submit" className="w-full py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm text-base font-bold">
                  Send OTP <ArrowRight className="h-5 w-5" />
                </Button>
                <button type="button" onClick={() => setStep("login")}
                  className="w-full flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="h-4 w-4" /> Back to Sign In
                </button>
              </motion.form>
            )}

            {/* OTP */}
            {step === "otp" && (
              <motion.form key="otp"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="space-y-6" onSubmit={handleVerifyOtp}>

                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                  >
                    <KeyRound className="h-7 w-7" />
                  </motion.div>
                </div>

                <p className="text-sm text-muted-foreground text-center -mt-2">
                  We sent a 6-digit OTP to <span className="font-semibold text-foreground">{forgotEmail}</span>.
                  <br />
                  <span className="text-xs opacity-70">(Demo OTP: <strong>123456</strong>)</span>
                </p>

                {/* 6-box OTP input */}
                <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <motion.input
                      key={i}
                      ref={el => { otpRefs.current[i] = el }}
                      type="text" inputMode="numeric" maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      whileFocus={{ scale: 1.08 }}
                      className="h-12 w-12 rounded-xl border border-input bg-background text-center text-lg font-bold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all caret-transparent"
                    />
                  ))}
                </div>

                <Button type="submit" className="w-full py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm text-base font-bold">
                  <CheckCircle2 className="h-5 w-5" /> Verify OTP
                </Button>

                <div className="flex flex-col items-center gap-2">
                  <button type="button" onClick={handleForgot}
                    className="text-sm text-primary hover:underline focus:outline-none">
                    Resend OTP
                  </button>
                  <button type="button" onClick={() => setStep("login")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft className="h-4 w-4" /> Back to Sign In
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social section — hide on forgot/otp steps */}
          {(step === "login" || step === "signup") && (
            <>
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-4 text-muted-foreground uppercase tracking-wider text-xs font-semibold rounded-full border border-border">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="flex w-full items-center justify-center gap-2 h-12 rounded-xl border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors">
                    <Github className="h-5 w-5" /> Github
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {step === "login" ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => setStep(step === "login" ? "signup" : "login")}
                  className="ml-2 font-semibold text-primary hover:underline focus:outline-none">
                  {step === "login" ? "Sign up" : "Sign in"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
