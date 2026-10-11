import { useScrollReveal } from '../hooks/useScrollReveal'

/* A public page a judge, investor or partner can open mid-conversation.
 * Everything we claim, with the thing itself one click away.
 *
 * DELIBERATELY NO CUSTOMER DATA. The admin dashboard holds farmers' names,
 * emails and phone numbers; publishing any of it would breach the NDPA and
 * betray the farms that trusted us. Counts only. If somebody wants to see the
 * dashboard, we show it to them live. */

const APP_URL = 'https://fishtrackpr.netlify.app'
const DOCS    = '/docs'

const funnel = [
  { n: '25', label: 'Farmers interviewed',  note: 'Fourteen weeks of customer discovery' },
  { n: '15', label: 'Registered and tested', note: 'Counted on our own admin dashboard' },
  { n: '8',  label: 'Paying farms',          note: 'Subscribed and billed' },
  { n: '9',  label: 'Waiting for the pilot', note: 'Asked to be included' },
]

const documents = [
  { title: 'Pitch deck',            desc: '15 pages. The business, the model and the ask.',              href: `${DOCS}/pitch-deck.pdf` },
  { title: 'Customer interviews',   desc: 'Three structured interviews with Nigerian fish farmers, verbatim.', href: `${DOCS}/customer-interviews.pdf` },
  { title: 'Business model workbook', desc: 'Unit economics and the three-year model.',                   href: `${DOCS}/business-model-workbook.pdf` },
  { title: 'Certificate of incorporation', desc: 'Doha Prime Ventures Limited · RC 8674998.',            href: `${DOCS}/cac-certificate.pdf` },
]

export default function Evidence() {
  const refFunnel = useScrollReveal()
  const refDocs   = useScrollReveal()

  return (
    <div className="pt-20">

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-forest-900 py-20">
        <div className="section-container text-center text-white">
          <span className="badge-earth mb-4">Proof</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">Evidence</h1>
          <p className="text-forest-300 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything we claim, and where you can check it. Nothing on this page needs
            a login.
          </p>
        </div>
      </section>

      {/* ─── THE PRODUCT ───────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <span className="badge-green mb-3">01 · The product</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2 mb-5">
            Open it yourself
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-7">
              <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">FishTrackPro, live</h3>
              <p className="text-forest-600 text-sm leading-relaxed mb-5 font-sans">
                The working product our farms use. Create a pond, log a day, ask AIDA a question.
                No sales call, no demo request.
              </p>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block font-sans">
                Open the app →
              </a>
            </div>
            <div className="card p-7">
              <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">The sensor</h3>
              <p className="text-forest-600 text-sm leading-relaxed mb-5 font-sans">
                Solar, sealed, sitting in our own pond in Abuja. Reads temperature, dissolved
                oxygen and pH every ten minutes and calculates ammonia risk from pH and
                temperature.
              </p>
              <p className="text-forest-500 text-xs font-sans italic">
                Photographs and a live demonstration available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRACTION ──────────────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="section-container">
          <span className="badge-green mb-3">02 · Traction</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2 mb-3">
            Counted, not estimated
          </h2>
          <p className="text-forest-600 font-sans font-light text-lg mb-10 max-w-2xl">
            Every figure below comes from our own admin dashboard, not from memory.
          </p>

          <div ref={refFunnel} className="reveal-stagger grid grid-cols-2 lg:grid-cols-4 gap-5">
            {funnel.map(f => (
              <div key={f.label} className="card p-6">
                <p className="font-serif text-4xl font-bold text-forest-800">{f.n}</p>
                <p className="font-sans text-sm font-semibold text-forest-900 mt-1">{f.label}</p>
                <p className="font-sans text-xs text-forest-500 mt-2 leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-forest-900 rounded-2xl p-7">
            <p className="text-white font-sans text-sm leading-relaxed">
              <span className="font-semibold text-earth-300">What we cannot yet prove: </span>
              retention. No farm has completed a full production cycle on FishTrackPro. Our own
              pilot pond is instrumented and recording now; the first full cycle completes in
              March 2027, measured by an agronomist who does not work for us.
            </p>
            <p className="text-forest-400 font-sans text-xs mt-4 leading-relaxed">
              Farmer names, contact details and farm data are deliberately not published here.
              We will walk any serious enquirer through the live dashboard directly.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENTS ─────────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <span className="badge-green mb-3">03 · Documents</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2 mb-10">
            Read anything you like
          </h2>
          <div ref={refDocs} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-5">
            {documents.map(d => (
              <a key={d.title} href={d.href} target="_blank" rel="noopener noreferrer"
                 className="card p-6 block hover:border-forest-400 transition-colors">
                <h3 className="font-serif text-xl font-bold text-forest-900">{d.title}</h3>
                <p className="text-forest-600 text-sm leading-relaxed mt-2 font-sans">{d.desc}</p>
                <span className="text-forest-700 font-semibold text-sm mt-3 inline-block underline-grow font-sans">
                  Open PDF →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-earth-600 py-16">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
              Want to see the dashboard?
            </h2>
            <p className="text-earth-100 text-sm font-sans">
              We will show you the live admin view, the sensor, and a farm's records — on a call
              or in person in Abuja.
            </p>
          </div>
          <a href="https://wa.me/2347083316383" target="_blank" rel="noopener noreferrer"
             className="bg-white text-earth-700 hover:bg-earth-50 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow whitespace-nowrap font-sans">
            Message us →
          </a>
        </div>
      </section>

    </div>
  )
}
