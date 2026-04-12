import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Upload, DollarSign, TrendingUp, BookOpen, Users, Package, UploadCloud, X, Plus } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useToast } from "../context/ToastContext"

const STATS = [
  { label: "Total Revenue", value: "$12,450.00", change: "+14.5%", isPositive: true, icon: DollarSign },
  { label: "Books Sold", value: "845", change: "+5.2%", isPositive: true, icon: TrendingUp },
  { label: "Active Listings", value: "112", change: "+12", isPositive: true, icon: BookOpen },
  { label: "Profile Views", value: "15.2K", change: "-2.1%", isPositive: false, icon: Users },
]

export const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState<"analytics" | "upload">("analytics")

  // Book Upload State
  const [isDragging, setIsDragging] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [synopsis, setSynopsis] = useState("")

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const getInputStateClass = (val: string) => {
    if (hasAttemptedSubmit && !val.trim()) return "border-red-500 focus:ring-red-500"
    if (val.trim()) return "border-green-500 focus:ring-green-500"
    return "border-input focus:ring-violet-500"
  }

  const { addToast } = useToast()

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)
    if (!title.trim() || !author.trim() || !price || !category || !synopsis.trim()) {
      addToast("Please fill in all book details", "error")
      return
    }
    if (!previewImage) {
      addToast("Please upload a book cover image", "error")
      return
    }
    addToast("Book Published Successfully!", "success")
    setTitle("")
    setAuthor("")
    setPrice("")
    setCategory("")
    setSynopsis("")
    setPreviewImage(null)
    setHasAttemptedSubmit(false)
    setActiveTab("analytics")
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage your inventory and track your success.</p>
          </div>
          
          <div className="flex bg-card p-1.5 rounded-xl border border-border shadow-sm w-fit">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "analytics" ? "bg-violet-600 text-white shadow-md" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "upload" ? "bg-violet-600 text-white shadow-md" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload className="w-4 h-4" /> Upload Book
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    key={stat.label} 
                    className="bg-card p-6 rounded-2xl border border-border shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-violet-500/10 rounded-xl">
                        <stat.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${stat.isPositive ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">{stat.value}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Graph */}
                <div className="lg:col-span-2 bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-foreground">Revenue Overview</h3>
                    <select className="bg-background border border-input rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-500">
                      <option>Last 30 Days</option>
                      <option>This Year</option>
                      <option>All Time</option>
                    </select>
                  </div>
                  {/* Custom CSS Chart Graphic */}
                  <div className="h-64 w-full flex items-end gap-2 sm:gap-4 relative group">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-border/50" />)}
                    </div>
                    {/* Bars */}
                    {[40, 65, 45, 80, 55, 95, 75, 40, 65, 85, 60, 100].map((h, i) => (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-violet-600/40 to-violet-500 dark:from-violet-500/40 dark:to-violet-400 rounded-t-lg relative hover:brightness-110 transition-all cursor-crosshair"
                      >
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ${h * 12}
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Top Selling Books List */}
                <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-6">Top Performers</h3>
                  <div className="space-y-4 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-16 bg-muted rounded border border-border shrink-0 bg-[url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=100')] bg-cover bg-center" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm line-clamp-1">The Midnight Library</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">142 Sales</p>
                        </div>
                        <div className="ml-auto font-bold text-green-500 text-sm">
                          +$2,140
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card rounded-3xl border border-border shadow-sm p-6 md:p-10 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8">Add New Book to Catalog</h2>
                
                <form className="space-y-8" onSubmit={handleUploadSubmit} noValidate>
                  
                  {/* File Upload Dropzone */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Book Cover Image</label>
                    {previewImage ? (
                      <div className="relative w-48 h-64 mx-auto md:mx-0 group rounded-xl overflow-hidden shadow-lg border border-border">
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => setPreviewImage(null)} className="bg-destructive text-white p-2 rounded-full hover:scale-110 transition-transform">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault(); setIsDragging(false)
                          if (e.dataTransfer.files?.[0]?.type.startsWith("image/")) {
                            setPreviewImage(URL.createObjectURL(e.dataTransfer.files[0]))
                          }
                        }}
                        className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 transition-all ${isDragging ? "border-violet-500 bg-violet-500/5 scale-[1.01]" : "border-border hover:border-violet-500/50 hover:bg-muted/30"}`}
                      >
                        <input 
                          type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer hidden" id="file-upload"
                          onChange={(e) => {
                            if (e.target.files?.[0]) setPreviewImage(URL.createObjectURL(e.target.files[0]))
                          }}
                        />
                        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                          <div className={`w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-4 transition-transform ${isDragging ? "scale-110" : ""}`}>
                            <UploadCloud className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                          </div>
                          <p className="text-foreground font-semibold">Drop your high-res cover here</p>
                          <p className="text-muted-foreground text-sm mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Form Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Book Title</label>
                      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Art of Coding" className={`w-full bg-background border ${getInputStateClass(title)} rounded-xl px-4 py-3 outline-none focus:ring-2`} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Author Name</label>
                      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="e.g. Jane Doe" className={`w-full bg-background border ${getInputStateClass(author)} rounded-xl px-4 py-3 outline-none focus:ring-2`} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Price ($)</label>
                      <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="24.99" className={`w-full bg-background border ${getInputStateClass(price.toString())} rounded-xl px-4 py-3 outline-none focus:ring-2`} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                      <select value={category} onChange={e => setCategory(e.target.value)} className={`w-full bg-background border ${getInputStateClass(category)} rounded-xl px-4 py-3 outline-none focus:ring-2 text-foreground`}>
                        <option value="">Select Category</option>
                        <option>Fiction</option>
                        <option>Non-Fiction</option>
                        <option>Science</option>
                        <option>Design</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Synopsis / Description</label>
                    <textarea value={synopsis} onChange={e => setSynopsis(e.target.value)} placeholder="Write a compelling overview of the book..." className={`w-full h-32 bg-background border ${getInputStateClass(synopsis)} rounded-xl px-4 py-3 outline-none focus:ring-2 resize-none`} />
                  </div>

                  <div className="pt-6 border-t border-border flex justify-end">
                    <Button type="submit" className="gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 text-base">
                      <Plus className="w-5 h-5" /> Publish to Marketplace
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
