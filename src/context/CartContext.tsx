import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useToast } from "./ToastContext"

interface CartItem {
  id: string
  title: string
  author: string
  price: number
  coverUrl: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = "bookverse_cart"

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { addToast } = useToast()

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id)
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
    addToast(`Added "${newItem.title}" to cart 🛒`, "success")

    // Fly-to-cart animation
    const flyIcon = document.createElement("div")
    flyIcon.className = "fixed z-[60] h-8 w-8 rounded-full shadow-xl"
    flyIcon.style.backgroundImage = `url(${newItem.coverUrl})`
    flyIcon.style.backgroundSize = "cover"
    flyIcon.style.left = "50%"
    flyIcon.style.top = "50%"
    flyIcon.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
    document.body.appendChild(flyIcon)
    requestAnimationFrame(() => {
      flyIcon.style.left = "90%"
      flyIcon.style.top = "20px"
      flyIcon.style.transform = "scale(0.2) rotate(360deg)"
      flyIcon.style.opacity = "0.5"
    })
    setTimeout(() => { if (document.body.contains(flyIcon)) document.body.removeChild(flyIcon) }, 800)
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQ = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQ }
        }
        return item
      })
    )
  }

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
