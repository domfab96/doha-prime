import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

const WHATSAPP = '2348012345678'

const categories = ['All', 'Live Fish', 'Processed', 'Fingerlings']

const bulkTiers = [
  { label: 'Restaurant',   min: '20kg',  note: 'Weekly supply, delivery included',     icon: '🍽️' },
  { label: 'Hotel / Event',min: '50kg',  note: 'Priority harvest allocation',          icon: '🏨' },
  { label: 'Supermarket',  min: '100kg', note: 'Custom packaging + bulk discount',     icon: '🏪' },
  { label: 'Distributor',  min: '200kg', note: 'Negotiate direct farm-gate pricing',   icon: '🚛' },
]

function WhatsAppIcon({ cls = 'w-5 h-5 fill-current' }) {
  return (
    <svg viewBox="0 0 24 24" className={cls}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Store() {
  const { products } = useStore()
  const [activeCategory, setActiveCategory] = useState('All')
  const [notifyName,  setNotifyName]  = useState('')
  const [notifyPhone, setNotifyPhone] = useState('')
  const [notifySent,  setNotifySent]  = useState(false)

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  const refBulk    = useScrollReveal()
  const refSnack   = useScrollReveal()
  const refProcess = useScrollReveal()

  function handleSnackNotify(e) {
    e.preventDefault()
    if (!notifyName || !notifyPhone) return
    const msg = `Hi Doha Prime! I want to be notified when the Doha Prime Fish Snack launches.\n\nName: ${notifyName}\nPhone: ${notifyPhone}`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    setNotifySent(true)
  }

  function bulkEnquiry(tier) {
    const msg = `Hi Doha Prime Ventures! I'm interested in a *${tier.label} bulk order* (minimum ${tier.min}).\n\nPlease share your volume pricing and availability.`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="pt-20">

      {/* ── PAGE HERO ── */}
      <section className="bg-forest-900 py-16">
        <div className="section-container text-center text-white">
          <span className="badge-earth mb-4">Farm Fresh</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">Doha Prime Store</h1>
          <p className="text-forest-300 mt-4 max-w-xl mx-auto">
            Order directly from the farm. All produce is fresh, traceable, and priced fairly.
          </p>
        </div>
      </section>

      {/* ── DELIVERY BANNER ── */}
      <div className="bg-earth-50 border-y border-earth-200 py-3">
        <div className="section-container text-center text-earth-700 text-sm font-medium">
          🚚 &nbsp;Delivery within Abuja (FCT) · Minimum retail order ₦20,000 · Bulk orders via WhatsApp
        </div>
      </div>

      {/* ── RETAIL PRODUCTS ── */}
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
              <p className="font-sans">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── B2B WHOLESALE SECTION ── */}
      <section className="section-pad bg-forest-900">
        <div className="section-container">
          <div ref={refBulk} className="reveal">
            <div className="text-center mb-12">
              <span className="badge-earth mb-4 font-sans">Wholesale & Bulk</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                Supplying Abuja's Best Kitchens
              </h2>
              <p className="text-forest-300 max-w-2xl mx-auto font-sans text-sm leading-relaxed">
                Restaurants, hotels, caterers, supermarkets and event companies — we supply directly
                from the pond to your kitchen. Consistent quality, reliable volume, competitive
                farm-gate pricing. No middlemen.
              </p>
            </div>

            {/* Why buy wholesale */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon:'🐟', title:'Farm-gate pricing',    desc:'Cut out the market middlemen. Buy direct.' },
                { icon:'📦', title:'Consistent supply',    desc:'Pre-order your weekly or monthly allocation.' },
                { icon:'✅', title:'Quality guaranteed',   desc:'Graded, weighed, and hygiene-checked.' },
                { icon:'🚛', title:'Abuja delivery',       desc:'We deliver to your premises on schedule.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-forest-800 border border-forest-700 rounded-2xl p-5 text-center">
                  <span className="text-3xl block mb-3">{icon}</span>
                  <h3 className="font-serif text-base font-bold text-white mb-1">{title}</h3>
                  <p className="text-forest-400 text-xs font-sans leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Tier cards */}
            <h3 className="font-serif text-xl font-bold text-white mb-6 text-center">
              Choose your order tier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {bulkTiers.map(tier => (
                <div
                  key={tier.label}
                  className="bg-forest-800 border border-forest-600 hover:border-earth-400 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 group"
                >
                  <span className="text-3xl">{tier.icon}</span>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">{tier.label}</h4>
                    <p className="text-earth-400 font-semibold text-sm mt-0.5 font-sans">From {tier.min}</p>
                    <p className="text-forest-400 text-xs mt-2 font-sans leading-relaxed">{tier.note}</p>
                  </div>
                  <button
                    onClick={() => bulkEnquiry(tier)}
                    className="mt-auto btn-whatsapp justify-center text-sm w-full"
                  >
                    <WhatsAppIcon />
                    Enquire Now
                  </button>
                </div>
              ))}
            </div>

            {/* B2B credentials strip */}
            <div className="bg-earth-900/40 border border-earth-700/40 rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {[
                  { value: '5+',   label: 'Active ponds supplying' },
                  { value: '24hr', label: 'Notice for large orders' },
                  { value: '100%', label: 'Antibiotic-free production' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-serif text-3xl font-bold text-earth-300">{value}</p>
                    <p className="text-forest-400 text-sm font-sans mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE RAISE CLEAN FISH (biosecurity) ── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <div ref={refProcess} className="reveal">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="badge-green mb-4 font-sans">Our Standards</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2 mb-4">
                How We Raise Clean Fish
              </h2>
              <p className="text-forest-600 font-sans leading-relaxed">
                Every catfish from Doha Prime is raised to the same standard we'd feed our own families.
                Here's exactly what that means.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '💧',
                  title: 'Borehole water source',
                  desc: 'All ponds are fed from a dedicated borehole — no surface water contamination. Water quality is tested weekly for pH, dissolved oxygen, and ammonia levels.',
                  badge: 'Monitored weekly',
                },
                {
                  icon: '🚫',
                  title: 'Zero antibiotics',
                  desc: 'We never use growth hormones or antibiotics. Fish health is managed through water quality control, proper stocking density, and nutritionally balanced feed.',
                  badge: '100% antibiotic-free',
                },
                {
                  icon: '📊',
                  title: 'Daily mortality tracking',
                  desc: 'Every pond is checked every morning. Mortality rates are recorded in FishTrackPro and reviewed weekly. Any unusual spike triggers an immediate water test.',
                  badge: 'Logged daily',
                },
                {
                  icon: '🌾',
                  title: 'Quality certified feed',
                  desc: 'We use only NAFDAC-approved commercial pellets with verified protein content (40–45%). Feed conversion ratio is tracked per pond to ensure efficient, healthy growth.',
                  badge: 'NAFDAC approved feed',
                },
                {
                  icon: '🧤',
                  title: 'Hygienic harvesting',
                  desc: 'Fish are harvested into clean, food-grade containers. Equipment is sanitised before every harvest. Staff wear gloves and follow handling protocols to prevent contamination.',
                  badge: 'Food-grade handling',
                },
                {
                  icon: '🌡️',
                  title: 'Cold chain delivery',
                  desc: 'Abuja deliveries are completed within 4 hours of harvest. Live fish are delivered in oxygenated transport. Processed fish are iced immediately after handling.',
                  badge: 'Delivered fresh',
                },
              ].map(({ icon, title, desc, badge }) => (
                <div key={title} className="bg-white border border-forest-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-serif text-base font-bold text-forest-900">{title}</h3>
                      </div>
                      <span className="inline-block badge-green text-xs mb-3 font-sans">{badge}</span>
                      <p className="text-forest-600 text-sm font-sans leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carbon comparison */}
            <div className="mt-12 bg-forest-800 rounded-2xl p-8">
              <div className="max-w-2xl mx-auto text-center mb-8">
                <span className="badge-earth mb-4 font-sans">Environmental Impact</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-2 mb-2">
                  Catfish: One of the Lowest Carbon Proteins
                </h3>
                <p className="text-forest-300 text-sm font-sans">
                  CO₂ equivalent per kilogram of edible protein produced
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
                {[
                  { protein: 'Beef',     kg: 27,  bar: 100, color: 'bg-red-500' },
                  { protein: 'Lamb',     kg: 20,  bar: 74,  color: 'bg-orange-400' },
                  { protein: 'Pork',     kg: 7,   bar: 26,  color: 'bg-yellow-400' },
                  { protein: 'Chicken',  kg: 5,   bar: 19,  color: 'bg-earth-400' },
                  { protein: 'Catfish',  kg: 2,   bar: 7,   color: 'bg-green-500', highlight: true },
                ].map(({ protein, kg, bar, color, highlight }) => (
                  <div key={protein} className={`rounded-xl p-4 text-center ${highlight ? 'bg-green-900/40 border-2 border-green-500' : 'bg-forest-700'}`}>
                    <div className="h-24 flex items-end justify-center mb-3">
                      <div
                        className={`w-8 rounded-t-lg ${color} transition-all duration-700`}
                        style={{ height: `${bar}%` }}
                      />
                    </div>
                    <p className={`font-serif font-bold text-lg ${highlight ? 'text-green-400' : 'text-white'}`}>
                      {kg}kg
                    </p>
                    <p className={`text-xs font-sans mt-0.5 ${highlight ? 'text-green-300 font-semibold' : 'text-forest-300'}`}>
                      {protein}{highlight ? ' ✓' : ''}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-forest-400 text-xs font-sans mt-6">
                Source: FAO Global Livestock Environmental Assessment Model. kg CO₂-eq per kg protein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMING SOON: FISH SNACK ── */}
      <section className="section-pad bg-white">
        <div className="section-container">
          <div ref={refSnack} className="reveal max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-earth-600 to-earth-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full font-sans mb-6">
                  Coming Soon
                </span>
                <div className="text-6xl mb-4">🐟</div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
                  Doha Prime Fish Snacks
                </h2>
                <p className="text-earth-100 font-sans leading-relaxed mb-2 max-w-xl mx-auto">
                  A premium protein snack made from our own farm-raised catfish. Clean ingredients.
                  Nigerian flavours. No preservatives.
                </p>
                <p className="text-earth-200 text-sm font-sans mb-8">
                  Competing with Gala and Minimie — but made from real fish, not mystery meat.
                </p>

                {/* Notify form */}
                {!notifySent ? (
                  <form onSubmit={handleSnackNotify} className="max-w-sm mx-auto">
                    <div className="flex flex-col gap-3 mb-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={notifyName}
                        onChange={e => setNotifyName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-forest-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp number (e.g. 08012345678)"
                        value={notifyPhone}
                        onChange={e => setNotifyPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-forest-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-white text-earth-700 font-semibold py-3 px-6 rounded-xl hover:bg-earth-50 transition-colors font-sans flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon cls="w-4 h-4 fill-[#25D366]" />
                      Notify me on WhatsApp when it launches
                    </button>
                    <p className="text-earth-200 text-xs mt-3 font-sans">
                      We'll message you as soon as it's ready. No spam, ever.
                    </p>
                  </form>
                ) : (
                  <div className="bg-white/20 rounded-2xl p-6">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="text-white font-semibold font-sans">You're on the list!</p>
                    <p className="text-earth-200 text-sm font-sans mt-1">
                      We'll WhatsApp you the moment Doha Prime Fish Snacks launches.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
