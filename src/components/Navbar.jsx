import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/store',    label: 'Store' },
  { to: '/blog',     label: 'Blog' },
  { to: '/records',  label: 'Farm Records' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location               = useLocation()
  const isHome                 = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const transparent = isHome && !scrolled
  const navBase = transparent
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b border-forest-100'
  const linkColor = transparent ? 'text-white' : 'text-forest-800'

  return (
    <header className={navBase}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img src="/images/doha-logo.jpg" alt="Doha Prime Ventures"
              className="h-10 w-10 rounded-lg object-cover shadow-sm group-hover:opacity-90 transition-opacity" />
            <div className="hidden sm:block leading-tight">
              <p className={`font-serif font-semibold text-lg leading-none transition-colors ${transparent ? 'text-white' : 'text-forest-800'}`}>
                Doha Prime
              </p>
              <p className={`text-xs tracking-widest uppercase font-sans transition-colors ${transparent ? 'text-white/70' : 'text-earth-500'}`}>
                Ventures
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                   ${isActive ? 'bg-forest-700 text-white shadow-sm'
                              : `${linkColor} hover:bg-forest-50 hover:text-forest-700`}`}>
                {label}
              </NavLink>
            ))}
            <Link to="/admin" className="ml-2 btn-primary text-sm py-2 px-4">Admin ↗</Link>
          </nav>

          <button onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-lg transition-colors ${linkColor} hover:bg-black/10`}
            aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-white border-t border-forest-100 py-4 px-2 shadow-xl rounded-b-2xl">
            <div className="flex items-center gap-3 px-4 pb-4 mb-2 border-b border-forest-100">
              <img src="/images/doha-logo.jpg" alt="Doha Prime Ventures" className="h-9 w-9 rounded-lg object-cover" />
              <div>
                <p className="font-serif font-semibold text-forest-900 text-base leading-none">Doha Prime Ventures</p>
                <p className="text-xs text-forest-500 mt-0.5">Abuja · Nigeria</p>
              </div>
            </div>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-colors
                   ${isActive ? 'bg-forest-700 text-white' : 'text-forest-800 hover:bg-forest-50'}`}>
                {label}
              </NavLink>
            ))}
            <Link to="/admin" className="flex btn-primary justify-center mt-2 text-sm">Admin Panel ↗</Link>
          </div>
        )}
      </div>
    </header>
  )
}
