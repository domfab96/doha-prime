import { useCart } from '../context/CartContext'

const WHATSAPP = '2348000000000' // ← Replace with your number

function fmt(n) { return `₦${Number(n).toLocaleString('en-NG')}` }

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, total, count, open, setOpen } = useCart()

  // Build WhatsApp message
  const handleCheckout = () => {
    if (items.length === 0) return
    const lines = items.map(i =>
      `• ${i.name} x${i.qty} @ ${fmt(i.price)}/${i.unit} = ${fmt(i.price * i.qty)}`
    ).join('\n')
    const msg = encodeURIComponent(
      `Hello Doha Prime Ventures! 🌿\n\nI'd like to order:\n\n${lines}\n\n*Total: ${fmt(total)}*\n\nPlease confirm availability and payment details. Thank you!`
    )
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-forest-100 bg-forest-700">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="font-serif text-white text-lg font-bold">
              Your Cart {count > 0 && <span className="text-earth-300">({count})</span>}
            </h2>
          </div>
          <button onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white text-2xl leading-none transition-colors">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <span className="text-6xl">🛒</span>
              <p className="font-serif text-xl text-forest-800 font-bold">Your cart is empty</p>
              <p className="text-forest-500 text-sm font-sans">Add products from our store to get started.</p>
              <button onClick={() => setOpen(false)}
                className="btn-primary font-sans mt-2">Browse Store</button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id}
                  className="flex gap-3 bg-cream rounded-xl p-3 border border-forest-100">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-forest-100">
                    {item.image
                      ? <img src={item.image} alt={item.name}
                          className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-2xl">🐟</div>}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-semibold text-forest-900 text-sm leading-tight truncate">
                      {item.name}
                    </p>
                    <p className="text-earth-600 font-bold text-sm font-sans mt-0.5">
                      {fmt(item.price)}<span className="text-forest-400 font-normal text-xs">/{item.unit}</span>
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-full bg-forest-100 hover:bg-forest-200 text-forest-800
                                   flex items-center justify-center font-bold text-lg transition-colors leading-none">
                        −
                      </button>
                      <span className="font-sans font-bold text-forest-900 w-6 text-center text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-full bg-forest-100 hover:bg-forest-200 text-forest-800
                                   flex items-center justify-center font-bold text-lg transition-colors leading-none">
                        +
                      </button>
                      <span className="text-forest-400 text-xs font-sans ml-1">
                        = {fmt(item.price * item.qty)}
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 self-start pt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Clear cart */}
              <button onClick={() => { if(confirm('Clear all items from cart?')) clearCart() }}
                className="text-xs text-red-400 hover:text-red-600 font-sans underline w-full text-center py-1 transition-colors">
                Clear cart
              </button>
            </>
          )}
        </div>

        {/* Footer — total + checkout */}
        {items.length > 0 && (
          <div className="border-t border-forest-100 px-5 py-5 bg-white space-y-4">
            {/* Order summary */}
            <div className="space-y-1.5">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-xs text-forest-500 font-sans">
                  <span className="truncate mr-2">{i.name} ×{i.qty}</span>
                  <span className="flex-shrink-0">{fmt(i.price * i.qty)}</span>
                </div>
              ))}
              <div className="border-t border-forest-100 pt-2 flex justify-between items-center">
                <span className="font-sans font-bold text-forest-900">Total</span>
                <span className="font-serif font-bold text-xl text-earth-600">{fmt(total)}</span>
              </div>
            </div>

            {/* WhatsApp checkout */}
            <button onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#1ebe57] active:scale-95 text-white font-bold
                         py-4 rounded-xl transition-all duration-200 flex items-center justify-center
                         gap-3 font-sans text-base shadow-lg">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.998 2C6.477 2 2 6.477 2 12c0 1.934.53 3.74 1.446 5.29L2 22l4.78-1.423A9.962 9.962 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 11.998 2zm.002 18c-1.618 0-3.127-.438-4.422-1.2l-.316-.188-3.283.977.936-3.213-.208-.329A7.966 7.966 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8 8z"/>
              </svg>
              Checkout via WhatsApp
            </button>
            <p className="text-center text-xs text-forest-400 font-sans">
              Your order will be sent to our WhatsApp. We'll confirm and share payment details.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
