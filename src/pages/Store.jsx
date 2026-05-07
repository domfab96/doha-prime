import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'

const categories = ['All', 'Live Fish', 'Processed', 'Fingerlings']

export default function Store() {
  const { products } = useStore()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="pt-20">
      <section className="bg-forest-900 py-16">
        <div className="section-container text-center text-white">
          <span className="badge-earth mb-4">Farm Fresh</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">Doha Prime Store</h1>
          <p className="text-forest-300 mt-4 max-w-xl mx-auto">
            Order directly from the farm. All produce is fresh, traceable, and priced fairly.
          </p>
        </div>
      </section>

      <div className="bg-earth-50 border-y border-earth-200 py-3">
        <div className="section-container text-center text-earth-700 text-sm font-medium">
          🚚 &nbsp;Delivery available within Abuja (FCT) · Minimum order ₦20,000 · WhatsApp for bulk orders
        </div>
      </div>

      <section className="section-pad bg-cream">
        <div className="section-container">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === cat
                    ? 'bg-forest-700 text-white shadow-sm'
                    : 'bg-white border border-forest-200 text-forest-700 hover:border-forest-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-forest-400">
              <span className="text-4xl block mb-3">🔍</span>
              <p>No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-forest-700 py-14">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-serif text-2xl font-bold mb-1">Bulk & Wholesale Orders</h2>
            <p className="text-forest-200 text-sm">Restaurants, supermarkets, and hotels — contact us for volume pricing.</p>
          </div>
          <a
            href="https://wa.me/2340000000000?text=Hi%20Doha%20Prime%2C%20I'm%20interested%20in%20bulk%20orders"
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp text-base px-7 py-3 flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.998 2C6.477 2 2 6.477 2 12c0 1.934.53 3.74 1.446 5.29L2 22l4.78-1.423A9.962 9.962 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 11.998 2zm.002 18c-1.618 0-3.127-.438-4.422-1.2l-.316-.188-3.283.977.936-3.213-.208-.329A7.966 7.966 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8 8z"/>
            </svg>
            WhatsApp for Bulk Orders
          </a>
        </div>
      </section>
    </div>
  )
}
