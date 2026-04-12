import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart3, 
  Users, 
  Package, 
  Tag, 
  Settings, 
  Bell, 
  Search,
  ChevronRight,
  LogOut,
  Shield,
  Zap
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { InventoryManager } from "../components/admin/InventoryManager"
import { UserManager } from "../components/admin/UserManager"
import { OrderManager } from "../components/admin/OrderManager"
import { PromotionsManager } from "../components/admin/PromotionsManager"
import { ReportsAnalytics } from "../components/admin/ReportsAnalytics"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"

type AdminTab = "overview" | "inventory" | "users" | "orders" | "promotions" | "settings"

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview")
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const MENU_ITEMS = [
    { id: "overview", label: "Analytics", icon: BarChart3 },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "users", label: "User Accounts", icon: Users },
    { id: "orders", label: "Manage Orders", icon: ShoppingBag },
    { id: "promotions", label: "Promo Codes", icon: Tag },
    { id: "settings", label: "Admin Settings", icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    navigate("/")
  }


  return (
    <div className="min-h-screen bg-background flex overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9089fc] to-[#ff80b5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-card/40 backdrop-blur-3xl border-r border-border/50 hidden lg:flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="p-8 pb-10">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="flex items-center gap-4 mb-12 group cursor-pointer"
           >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                 <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-foreground tracking-tighter leading-none">Admin<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Portal</span></h1>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground mt-1">Command Center</p>
              </div>
           </motion.div>

           <nav className="space-y-2">
              {MENU_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 relative group overflow-hidden ${
                    activeTab === item.id 
                      ? "bg-foreground text-background shadow-xl scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="sidebar-active" 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10" 
                    />
                  )}
                  <item.icon className={`h-5 w-5 relative z-10 ${activeTab === item.id ? "text-background" : "text-muted-foreground group-hover:text-indigo-500 transition-colors"}`} />
                  <span className="relative z-10">{item.label}</span>
                  
                  {activeTab !== item.id && (
                    <ChevronRight className={`absolute right-4 h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-indigo-500`} />
                  )}
                  {activeTab === item.id && (
                     <div className="absolute right-4 w-2 h-2 rounded-full bg-background animate-pulse" />
                  )}
                </motion.button>
              ))}
           </nav>
        </div>

        <div className="mt-auto p-6 pt-0">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="relative p-5 bg-gradient-to-b from-muted/50 to-muted/10 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden group"
           >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="h-20 w-20 text-indigo-500" />
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    AD
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">Super Admin</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground truncate">{user?.email || 'admin@demo.com'}</p>
                 </div>
              </div>
              <Button onClick={handleLogout} variant="destructive" className="w-full h-11 rounded-xl text-xs gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                 <LogOut className="h-4 w-4" /> Terminate Session
              </Button>
           </motion.div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen relative flex flex-col">
        
        {/* Top Header */}
        <header className="h-24 bg-background/50 backdrop-blur-2xl border-b border-border/50 sticky top-0 z-40 px-8 lg:px-12 flex items-center justify-between">
           <motion.div 
             initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
             className="flex items-center gap-4 flex-1"
           >
              <div className="relative max-w-lg w-full hidden md:block group">
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                 <div className="relative flex items-center">
                   <Search className="absolute left-4 h-5 w-5 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                   <input 
                      type="text" 
                      placeholder="Search users, orders, or inventory..." 
                      className="w-full h-12 bg-muted/30 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:bg-background focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-muted-foreground/50"
                   />
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
             className="flex items-center gap-6"
           >
              <button className="h-12 w-12 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground hover:border-border hover:shadow-lg transition-all relative group">
                 <Bell className="h-5 w-5 group-hover:animate-swing" />
                 <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-[2px] border-background animate-pulse" />
              </button>
              
              <div className="h-10 w-px bg-border/50 mx-1 hidden sm:block" />
              
              <div className="text-right hidden sm:block">
                 <p className="text-sm font-black text-foreground uppercase tracking-widest">Network Status</p>
                 <div className="flex items-center justify-end gap-2 mt-0.5">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Secure & Active</p>
                 </div>
              </div>
           </motion.div>
        </header>

        {/* Dynamic Content Container */}
        <div className="p-6 sm:p-8 lg:p-12 max-w-screen-2xl mx-auto w-full flex-1 relative z-10">
           <AnimatePresence mode="wait">
              {mounted && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                  className="h-full"
                >
                  {activeTab === "overview" && <ReportsAnalytics />}
                  {activeTab === "inventory" && <InventoryManager />}
                  {activeTab === "users" && <UserManager />}
                  {activeTab === "orders" && <OrderManager />}
                  {activeTab === "promotions" && <PromotionsManager />}
                  {activeTab === "settings" && (
                     <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-16 sm:p-24 text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="mx-auto w-max mb-8 text-muted-foreground/20 group-hover:text-indigo-500/20 transition-colors duration-500"
                        >
                          <Settings className="h-32 w-32" />
                        </motion.div>
                        <h2 className="text-4xl font-black text-foreground mb-4 tracking-tight drop-shadow-sm relative z-10">System Configuration</h2>
                        <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto relative z-10">Advanced settings for global platform parameters, API endpoint management, and security protocols are currently locked in this demo environment.</p>
                        <Button className="mt-10 h-14 px-10 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all relative z-10">
                          Deploy Module Soon
                        </Button>
                     </div>
                  )}
                </motion.div>
              )}
           </AnimatePresence>
        </div>

      </main>
    </div>
  )
}

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
