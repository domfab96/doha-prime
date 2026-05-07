import PhotoPlaceholder from '../components/PhotoPlaceholder'

const team = [
  { name: 'Olufemi Dominic Fabian', role: 'Founder & CEO', bio: 'Former engineer turned commercial farmer. Leads strategic vision and farm operations.' },
  { name: 'Amaka Okonkwo',          role: 'Farm Manager',  bio: 'Oversees daily pond operations, feeding schedules, and harvest coordination.' },
  { name: 'Bello Abdullahi',         role: 'Horticulture Lead', bio: 'Leads the Jos Plateau orchard pilot and greenhouse establishment.' },
  { name: 'Chisom Nwachukwu',        role: 'Sales & Marketing', bio: 'Manages store, customer relations, and WhatsApp order fulfilment.' },
  { name: 'Ibrahim Musa',            role: 'Field Technician', bio: 'Handles water quality monitoring, pond maintenance, and equipment upkeep.' },
  { name: 'Fatima Yusuf',            role: 'Records & Admin', bio: 'Manages farm data, batch records, and financial reporting.' },
]

const values = [
  { icon: '🌱', title: 'Sustainability', desc: 'Every decision is weighed against its long-term environmental impact.' },
  { icon: '⚙️', title: 'Precision',     desc: 'Engineering discipline applied to every aspect of production.' },
  { icon: '🤝', title: 'Community',     desc: 'Creating jobs and food security in our local communities.' },
  { icon: '📈', title: 'Profitability', desc: 'Sustainable farming must also be a sustainable business.' },
]

export default function About() {
  return (
    <div className="pt-20">
      {/* ─── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="bg-forest-900 py-20">
        <div className="section-container text-center text-white">
          <span className="badge-earth mb-4">Our Story</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">About Doha Prime Ventures</h1>
          <p className="text-forest-300 mt-4 max-w-xl mx-auto text-lg">
            Built on engineering principles. Rooted in the soil. Growing for Nigeria.
          </p>
        </div>
      </section>

      {/* ─── COMPANY PROFILE ───────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-green mb-3">Company Profile</span>
              <h2 className="font-serif text-3xl font-bold text-forest-900 mt-2 mb-5">
                Where Engineering Meets the Earth
              </h2>
              <div className="space-y-4 text-forest-700 leading-relaxed">
                <p>
                  Doha Prime Ventures is a Nigerian integrated agribusiness committed to building a resilient, technology-driven food production system. Founded by an engineer who left the technical industry to solve Nigeria's food security challenge from the ground up, the company operates at the intersection of precision science and practical farming.
                </p>
                <p>
                  Our current flagship operation is a commercial catfish farm in Abuja, FCT — producing premium hybrid <em>Clarias gariepinus</em> for the Abuja market. We are simultaneously pioneering a highland orchard pilot in Jos, Plateau State, focusing on temperate fruits and vegetables.
                </p>
                <p>
                  Our long-term vision is to build a vertically integrated agri-enterprise covering production, processing, packaging, and direct-to-consumer sales — contributing meaningfully to Nigeria's agricultural GDP and employment landscape.
                </p>
              </div>
            </div>
            <PhotoPlaceholder label="Company Farm Aerial View" height="h-96" icon="🌾" />
          </div>
        </div>
      </section>

      {/* ─── VALUES ────────────────────────────────────────────────── */}
      <section className="section-pad bg-forest-800">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="badge-earth mb-3">What We Stand For</span>
            <h2 className="font-serif text-3xl font-bold text-white mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="bg-forest-700/50 rounded-2xl p-6 border border-forest-600 text-center hover:bg-forest-700 transition-colors">
                <span className="text-3xl block mb-3">{icon}</span>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-forest-300 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER PROFILE ───────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              {/* Portrait */}
              <div className="md:col-span-1">
                <PhotoPlaceholder label="Owner Portrait — Olufemi Dominic Fabian" height="h-80" icon="👨‍💼" />
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-xl font-bold text-forest-900">Olufemi Dominic Fabian</h3>
                  <p className="text-earth-600 font-medium text-sm">Founder & Chief Executive</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className="badge-green">Engineer</span>
                    <span className="badge-earth">Farmer</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <span className="badge-green mb-3">Founder's Note</span>
                <h2 className="font-serif text-3xl font-bold text-forest-900 mt-2 mb-5">
                  From the Drawing Board to the Farm
                </h2>
                <div className="space-y-4 text-forest-700 leading-relaxed">
                  <p>
                    Olufemi Dominic Fabian spent years working as an engineer, solving complex systems problems in the industrial sector. But a persistent calling toward food, land, and the potential of Nigerian agriculture led him to make a bold pivot — trading his technical role for muddy boots and pond management.
                  </p>
                  <p>
                    Armed with an engineer's mindset, Olufemi approached farming the way he approached any technical challenge: with data, discipline, and iteration. He studied aquaculture practices, consulted with agronomists, and invested in hands-on training before launching Doha Prime Ventures.
                  </p>
                  <p>
                    "Agriculture in Nigeria doesn't lack potential — it lacks precision," Olufemi often says. "We're bringing engineering standards to the farm, and the results speak for themselves."
                  </p>
                  <p>
                    Today, he leads a growing team from the Abuja farm, overseeing production cycles, market strategy, and the company's ambitious expansion into highland horticulture in Jos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM GRID ─────────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="badge-green mb-3">Our People</span>
            <h2 className="font-serif text-3xl font-bold text-forest-900 mt-2">Meet the Team</h2>
            <p className="text-forest-600 mt-3 max-w-lg mx-auto">
              A dedicated group of professionals and passionate farmers building Doha Prime's future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(({ name, role, bio }) => (
              <div key={name} className="card p-0 group">
                <PhotoPlaceholder label={`Staff Portrait — ${name}`} height="h-56" icon="👤" />
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-forest-900">{name}</h3>
                  <p className="text-earth-600 font-semibold text-sm mb-2">{role}</p>
                  <p className="text-forest-600 text-sm leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
