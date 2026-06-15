import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { StoreProvider }   from './context/StoreContext'
import { ContentProvider } from './context/ContentContext'
import { CartProvider }    from './context/CartContext'
import Navbar        from './components/Navbar'
import Footer        from './components/Footer'
import Cart          from './components/Cart'
import FloatingCart  from './components/FloatingCart'
import Home          from './pages/Home'
import About         from './pages/About'
import Projects      from './pages/Projects'
import Store         from './pages/Store'
import Records       from './pages/Records'
import Admin         from './pages/Admin'
import Blog          from './pages/Blog'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

// ── Public layout: Navbar + Footer + Cart ──────────────────────────────────
function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Cart />
      <FloatingCart />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ContentProvider>
          <CartProvider>
            <ScrollToTop />
            <Routes>
              {/* ── Hidden admin route — NO Navbar, NO Footer ── */}
              <Route path="/secure-admin" element={<Admin />} />

              {/* ── All public routes share the PublicLayout ── */}
              <Route path="/*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/"         element={<Home />} />
                    <Route path="/about"    element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/store"    element={<Store />} />
                    <Route path="/records"  element={<Records />} />
                    <Route path="/blog"     element={<Blog />} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
          </CartProvider>
        </ContentProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}
