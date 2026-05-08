import { useCart } from '../context/CartContext'

export default function FloatingCart() {
  const { count, total, setOpen } = useCart()

  if (count === 0) return null

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-30 bg-forest-700 hover:bg-forest-800
                 text-white rounded-2xl shadow-2xl px-5 py-3.5
                 flex items-center gap-3 transition-all duration-200
                 active:scale-95 hover:shadow-forest-900/30"
    >
      {/* Cart icon */}
      <div className="relative">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {/* Badge */}
        <span className="absolute -top-2 -right-2 bg-earth-500 text-white text-xs font-bold
                         w-5 h-5 rounded-full flex items-center justify-center font-sans">
          {count}
        </span>
      </div>

      <div className="text-left">
        <p className="font-sans text-xs text-white/70 leading-none">{count} item{count !== 1 ? 's' : ''}</p>
        <p className="font-serif font-bold text-base leading-tight">
          ₦{Number(total).toLocaleString('en-NG')}
        </p>
      </div>

      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}
