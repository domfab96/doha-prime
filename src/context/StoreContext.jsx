import { createContext, useContext, useState, useCallback } from 'react'

const INITIAL_PRODUCTS = [
  { id:1, name:'Premium Hybrid Catfish (Live)', price:4500, unit:'kg',    badge:'Bestseller', description:'Live hybrid Clarias gariepinus, market size 0.8–1.2 kg. Harvested fresh from our Abuja ponds. Minimum order: 5 kg.', inStock:true,  category:'Live Fish',   image:'/images/product_catfish_live.jpg' },
  { id:2, name:'Smoked Catfish (Whole)',         price:7800, unit:'kg',    badge:'Processed',  description:'Traditionally wood-smoked catfish. Long shelf life, rich flavour. Vacuum-sealed for freshness. Great for stews and soups.', inStock:true,  category:'Processed',   image:'/images/product_smoked_whole.png' },
  { id:3, name:'Tilapia (Live)',                 price:3800, unit:'kg',    badge:'New',        description:'Oreochromis niloticus — fresh, pond-raised tilapia. Mild, versatile white fish perfect for grilling or frying.', inStock:true,  category:'Live Fish',   image:null },
  { id:4, name:'Catfish Fingerlings',            price:80,   unit:'piece', badge:'B2B',        description:'Quality hybrid catfish fingerlings (4–6 cm) for restocking. Healthy, disease-free stock from our broodstock pens.', inStock:true,  category:'Fingerlings', image:'/images/product_fingerlings.jpg' },
  { id:5, name:'Dried Catfish (Pieces)',         price:5500, unit:'kg',    badge:null,         description:'Sun-dried and oven-finished catfish pieces. Ideal for soups, stews, and long-distance shipping.', inStock:false, category:'Processed',   image:'/images/product_smoked_pieces.jpg' },
  { id:6, name:'Live Tilapia (Jumbo)',           price:5200, unit:'kg',    badge:'Limited',    description:'Extra-large tilapia (1.5–2 kg each). Perfect for events and catering. Pre-order required 48 hours in advance.', inStock:true,  category:'Live Fish',   image:null },
]

function loadProducts() {
  try {
    const s = localStorage.getItem('dpv_products')
    if (s) {
      const parsed = JSON.parse(s)
      // Merge: preserve images from code for original products
      return parsed.map(p => {
        const orig = INITIAL_PRODUCTS.find(x => x.id === p.id)
        return orig ? { ...orig, price: p.price, inStock: p.inStock, image: p.image ?? orig.image } : p
      })
    }
  } catch {}
  return INITIAL_PRODUCTS
}
function saveProducts(p) { try { localStorage.setItem('dpv_products', JSON.stringify(p)) } catch {} }

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(loadProducts)

  const saveProduct = useCallback((updated) => {
    setProducts(prev => { const next = prev.map(p => p.id === updated.id ? { ...p, ...updated } : p); saveProducts(next); return next })
  }, [])

  const addProduct = useCallback((product) => {
    setProducts(prev => { const next = [...prev, { ...product, id: Date.now() }]; saveProducts(next); return next })
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts(prev => { const next = prev.filter(p => p.id !== id); saveProducts(next); return next })
  }, [])

  const resetProducts = useCallback(() => { setProducts(INITIAL_PRODUCTS); saveProducts(INITIAL_PRODUCTS) }, [])

  return (
    <StoreContext.Provider value={{ products, saveProduct, addProduct, deleteProduct, resetProducts }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
