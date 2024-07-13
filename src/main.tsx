// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'
import { ProductsProvider } from './context/ProductsProvider'
import { CartProvider } from './context/CartProvider.tsx'
import { WishlistProvider } from './context/WishlistProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  // </React.StrictMode>,
)
