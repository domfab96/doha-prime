import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

const APP_URL   = 'https://fishtrackpr.netlify.app'
const WHATSAPP  = 'https://wa.me/2347083316383?text=' +
  encodeURIComponent("Hello Doha Prime Ventures — I'd like to know more about FishTrackPro for my farm.")

const steps = [
  {
    n: '01',
    title: 'The pond is read',
    desc: 'A solar sensor sits in the water and sends temperature, dissolved oxygen and pH straight into the record. ' +
          'No sensor yet? The farmer enters his own test-kit readings and everything else works the same.',
  },
  {
    n: '02',
    title: 'Every reading is checked',
    desc: 'Fixed rules compare each reading against what is safe for catfish, and against that pond’s own plan. ' +
          'Ammonia risk is worked out from pH and temperature.',
  },
  {
    n: '03',
    title: 'The alert reaches the phone',
    desc: 'Not a dashboard somebody has to remember to open — a notification, naming the pond, the reading and the time.',
  },
  {
    n: '04',
    title: 'AIDA explains it',
    desc: 'Our advisor says what changed, shows the records behind it, and suggests what to check — ' +
          'in English, Hausa, Igbo or Yoruba.',
  },
]

const features = [
  { icon: '💧', title: 'Water monitoring',   desc: 'Temperature, dissolved oxygen and pH, with ammonia risk calculated from pH and temperature.' },
  { icon: '📒', title: 'Daily farm record',  desc: 'Feed, mortality and sample weight — three fields a day. Everything else is optional.' },
  { icon: '📊', title: 'Feed conversion',    desc: 'FCR and biomass update every week as the farm logs, not at harvest when the money is spent.' },
  { icon: '🔔', title: 'Alerts that arrive', desc: 'Rules raise every warning. A sensor that goes quiet is flagged, never treated as good news.' },
  { icon: '🗣️', title: 'Four languages', desc: 'The owner reads English. Farm staff do not always — so alerts speak Hausa, Igbo and Yoruba too.' },
  { icon: '📁', title: 'A record worth having', desc: 'Cycle after cycle of verifiable production history — the evidence a farm has never been able to show.' },
]

const plans = [
  { name: 'Basic',          price: '₦3,000',  per: 'per farm / month', desc: 'One to three ponds. Manual readings, records, alerts and AIDA.' },
  { name: 'Personal Pro',   price: '₦7,500',  per: 'per farm / month', desc: 'Up to ten ponds. Production plans, weekly FCR and performance review.', featured: true },
  { name: 'Industrial Pro', price: '₦12,000', per: 'per farm / month', desc: 'Unlimited ponds, staff accounts, sensor ingest and a monthly review.' },
]

export default function FishTrackPro() {
  const refSteps    = useScrollReveal()
  const refFeatures = useScrollReveal()
  const refPlans    = useScrollReveal()
  const refKit      = useScrollReveal()

  return (
    <div className="pt-20">

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-forest-900 py-20">
        <div className="section-container text-center text-white">
          <span className="badge-earth mb-4">Our Technology</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">FishTrackPro</h1>
          <p className="text-forest-300 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Water monitoring and farm records for Nigerian catfish farms. Built on our own
            ponds, in Abuja, because we needed it first.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer"
               className="bg-white text-forest-800 hover:bg-forest-50 font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 shadow font-sans">
              Open the app →
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-7 py-3.5">
              Talk to us about your farm
            </a>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ───────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-green mb-3">Why We Built It</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2 mb-5">
                A farmer loses fish and cannot say why
              </h2>
              <div className="space-y-4 text-forest-700 leading-relaxed">
                <p>
                  Water quality turns overnight. Oxygen falls while everyone is asleep, ammonia builds
                  between water changes, and by morning the loss has already happened.
                </p>
                <p>
                  Afterwards there is nothing to look back at. Records sit on paper and in memory, so a
                  bad cycle can never properly be explained — and a good one can never be repeated on purpose.
                </p>
                <p className="font-medium text-forest-900">
                  We lost a third of a stocking to exactly this. FishTrackPro is what we built so it
                  would not happen again — first on our own farm, now for other farms too.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-forest-100">
              <img src="/images/pond_feeding.jpg" alt="Catfish pond at Doha Prime Ventures"
                   className="w-full h-96 object-cover" style={{ objectPosition: 'center 20%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="section-pad bg-forest-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="badge-earth mb-4 font-sans">How It Works</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              From a reading to a response
            </h2>
            <p className="text-forest-300 font-sans font-light text-lg">
              Four steps, and the farmer only hears from us when something has actually changed.
            </p>
          </div>

          <div ref={refSteps} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(s => (
              <div key={s.n} className="bg-forest-800/60 border border-forest-700 rounded-2xl p-6">
                <span className="font-serif text-3xl font-bold text-earth-400">{s.n}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-3 mb-2">{s.title}</h3>
                <p className="text-forest-300 text-sm leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-forest-400 text-xs text-center mt-8 max-w-2xl mx-auto font-sans">
            FishTrackPro reports what the records show. It does not diagnose disease, prescribe treatment
            or recommend dosages — those belong to a qualified aquaculture specialist.
          </p>
        </div>
      </section>

      {/* ─── WHAT YOU GET ──────────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="badge-green mb-4 font-sans">What You Get</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2">
              Built for a working farm
            </h2>
          </div>
          <div ref={refFeatures} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="card p-6">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-serif text-xl font-bold text-forest-900 mt-3 mb-2">{f.title}</h3>
                <p className="text-forest-600 text-sm leading-relaxed font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="badge-earth mb-4 font-sans">Pricing</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2 mb-4">
              Software monthly. Hardware when you are ready.
            </h2>
            <p className="text-forest-600 font-sans font-light text-lg">
              Start on a phone and a test kit. Add the sensor whenever the farm wants it.
            </p>
          </div>

          <div ref={refPlans} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map(p => (
              <div key={p.name}
                   className={`card p-7 flex flex-col ${p.featured ? 'ring-2 ring-forest-600 shadow-lg' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs tracking-widest uppercase text-earth-600 font-semibold font-sans">{p.name}</p>
                  {p.featured && <span className="badge-green text-[10px]">Most chosen</span>}
                </div>
                <p className="font-serif text-4xl font-bold text-forest-900 mt-2">{p.price}</p>
                <p className="text-forest-500 text-sm font-sans">{p.per}</p>
                <p className="text-forest-600 text-sm leading-relaxed mt-4 font-sans">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Sensor kit */}
          <div ref={refKit} className="reveal mt-10 max-w-5xl mx-auto">
            <div className="bg-forest-900 rounded-2xl p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <p className="text-xs tracking-widest uppercase text-earth-400 font-semibold font-sans mb-3">
                    The sensor kit
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                    ₦35,000 a month, not ₦648,000 up front
                  </h3>
                  <p className="text-forest-300 text-sm leading-relaxed font-sans">
                    Most farms take the kit on monthly terms — ₦35,000 a month for twenty-four months,
                    and then it belongs to the farm. Or buy outright: <span className="text-white font-medium">Lite ₦480,000</span>,{' '}
                    <span className="text-white font-medium">Full ₦648,000</span>. Installation and a year of
                    warranty are inside both prices.
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                     className="inline-block bg-earth-500 hover:bg-earth-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 shadow font-sans">
                    Ask about a kit →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-earth-600 py-16">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
              See it on your own pond
            </h2>
            <p className="text-earth-100 text-sm font-sans">
              Open the app and set up a pond in a few minutes, or message us and we will walk your farm through it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer"
               className="bg-white text-earth-700 hover:bg-earth-50 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow whitespace-nowrap font-sans">
              Open FishTrackPro →
            </a>
            <Link to="/projects"
                  className="border border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all duration-200 whitespace-nowrap font-sans">
              See our farm
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
