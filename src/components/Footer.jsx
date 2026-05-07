import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              {/* Logo — on the dark footer bg the green square looks great */}
              <img
                src="/images/doha-logo.jpg"
                alt="Doha Prime Ventures"
                className="h-14 w-14 rounded-xl object-cover shadow-md flex-shrink-0"
              />
              <div>
                <p className="font-serif font-bold text-xl leading-tight text-white">Doha Prime Ventures</p>
                <p className="text-xs tracking-widest uppercase text-earth-400 mt-0.5">Est. 2023 · Abuja, Nigeria</p>
              </div>
            </div>
            <p className="text-forest-300 text-sm leading-relaxed max-w-xs">
              Engineering sustainable growth through innovative aquaculture and precision horticulture across Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4 text-earth-300">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About Us'], ['/projects', 'Projects'], ['/store', 'Store'], ['/records', 'Farm Records']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-forest-300 hover:text-white text-sm transition-colors underline-grow">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold mb-4 text-earth-300">Contact</h4>
            <ul className="space-y-2 text-sm text-forest-300">
              <li>📍 Abuja, FCT, Nigeria</li>
              <li>📞 +234 7083316383</li>
              <li>✉️ business@dohaprimeventure.com</li>
              <li className="pt-2">
                <a
                  href="https://wa.me/2347083316383"
                  className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/40 text-[#25D366] px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M11.998 2C6.477 2 2 6.477 2 12c0 1.934.53 3.74 1.446 5.29L2 22l4.78-1.423A9.962 9.962 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 11.998 2zm.002 18c-1.618 0-3.127-.438-4.422-1.2l-.316-.188-3.283.977.936-3.213-.208-.329A7.966 7.966 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8 8z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-forest-500 text-xs">© {new Date().getFullYear()} Doha Prime Ventures. All rights reserved.</p>
          <p className="text-forest-600 text-xs">Designed with 🌿 for sustainable agriculture</p>
        </div>
      </div>
    </footer>
  )
}
