import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Grid, List, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react"
import { BookCard } from "../components/ui/BookCard"
import { Button } from "../components/ui/Button"
import { Skeleton } from "../components/ui/Skeleton"
import { useSearchParams } from "react-router-dom"

// Shared book data
const BOOK_COVERS = [
  "1544947950-fa07a98d237f",
  "1512820790803-83ca734da794",
  "1589829085413-56de8ae18c73",
  "1481627834876-b7833e8f5570",
  "1495446815901-a7297e633e8d",
  "1524578271613-d550eacf6090",
  "1457369804613-52c61a468e7d"
]

const CATEGORY_LIST = ["Fiction", "Design", "Programming", "Science", "History", "Psychology", "Technology", "Self-Help", "Fantasy", "Romance", "Non-Fiction"]

const ALL_BOOKS = Array.from({ length: 82 }).map((_, i) => ({
  id: `book-${i}`,
  title: `The Art of ${["Programming", "Design", "Writing", "Thinking", "Leadership", "Creative Coding", "Science", "History"][i % 8]}`,
  author: ["Don Norman", "Robert C. Martin", "Martin Fowler", "Kent Beck", "Linus Torvalds", "Jane Austen"][i % 6],
  price: 15 + (i * 1.5),
  rating: parseFloat((4 + Math.random()).toPrecision(2)),
  category: CATEGORY_LIST[i % CATEGORY_LIST.length],
  coverUrl: `https://images.unsplash.com/photo-${BOOK_COVERS[i % BOOK_COVERS.length]}?auto=format&fit=crop&q=80&w=400`,
  language: i % 2 === 0 ? "English" : "Spanish"
}))

export const BookListing = () => {
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get("q") ?? ""
  const urlCategory = searchParams.get("category") ?? ""

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [debouncedSearch, setDebouncedSearch] = useState(urlQuery)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategory ? [urlCategory] : [])
  const [sortBy, setSortBy] = useState("popular")
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 28

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1)
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 600)
    }, 400)
    return () => clearTimeout(handler)
  }, [searchQuery])

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const filteredBooks = ALL_BOOKS.filter(b => {
    const matchesSearch = !debouncedSearch ||
      b.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(b.category)
    return matchesSearch && matchesCategory
  })

  // Pagination Logic
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE)
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">All Books</h1>
          <p className="text-muted-foreground mt-1">Showing {filteredBooks.length} results</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search books, authors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex bg-muted rounded-lg p-1">
            <button 
              onClick={() => setViewType("grid")}
              className={`p-2 rounded-md transition-colors ${viewType === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`p-2 rounded-md transition-colors ${viewType === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 appearance-none rounded-lg border border-input bg-background pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>

          <Button 
            variant="outline" 
            className="md:hidden flex items-center gap-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Filters */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border p-6 shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:z-0 md:w-64 md:bg-transparent md:border-none md:p-0 md:shadow-none shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="text-xl font-bold flex items-center gap-2"><SlidersHorizontal className="h-5 w-5"/> Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-2 font-bold text-lg mb-6 pb-2 border-b border-border">
            <SlidersHorizontal className="h-5 w-5 text-primary" /> Filters
          </div>

          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-100px)] md:max-h-none md:overflow-visible pr-2">
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Categories</h3>
              {selectedCategories.length > 0 && (
                <button onClick={() => setSelectedCategories([])} className="text-xs text-primary hover:underline mb-2 block">Clear filters</button>
              )}
              <div className="space-y-2">
                {CATEGORY_LIST.map(cat => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-input text-primary focus:ring-primary h-4 w-4 transition-colors"
                    />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
              <div className="space-y-4">
                <input type="range" min="0" max="100" className="w-full accent-primary" />
                <div className="flex items-center justify-between">
                  <div className="border border-input rounded p-2 text-sm w-20 text-center bg-card">$0</div>
                  <span className="text-muted-foreground">-</span>
                  <div className="border border-input rounded p-2 text-sm w-20 text-center bg-card">$100</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(stars => (
                  <label key={stars} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" name="rating" className="rounded-full border-input text-primary focus:ring-primary h-4 w-4 transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{stars} Stars & Up</span>
                  </label>
                ))}
              </div>
            </div>
            
             <Button variant="default" className="w-full md:hidden" onClick={() => setIsSidebarOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Main Book Grid */}
        <div className="flex-1 w-full">
          {isLoading ? (
            <div className={viewType === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-6"}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`bg-card rounded-2xl border border-border p-4 ${viewType === 'list' ? 'flex flex-col sm:flex-row gap-6' : 'flex flex-col'}`}>
                  <Skeleton className={viewType === 'list' ? "w-32 h-44 rounded-xl" : "w-full aspect-[2/3] rounded-xl"} />
                  <div className={`mt-4 ${viewType === 'list' ? 'flex-1 mt-0 justify-center flex flex-col' : ''}`}>
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    {viewType === 'list' && <Skeleton className="h-10 w-full max-w-sm mb-4" />}
                    <div className="mt-auto flex justify-between">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className={
              viewType === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "flex flex-col gap-6"
            }>
              {paginatedBooks.map((book) => (
                <div key={book.id} className={viewType === "list" ? "w-full" : ""}>
                   {viewType === "grid" ? (
                     <BookCard {...book} rating={Number(book.rating)} />
                   ) : (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="flex flex-col sm:flex-row gap-6 bg-card p-4 rounded-2xl border border-border hover:shadow-md transition-shadow"
                     >
                       <img src={book.coverUrl} className="w-32 h-44 object-cover rounded-xl" alt={book.title} />
                       <div className="flex-1 flex flex-col justify-center">
                         <div className="text-sm text-primary mb-1">{book.category}</div>
                         <h3 className="text-xl font-bold text-foreground mb-1">{book.title}</h3>
                         <p className="text-muted-foreground mb-4">{book.author}</p>
                         <p className="text-sm text-muted-foreground line-clamp-2 md:max-w-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget...
                         </p>
                         <div className="mt-auto pt-4 flex items-center justify-between max-w-sm">
                           <span className="text-2xl font-bold">${book.price.toFixed(2)}</span>
                           <Button size="sm">Add to Cart</Button>
                         </div>
                       </div>
                     </motion.div>
                   )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-semibold text-foreground">No books found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex gap-1 overflow-x-auto max-w-full no-scrollbar pb-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button 
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm" 
                    className="w-8 shrink-0"
                    onClick={() => {
                      setCurrentPage(i + 1)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
