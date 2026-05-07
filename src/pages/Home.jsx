import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useFarmData } from '../hooks/useFarmData'
import { toYouTubeEmbed } from '../utils/imageUtils'

// ─── Star rating ─────────────────────────────────────────────────────────────
function Stars({ n }) {
  return <span className="text-earth-400 text-sm">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

// ─── Event type colour map ────────────────────────────────────────────────────
const EVENT_COLORS = {
  green:  'bg-forest-100 text-forest-800',
  earth:  'bg-earth-100 text-earth-800',
  blue:   'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-700',
  teal:   'bg-teal-100 text-teal-800',
}

export default function Home() {
  const { posts, reviews, events } = useContent()
  const { data: farmData } = useFarmData()
  const [expandedPost,   setExpandedPost]   = useState(null)
  const [expandedReview, setExpandedReview] = useState(null)

  // ── Live pond count from Firebase, fallback to static ──────────────────────
  const activePonds = farmData ? farmData.totals.activePonds : 5

  const stats = [
    { value: String(activePonds), label: 'Active Ponds', live: !!farmData },
    { value: '50K+',  label: 'Fingerlings Stocked' },
    { value: '2',     label: 'Farm Locations' },
    { value: '100%',  label: 'Sustainable Practices' },
  ]

  const publishedPosts  = posts.filter(p => p.published).slice(0, 3)
  const upcomingEvents  = events
    .filter(e => new Date(e.isoDate) >= new Date(new Date().setHours(0,0,0,0)))
    .sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate))
    .slice(0, 4)

  const gallery = [
    { img:'/images/harvest_progress.jpg', alt:'Harvest in progress', pos:'center 30%' },
    { img:'/images/pond_feeding.jpg',     alt:'Pond feeding',        pos:'center 20%' },
    { img:'/images/harvest_buckets.jpg',  alt:'Sorting fresh catch', pos:'center 25%' },
    { img:'/images/packaged_market.jpg',  alt:'Packaged products',   pos:'center 35%' },
  ]

  return (
    <div>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/abuja_aerial.jpg" alt="Doha Prime Ventures aerial"
            className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/65 via-forest-950/45 to-forest-950/85" />
        </div>
        <div className="relative z-10 section-container text-center text-white px-4">
          <span className="badge-earth opacity-90 mb-6 inline-block animate-fadeInUp font-sans tracking-widest">
            Abuja · Nigeria · Est. 2023
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-shadow mb-6 animate-fadeInUp delay-100">
            Engineering{' '}
            <em className="not-italic text-earth-300 italic">Sustainable</em>
            <br />Growth at Doha Prime
          </h1>
          <p className="text-white/75 max-w-xl mx-auto text-lg md:text-xl leading-relaxed mb-10 animate-fadeInUp delay-200 font-sans font-light">
            From precision aquaculture to highland orchards — building Nigeria's most innovative integrated farm enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
            <Link to="/projects" className="btn-primary text-base px-8 py-4 font-sans font-semibold">
              Explore Our Projects →
            </Link>
            <Link to="/store"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base font-sans">
              Shop Farm Fresh
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ─── STATS BAR ──────────────────────────────────────────── */}
      <section className="bg-forest-700 py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, live }) => (
              <div key={label} className="text-center px-4">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-serif text-3xl font-bold text-white">{value}</p>
                  {live && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Live data from FarmTrack" />}
                </div>
                <p className="text-forest-200 text-sm mt-1 font-sans">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTRO CARDS ────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="badge-green mb-4 font-sans">Who We Are</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-forest-900 mt-3 mb-5">
              A New Generation of<br />Nigerian Agriculture
            </h2>
            <p className="text-forest-600 text-lg leading-relaxed font-sans font-light">
              Doha Prime Ventures combines engineering precision with deep agricultural know-how to create profitable, sustainable food systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title:'Catfish Production', badge:'Active · Abuja', img:'/images/catfish_ponds.jpg', pos:'center center',
                desc:'Premium hybrid catfish raised in controlled pond environments. FCR-optimized feeding cycles ensure healthy, market-ready fish every harvest.', to:'/projects' },
              { title:'Horticulture Pilot', badge:'Upcoming · Jos', img:'/images/jos_orchard.jpg',  pos:'center 40%',
                desc:'Launching Jos Plateau orchard with avocado, apple, grapefruit, date, pineapple, and greenhouse crops leveraging the cool highland climate.', to:'/projects' },
            ].map(item => (
              <div key={item.title} className="card overflow-hidden group">
                <div className="relative overflow-hidden h-52">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: item.pos }} />
                  <span className="absolute top-4 left-4 badge-green font-sans">{item.badge}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">{item.title}</h3>
                  <p className="text-forest-600 text-sm leading-relaxed mb-4 font-sans">{item.desc}</p>
                  <Link to={item.to} className="text-forest-700 font-semibold text-sm hover:text-forest-900 underline-grow inline-block font-sans">
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ────────────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="section-pad bg-forest-900">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="badge-earth mb-3 font-sans">What's Coming</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2">Upcoming Events</h2>
              </div>
              <Link to="/projects" className="text-forest-300 hover:text-white text-sm font-sans underline-grow">
                View all events →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.map(ev => (
                <div key={ev.id}
                  className="bg-forest-800 border border-forest-700 rounded-2xl p-5 flex items-start gap-4 hover:bg-forest-700 transition-colors">
                  <div className="bg-earth-500/20 rounded-xl px-3 py-2 text-center flex-shrink-0 min-w-[56px]">
                    <p className="text-earth-300 text-xs font-sans font-semibold uppercase">
                      {new Date(ev.isoDate).toLocaleDateString('en-GB', { month: 'short' })}
                    </p>
                    <p className="text-white font-serif font-bold text-xl leading-none">
                      {new Date(ev.isoDate).getDate()}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm leading-snug mb-2 font-sans">{ev.title}</p>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full font-sans ${EVENT_COLORS[ev.color] ?? 'bg-gray-100 text-gray-700'}`}>
                      {ev.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="bg-earth-600 py-16">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Fresh Catch Available Now</h2>
            <p className="text-earth-100 text-sm font-sans">Live catfish, smoked fish, and market-ready tilapia — order directly from the farm.</p>
          </div>
          <Link to="/store" className="bg-white text-earth-700 hover:bg-earth-50 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow whitespace-nowrap font-sans">
            Visit Our Store →
          </Link>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ───────────────────────────────────────── */}
      {publishedPosts.length > 0 && (
        <section className="section-pad bg-white">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="badge-green mb-3 font-sans">Farm Knowledge</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2">From Our Farm Blog</h2>
                <p className="text-forest-500 mt-2 font-sans text-sm">Insights on aquaculture, horticulture, and Nigerian agriculture.</p>
              </div>
              <Link to="/blog" className="text-forest-700 hover:text-forest-900 text-sm font-sans font-semibold underline-grow">
                Read all posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publishedPosts.map(post => (
                <article key={post.id} className="card overflow-hidden group cursor-pointer"
                  onClick={() => setExpandedPost(post)}>
                  {post.image && (
                    <div className="overflow-hidden h-44">
                      <img src={post.image} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-green text-xs font-sans">{post.category}</span>
                      <span className="text-forest-400 text-xs font-sans">
                        {new Date(post.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-forest-900 mb-2 leading-snug group-hover:text-forest-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-forest-600 text-sm leading-relaxed font-sans line-clamp-3">{post.excerpt}</p>
                    <p className="text-forest-700 text-sm font-semibold mt-3 font-sans">Read more →</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CUSTOMER REVIEWS ───────────────────────────────────── */}
      {reviews.length > 0 && (
        <section className="section-pad bg-cream">
          <div className="section-container">
            <div className="text-center mb-10">
              <span className="badge-earth mb-3 font-sans">What Customers Say</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2">Customer Reviews</h2>
              <p className="text-forest-500 mt-2 font-sans text-sm">Real feedback from customers who bought via WhatsApp.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map(rev => (
                <div key={rev.id}
                  className="bg-white rounded-2xl p-6 border border-forest-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => rev.mediaUrl ? setExpandedReview(rev) : null}>
                  {/* Media thumbnail */}
                  {rev.mediaUrl && rev.mediaType === 'image' && (
                    <div className="mb-4 rounded-xl overflow-hidden h-36">
                      <img src={rev.mediaUrl} alt="Review media"
                        className="w-full h-full object-cover" />
                    </div>
                  )}
                  {rev.mediaUrl && rev.mediaType === 'video' && (
                    <div className="mb-4 rounded-xl overflow-hidden bg-forest-900 h-36 flex items-center justify-center">
                      <span className="text-white/60 text-sm font-sans">▶ Video — click to watch</span>
                    </div>
                  )}
                  <Stars n={rev.rating} />
                  <p className="text-forest-700 text-sm leading-relaxed mt-2 font-sans">
                    "{rev.text.length > 180 ? rev.text.slice(0, 180) + '…' : rev.text}"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center text-white text-xs font-bold font-sans flex-shrink-0">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-forest-900 font-semibold text-sm font-sans leading-none">{rev.name}</p>
                      <p className="text-forest-400 text-xs font-sans mt-0.5">{rev.location}</p>
                    </div>
                    {rev.verified && (
                      <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full font-sans">✓ Verified</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── GALLERY ────────────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="section-container">
          <div className="text-center mb-10">
            <span className="badge-green mb-3 font-sans">From The Farm</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-900 mt-2">Life at Doha Prime</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ height: '224px' }}>
                <img src={item.img} alt={item.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: item.pos }} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/projects" className="btn-primary font-sans">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* ─── BLOG POST MODAL ────────────────────────────────────── */}
      {expandedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setExpandedPost(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
            {expandedPost.image && (
              <div className="h-56 overflow-hidden">
                <img src={expandedPost.image} alt={expandedPost.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-green font-sans">{expandedPost.category}</span>
                <span className="text-forest-400 text-sm font-sans">
                  {new Date(expandedPost.date).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-forest-900 mb-4">{expandedPost.title}</h2>
              <div className="text-forest-700 text-sm leading-relaxed font-sans whitespace-pre-line">{expandedPost.content}</div>
              <p className="text-forest-500 text-xs mt-6 font-sans">By {expandedPost.author}</p>
              <button onClick={() => setExpandedPost(null)}
                className="mt-6 btn-primary w-full font-sans">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── REVIEW MEDIA MODAL ─────────────────────────────────── */}
      {expandedReview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setExpandedReview(null)}>
          <div className="w-full max-w-2xl">
            {expandedReview.mediaType === 'image' && (
              <img src={expandedReview.mediaUrl} alt="Customer review media"
                className="w-full rounded-2xl max-h-[80vh] object-contain" />
            )}
            {expandedReview.mediaType === 'video' && (
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe src={toYouTubeEmbed(expandedReview.mediaUrl)}
                  className="w-full h-full" allowFullScreen
                  title="Customer review video" />
              </div>
            )}
            <button onClick={() => setExpandedReview(null)}
              className="mt-4 w-full bg-white/10 text-white border border-white/20 py-3 rounded-xl font-sans">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
