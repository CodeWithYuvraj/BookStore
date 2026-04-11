import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <App />
              </ThemeProvider>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
