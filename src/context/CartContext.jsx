import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

const load = () => { try { const s = localStorage.getItem('dpv_cart'); return s ? JSON.parse(s) : [] } catch { return [] } }
const save = (c) => { try { localStorage.setItem('dpv_cart', JSON.stringify(c)) } catch {} }

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open,  setOpen]  = useState(false)

  const addItem = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      const next = exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { id: product.id, name: product.name, price: product.price, unit: product.unit, image: product.image, qty: 1 }]
      save(next)
      return next
    })
    setOpen(true)
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => { const next = prev.filter(i => i.id !== id); save(next); return next })
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => { const next = prev.map(i => i.id === id ? { ...i, qty } : i); save(next); return next })
  }, [removeItem])

  const clearCart = useCallback(() => { setItems([]); save([]) }, [])

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
