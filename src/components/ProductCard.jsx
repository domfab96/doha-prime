import PhotoPlaceholder from './PhotoPlaceholder'

const WHATSAPP_NUMBER = '2347083316383' // ← Replace with your number

export default function ProductCard({ id, name, price, unit, badge, description, inStock = true, image }) {
  const message = encodeURIComponent(`Hi! I'd like to order: ${name} @ ₦${price}/${unit}`)
  const waLink  = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <div className="card group flex flex-col">
      {/* Product image */}
      <div className="relative overflow-hidden h-48">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <PhotoPlaceholder label={`Product: ${name}`} height="h-48" icon="🐟" />
        )}
        {/* Stock badge */}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow
          ${inStock ? 'bg-forest-600 text-white' : 'bg-red-500 text-white'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        {badge && (
          <span className="absolute top-3 left-3 badge-earth">{badge}</span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-forest-900 font-semibold text-lg leading-tight mb-1">{name}</h3>
        {description && (
          <p className="text-forest-600 text-sm mb-3 flex-1">{description}</p>
        )}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-forest-100">
          <div>
            <span className="text-earth-600 font-bold text-xl">₦{price.toLocaleString()}</span>
            <span className="text-forest-500 text-xs ml-1">/ {unit}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button disabled={!inStock} className="btn-primary flex-1 text-sm py-2.5 disabled:opacity-40 disabled:cursor-not-allowed">
            Add to Cart
          </button>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.998 2C6.477 2 2 6.477 2 12c0 1.934.53 3.74 1.446 5.29L2 22l4.78-1.423A9.962 9.962 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 11.998 2zm.002 18c-1.618 0-3.127-.438-4.422-1.2l-.316-.188-3.283.977.936-3.213-.208-.329A7.966 7.966 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8 8z"/>
            </svg>
            Buy
          </a>
        </div>
      </div>
    </div>
  )
}
