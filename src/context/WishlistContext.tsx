import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useToast } from "./ToastContext"
import { useCart } from "./CartContext"

interface WishlistItem {
  id: string
  title: string
  author: string
  price: number
  coverUrl: string
  category: string
  rating: number
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: WishlistItem) => void
  isWishlisted: (id: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const STORAGE_KEY = "bookverse_wishlist"

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const { addToast } = useToast()
  const { addItem: addToCart } = useCart()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item: WishlistItem) => {
    setItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev
      return [...prev, item]
    })
    addToast(`"${item.title}" added to wishlist ❤️`, "success")
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const toggleItem = (item: WishlistItem) => {
    if (items.find(i => i.id === item.id)) {
      removeItem(item.id)
      addToast(`Removed from wishlist`, "info")
    } else {
      addItem(item)
    }
  }

  const isWishlisted = (id: string) => items.some(i => i.id === id)

  const count = items.length

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isWishlisted, count }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within WishlistProvider")
  return context
}
