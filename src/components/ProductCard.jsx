import { useCart } from '../context/CartContext'
import PhotoPlaceholder from './PhotoPlaceholder'

const WHATSAPP = '2348000000000' // ← Replace with your number

export default function ProductCard({ id, name, price, unit, badge, description, inStock = true, image }) {
  const { addItem, items, updateQty, removeItem } = useCart()

  const cartItem = items.find(i => i.id === id)
  const qty      = cartItem ? cartItem.qty : 0

  const waMsg  = encodeURIComponent(`Hi! I'd like to order: ${name} @ ₦${price}/${unit}`)
  const waLink = `https://wa.me/${WHATSAPP}?text=${waMsg}`

  return (
    <div className={`card group flex flex-col transition-all duration-200 ${!inStock ? 'opacity-70' : ''}`}>
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        {image
          ? <img src={image} alt={name}
              className={`w-full h-full object-cover transition-transform duration-500 ${inStock ? 'group-hover:scale-105' : ''}`} />
          : <PhotoPlaceholder label={`Product: ${name}`} height="h-48" icon="🐟" />
        }

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full font-sans tracking-wide">
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* In stock badge (top right) */}
        {inStock && (
          <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow font-sans">
            In Stock
          </span>
        )}

        {badge && inStock && (
          <span className="absolute top-3 left-3 badge-earth font-sans">{badge}</span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-forest-900 font-semibold text-lg leading-tight mb-1">{name}</h3>
        {description && (
          <p className="text-forest-600 text-sm mb-3 flex-1 font-sans">{description}</p>
        )}

        <div className="flex items-end justify-between pt-3 border-t border-forest-100">
          <div>
            <span className="text-earth-600 font-bold text-xl font-serif">₦{price.toLocaleString()}</span>
            <span className="text-forest-500 text-xs ml-1 font-sans">/ {unit}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 space-y-2">
          {inStock ? (
            qty === 0 ? (
              /* Add to cart */
              <button
                onClick={() => addItem({ id, name, price, unit, image })}
                className="btn-primary w-full text-sm py-2.5 font-sans flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            ) : (
              /* Qty controls — shown after adding */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(id, qty - 1)}
                  className="w-9 h-9 rounded-lg bg-forest-100 hover:bg-forest-200 text-forest-900
                             font-bold text-lg transition-colors flex items-center justify-center">
                  −
                </button>
                <span className="flex-1 text-center font-bold text-forest-900 font-sans text-base">
                  {qty} in cart
                </span>
                <button
                  onClick={() => addItem({ id, name, price, unit, image })}
                  className="w-9 h-9 rounded-lg bg-forest-700 hover:bg-forest-800 text-white
                             font-bold text-lg transition-colors flex items-center justify-center">
                  +
                </button>
                <button
                  onClick={() => removeItem(id)}
                  className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-500
                             transition-colors flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )
          ) : (
            /* Out of stock state */
            <button disabled
              className="w-full bg-gray-100 text-gray-400 font-medium py-2.5 rounded-lg
                         cursor-not-allowed text-sm font-sans">
              Out of Stock
            </button>
          )}

          {/* WhatsApp direct order */}
          {inStock && (
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center text-sm font-sans">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.998 2C6.477 2 2 6.477 2 12c0 1.934.53 3.74 1.446 5.29L2 22l4.78-1.423A9.962 9.962 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 11.998 2zm.002 18c-1.618 0-3.127-.438-4.422-1.2l-.316-.188-3.283.977.936-3.213-.208-.329A7.966 7.966 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8 8z"/>
              </svg>
              Order via WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
