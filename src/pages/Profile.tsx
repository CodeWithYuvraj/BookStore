import { useState } from "react"
import { User, Package, Settings, LogOut, ChevronRight, Edit3, Shield, Mail, Smartphone, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"

const ORDERS = [
  { id: "#BKV-9842", date: "Oct 12, 2023", total: 101.51, status: "Delivered", items: 2 },
  { id: "#BKV-8211", date: "Sep 28, 2023", total: 45.00, status: "Processing", items: 1 },
]

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // If user isn't populated yet, we can render nothing or a spinner
  // Since we don't have a strict router guard for profile in this demo, let's safe-check
  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <Shield className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">Please sign in to view your profile</p>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-72 shrink-0"
        >
          <div className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-sm mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-4 ring-background">
                {user.email.substring(0, 1).toUpperCase()}
              </div>
              <div className="flex-1 truncate">
                <h3 className="font-bold text-foreground text-lg truncate">Demo User</h3>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1.5 relative z-10">
              {[
                { id: "profile", label: "Profile Details", icon: User },
                { id: "orders", label: "Order History", icon: Package },
                { id: "preferences", label: "Preferences", icon: Settings },
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "opacity-100" : "opacity-70"}`} /> 
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full h-12 rounded-xl text-destructive border-border hover:bg-destructive hover:text-white transition-all shadow-sm"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-10 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Personal Information</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Manage your personal details and contact info.</p>
                  </div>
                  <Button variant="outline" className="hidden sm:flex rounded-full px-6 shadow-sm"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <div className="space-y-6">
                     <div className="group">
                       <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
                         <User className="h-3.5 w-3.5" /> Full Name
                       </label>
                       <div className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">Demo User</div>
                     </div>
                     <div className="group">
                       <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
                         <Mail className="h-3.5 w-3.5" /> Email Address
                       </label>
                       <div className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{user.email}</div>
                     </div>
                   </div>
                   <div className="space-y-6">
                     <div className="group">
                       <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
                         <Smartphone className="h-3.5 w-3.5" /> Phone Number
                       </label>
                       <div className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">+1 (555) 000-0000</div>
                     </div>
                     <div className="group">
                       <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
                         <MapPin className="h-3.5 w-3.5" /> Location
                       </label>
                       <div className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">San Francisco, CA</div>
                     </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-border/50">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
                    <Shield className="h-5 w-5 text-indigo-500" /> Security
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-background/50 border border-border rounded-2xl">
                     <div className="mb-4 sm:mb-0">
                       <h4 className="font-semibold text-foreground text-base">Password</h4>
                       <p className="text-sm text-muted-foreground mt-0.5">Last changed 3 months ago</p>
                     </div>
                     <Button variant="outline" className="rounded-xl border-border/80 shadow-sm shrink-0">Change Password</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
               <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-10 shadow-sm relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                  <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">Order History</h2>
                  <p className="text-muted-foreground mb-10 text-sm">Review your past purchases and track deliveries.</p>
                  
                  <div className="space-y-4">
                    {ORDERS.map((order) => (
                      <div key={order.id} className="group bg-background/30 border border-border/60 rounded-2xl p-5 sm:p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary transition-colors" />
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-lg font-extrabold text-foreground tracking-tight">{order.id}</span>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                order.status === 'Delivered' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-amber-500/10 text-amber-500'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">{order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}</div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto">
                             <div className="text-left sm:text-right">
                               <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Total</div>
                               <div className="text-xl font-bold text-foreground">${order.total.toFixed(2)}</div>
                             </div>
                             <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                               <ChevronRight className="h-5 w-5" />
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </motion.div>
            )}

            {activeTab === "preferences" && (
              <motion.div 
                key="preferences"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-10 shadow-sm relative overflow-hidden"
               >
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                 <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">Preferences</h2>
                 <p className="text-muted-foreground mb-10 text-sm">Customize how BookVerse communicates with you.</p>
                 
                 <div className="space-y-6">
                   <div className="flex items-start sm:items-center justify-between p-5 bg-background/50 border border-border rounded-2xl gap-4">
                     <div>
                       <h4 className="font-semibold text-foreground text-base">Email Notifications</h4>
                       <p className="text-sm text-muted-foreground mt-0.5 max-w-sm">Receive updates about new releases, author events, and your promotional offers.</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1 sm:mt-0">
                       <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                       <div className="w-12 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                     </label>
                   </div>
                   
                   <div className="flex items-start sm:items-center justify-between p-5 bg-background/50 border border-border rounded-2xl gap-4">
                     <div>
                       <h4 className="font-semibold text-foreground text-base">Order Updates (SMS)</h4>
                       <p className="text-sm text-muted-foreground mt-0.5 max-w-sm">Receive urgent real-time SMS notifications for order delivery status updates.</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1 sm:mt-0">
                       <input type="checkbox" value="" className="sr-only peer" />
                       <div className="w-12 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                     </label>
                   </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
