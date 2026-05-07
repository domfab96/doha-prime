import PhotoPlaceholder from '../components/PhotoPlaceholder'

const josOrchardCrops = [
  { name: 'Avocado',    icon: '🥑', note: 'Hass & Fuerte varieties' },
  { name: 'Apple',      icon: '🍎', note: 'Anna & Dorsett Golden' },
  { name: 'Grapefruit', icon: '🍊', note: 'Ruby Red variety' },
  { name: 'Date Fruit', icon: '🌴', note: 'Medjool variety' },
  { name: 'Pineapple',  icon: '🍍', note: 'MD2 variety' },
  { name: 'Greenhouse', icon: '🏡', note: 'Tomatoes, Capsicum, Herbs' },
]

const events = [
  { date: 'Jun 15, 2025', title: 'Q2 Harvest Day — Abuja Farm',        type: 'Harvest',  color: 'bg-forest-100 text-forest-800' },
  { date: 'Jul 02, 2025', title: 'Fingerling Restocking — Pond A & B', type: 'Stocking', color: 'bg-earth-100 text-earth-800' },
  { date: 'Aug 20, 2025', title: 'Jos Site Groundbreaking Ceremony',   type: 'Event',    color: 'bg-blue-100 text-blue-800' },
  { date: 'Sep 05, 2025', title: 'Farm Open Day — Abuja Public Tour',  type: 'Public',   color: 'bg-purple-100 text-purple-700' },
  { date: 'Oct 10, 2025', title: 'Q3 Harvest & Sales Drive',           type: 'Harvest',  color: 'bg-forest-100 text-forest-800' },
  { date: 'Nov 01, 2025', title: 'Greenhouse First Planting — Jos',    type: 'Planting', color: 'bg-teal-100 text-teal-800' },
]

// Pond gallery — all photos are portrait (590×1280). Fixed heights + object-position.
const pondGallery = [
  { src: '/images/abuja_aerial.jpg',     alt: 'Abuja Farm Ponds — Aerial View', h: '288px', pos: 'center center', wide: true },
  { src: '/images/catfish_ponds.jpg',    alt: 'Catfish Ponds Overview',          h: '192px', pos: 'center center' },
  { src: '/images/pond_feeding.jpg',     alt: 'Pond Feeding Time',               h: '192px', pos: 'center 20%' },
  { src: '/images/harvest_progress.jpg', alt: 'Harvest in Progress',             h: '192px', pos: 'center 30%' },
  { src: '/images/harvest_day.jpg',      alt: 'Harvest Day',                     h: '192px', pos: 'center 25%' },
  { src: '/images/harvest_buckets.jpg',  alt: 'Post-Harvest Sorting',            h: '192px', pos: 'center 30%' },
]

export default function Projects() {
  return (
    <div className="pt-20">
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-forest-900 py-20">
        <div className="section-container text-center text-white">
          <span className="badge-earth mb-4">Our Work</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">Farm Projects</h1>
          <p className="text-forest-300 mt-4 max-w-xl mx-auto">
            Current operations in Abuja and upcoming developments in Jos Plateau.
          </p>
        </div>
      </section>

      {/* ─── CURRENT PROJECT: ABUJA FISH FARM ─────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="badge-green">Active Project</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mb-4">
            Abuja Fish Farm Operations
          </h2>
          <p className="text-forest-600 max-w-2xl mb-10 text-lg leading-relaxed">
            Our flagship facility in Abuja, FCT produces premium hybrid catfish (<em>Clarias gariepinus</em>) using
            data-driven pond management, optimised feed conversion ratios, and regular water quality monitoring.
          </p>

          {/* Pond gallery — fixed heights, object-position tuned per photo */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {pondGallery.map((img, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden ${img.wide ? 'col-span-2 md:col-span-1' : ''}`}
                style={{ height: img.h }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: img.pos }}
                />
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Ponds',     value: '5',   unit: '' },
              { label: 'Stocking Density', value: '120', unit: 'fish/m²' },
              { label: 'Avg FCR',          value: '1.4', unit: ':1' },
              { label: 'Harvest Cycle',    value: '5–6', unit: 'months' },
            ].map(({ label, value, unit }) => (
              <div key={label} className="bg-white rounded-xl p-5 border border-forest-100 text-center shadow-sm">
                <p className="font-serif text-2xl font-bold text-forest-800">
                  {value}<span className="text-base text-earth-500 ml-1">{unit}</span>
                </p>
                <p className="text-forest-500 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UPCOMING PROJECT: JOS ORCHARD ────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 bg-earth-400 rounded-full" />
            <span className="badge-earth">Upcoming Project</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mb-4">
                Jos Highland Orchard & Pilot Farm
              </h2>
              <p className="text-forest-600 mb-6 leading-relaxed">
                The Jos Plateau's cool climate (avg. 22°C) makes it uniquely suited for temperate fruits rarely grown
                in Nigeria. Our pilot farm will establish commercially viable orchard blocks and a modern greenhouse,
                creating a premium produce supply chain from farm to table.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {josOrchardCrops.map(({ name, icon, note }) => (
                  <div key={name} className="bg-earth-50 border border-earth-200 rounded-xl p-3 text-center">
                    <span className="text-2xl block mb-1">{icon}</span>
                    <p className="font-semibold text-forest-800 text-sm">{name}</p>
                    <p className="text-earth-600 text-xs mt-0.5">{note}</p>
                  </div>
                ))}
              </div>

              <div className="bg-forest-50 border border-forest-200 rounded-xl p-4 text-sm text-forest-700">
                <strong>Timeline:</strong> Site preparation Q3 2025 · First planting Q4 2025 · First harvest Q2–Q3 2026
              </div>
            </div>

            {/* Jos Orchard images — all real photos now */}
            <div className="space-y-4">
              {/* Main site map — landscape render, show full */}
              <div className="rounded-xl overflow-hidden" style={{ height: '256px' }}>
                <img
                  src="/images/jos_orchard.jpg"
                  alt="Jos orchard layout — site visualisation"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Two smaller images side by side */}
              <div className="grid grid-cols-2 gap-3">
                {/* Land clearing — landscape render */}
                <div className="rounded-xl overflow-hidden" style={{ height: '160px' }}>
                  <img
                    src="/images/jos_land_clearing.jpg"
                    alt="Jos site — land clearing in progress"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Greenhouse plan — aerial landscape photo */}
                <div className="rounded-xl overflow-hidden" style={{ height: '160px' }}>
                  <img
                    src="/images/greenhouse_plan.jpg"
                    alt="Greenhouse design — aerial view"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ───────────────────────────────────────── */}
      <section className="section-pad bg-forest-800">
        <div className="section-container">
          <div className="mb-10">
            <span className="badge-earth mb-3">Calendar</span>
            <h2 className="font-serif text-3xl font-bold text-white mt-2">Upcoming Farm Events</h2>
          </div>
          <div className="space-y-4">
            {events.map(({ date, title, type, color }) => (
              <div
                key={title}
                className="bg-forest-700/50 border border-forest-600 rounded-xl p-5
                           flex flex-col sm:flex-row sm:items-center gap-4
                           hover:bg-forest-700 transition-colors"
              >
                <div className="flex-shrink-0 w-28 text-forest-300 text-sm font-medium">{date}</div>
                <div className="flex-1 font-medium text-white">{title}</div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${color}`}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
