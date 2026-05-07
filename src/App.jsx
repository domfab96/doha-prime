import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider }   from './context/StoreContext'
import { ContentProvider } from './context/ContentContext'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import Home      from './pages/Home'
import About     from './pages/About'
import Projects  from './pages/Projects'
import Store     from './pages/Store'
import Records   from './pages/Records'
import Admin     from './pages/Admin'
import Blog      from './pages/Blog'

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ContentProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/about"    element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/store"    element={<Store />} />
                <Route path="/records"  element={<Records />} />
                <Route path="/admin"    element={<Admin />} />
                <Route path="/blog"     element={<Blog />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ContentProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}
