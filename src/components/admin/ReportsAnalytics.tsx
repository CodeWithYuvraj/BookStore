import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react"
import { Button } from "../ui/Button"

const STATS = [
  { label: "Total Revenue", value: "$124,592.00", trend: "+12.5%", isUp: true, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Total Orders", value: "3,842", trend: "+8.2%", isUp: true, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Avg. Order Value", value: "$32.42", trend: "-1.5%", isUp: false, icon: BarChart3, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Active Customers", value: "1,204", trend: "+24%", isUp: true, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
]

export const ReportsAnalytics = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
          <p className="text-muted-foreground text-sm">Deep dive into platform performance and sales trends.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl gap-2 h-10 text-sm"><Calendar className="h-4 w-4" /> Last 30 Days</Button>
           <Button className="rounded-xl h-10 text-sm">Download Full Report</Button>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-6 rounded-3xl shadow-sm relative overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <h3 className="text-2xl font-black text-foreground">{stat.value}</h3>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend} <span className="text-muted-foreground font-normal">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Sales Chart Simulated */}
        <div className="lg:col-span-2 bg-card border border-border rounded-[40px] p-8 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-foreground">Revenue Over Time</h3>
              <div className="flex gap-2">
                 {["Day", "Week", "Month"].map(t => (
                   <button key={t} className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${t === 'Month' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{t}</button>
                 ))}
              </div>
           </div>
           
           <div className="h-64 flex items-end gap-3 px-4 relative">
              {/* Fake Chart Bars */}
              {[40, 60, 45, 90, 120, 80, 50, 70, 110, 95, 60, 130].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-primary/80 to-primary rounded-t-lg group relative"
                >
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${(h * 100).toLocaleString()}
                   </div>
                </motion.div>
              ))}
              <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                 <span>Jan</span>
                 <span>Jun</span>
                 <span>Dec</span>
              </div>
           </div>
        </div>

        {/* Categories Pie Chart Simulated */}
        <div className="bg-card border border-border rounded-[40px] p-8 shadow-sm flex flex-col">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-foreground">Category Share</h3>
              <PieChart className="h-5 w-5 text-muted-foreground" />
           </div>

           <div className="flex-1 flex flex-col justify-center">
              <div className="relative aspect-square w-48 mx-auto mb-8">
                 <svg viewBox="0 0 32 32" className="w-full h-full transform -rotate-90">
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-primary" strokeDasharray="65 100" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-blue-500" strokeDasharray="25 100" strokeDashoffset="-65" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-amber-500" strokeDasharray="10 100" strokeDashoffset="-90" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-black text-foreground">10K</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sales</span>
                 </div>
              </div>

              <div className="space-y-4">
                 {[
                   { label: "Fiction", color: "bg-primary", value: "65%" },
                   { label: "Technology", color: "bg-blue-500", value: "25%" },
                   { label: "Others", color: "bg-amber-500", value: "10%" },
                 ].map(item => (
                   <div key={item.label} className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                     </div>
                     <span className="text-sm font-bold">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
