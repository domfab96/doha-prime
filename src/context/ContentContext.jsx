import { createContext, useContext, useState, useCallback } from 'react'

// ─── Default seed data ──────────────────────────────────────────────────────

const INITIAL_POSTS = [
  {
    id: 1,
    title: 'Our First Catfish Harvest — What We Learned',
    excerpt: 'After five months of careful pond management, our first major harvest taught us more than any textbook could. Here is what we discovered about FCR, water quality, and timing.',
    content: `After five months of careful pond management, we recorded our first major catfish harvest at the Abuja farm. The experience was both rewarding and educational.

We stocked Pond B with 600 hybrid Clarias fingerlings in October and maintained a strict feeding schedule with Skretting 6mm pellets. By month four, average weight had reached 980g — right on target.

Key lessons: water quality checks must happen every 48 hours without exception, not just when fish show stress. We also discovered that the optimal feeding window is early morning (6–8am) and late afternoon (4–6pm). Feeding at midday in the Abuja heat reduced feed intake noticeably.

Our FCR came in at 1.35 — excellent for a first cycle. We attribute this to consistent feeding discipline and minimal mortality (2.9%).

Next cycle we will be stocking 700 fingerlings and introducing automated water aeration to push FCR below 1.3.`,
    category: 'Aquaculture',
    author: 'Olufemi Dominic Fabian',
    date: '2025-04-15',
    image: '/images/harvest_day.jpg',
    published: true,
  },
  {
    id: 2,
    title: 'Why We Chose Jos Plateau for Our Orchard',
    excerpt: 'The Jos Plateau offers something rare in Nigeria — a cool highland climate perfectly suited for temperate fruits. We explain our site selection process and what crops we are betting on.',
    content: `Nigeria is predominantly tropical, which limits the range of fruits that can be grown commercially. But Jos Plateau, sitting at over 1,200 metres above sea level, has average temperatures of 18–24°C — ideal for avocado, apple, and grapefruit.

We spent six months evaluating the site before committing. The key factors: soil pH of 6.2–6.8 (perfect for avocados), reliable rainfall of 1,400mm annually, and proximity to major northern markets.

Our planned crop mix is deliberately diverse: avocado (Hass and Fuerte varieties) for export potential, apple (Anna and Dorsett Golden, which are low-chill varieties suited to the region), grapefruit, date palm, and pineapple as a fast cash crop while the orchards mature.

The greenhouse will focus on tomatoes, capsicum, and herbs for the Abuja restaurant and hotel market, which currently imports most of these from Lagos or abroad.

We expect first orchard harvest by Q2 2026, with the greenhouse producing within 6 months of planting.`,
    category: 'Horticulture',
    author: 'Olufemi Dominic Fabian',
    date: '2025-05-01',
    image: '/images/jos_orchard.jpg',
    published: true,
  },
]

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Blessing Okafor',
    location: 'Wuse 2, Abuja',
    rating: 5,
    text: 'I ordered 10kg of live catfish and they were delivered within 3 hours still very fresh and active. The fish were clean and well-sized. My whole family was impressed with the quality. Will definitely be ordering again — this is the best catfish I have bought in Abuja.',
    mediaType: null,
    mediaUrl: null,
    date: '2025-04-10',
    verified: true,
  },
  {
    id: 2,
    name: 'Ahmed Musa',
    location: 'Garki, Abuja',
    rating: 5,
    text: 'The smoked catfish is excellent quality. You can taste that it has been properly prepared without any chemicals. The packaging with the Doha Prime label is also very professional. I have been recommending this to all my colleagues at the office.',
    mediaType: null,
    mediaUrl: null,
    date: '2025-04-22',
    verified: true,
  },
  {
    id: 3,
    name: 'Chidinma Eze',
    location: 'Maitama, Abuja',
    rating: 5,
    text: 'Ordered fingerlings for my own small pond and they arrived healthy with very low mortality. Olufemi even gave me advice on feed ratios. This is a business that genuinely cares about their customers. Very professional and trustworthy.',
    mediaType: null,
    mediaUrl: null,
    date: '2025-05-02',
    verified: true,
  },
]

const INITIAL_EVENTS = [
  { id: 1, date: 'Jun 15, 2025', isoDate: '2025-06-15', title: 'Q2 Harvest Day — Abuja Farm',         type: 'Harvest',  color: 'green'  },
  { id: 2, date: 'Jul 02, 2025', isoDate: '2025-07-02', title: 'Fingerling Restocking — Pond A & B',  type: 'Stocking', color: 'earth'  },
  { id: 3, date: 'Aug 20, 2025', isoDate: '2025-08-20', title: 'Jos Site Groundbreaking Ceremony',    type: 'Event',    color: 'blue'   },
  { id: 4, date: 'Sep 05, 2025', isoDate: '2025-09-05', title: 'Farm Open Day — Abuja Public Tour',   type: 'Public',   color: 'purple' },
  { id: 5, date: 'Oct 10, 2025', isoDate: '2025-10-10', title: 'Q3 Harvest & Sales Drive',            type: 'Harvest',  color: 'green'  },
  { id: 6, date: 'Nov 01, 2025', isoDate: '2025-11-01', title: 'Greenhouse First Planting — Jos',     type: 'Planting', color: 'teal'   },
]

// ─── Persistence helpers ─────────────────────────────────────────────────────
const load  = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback } }
const save  = (key, val)      => { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }

// ─── Context ─────────────────────────────────────────────────────────────────
const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [posts,   setPosts]   = useState(() => load('dpv_posts',   INITIAL_POSTS))
  const [reviews, setReviews] = useState(() => load('dpv_reviews', INITIAL_REVIEWS))
  const [events,  setEvents]  = useState(() => load('dpv_events',  INITIAL_EVENTS))

  // ── Blog ──────────────────────────────────────────────────────────────────
  const addPost    = useCallback(post => { const next = [...posts,   { ...post,   id: Date.now() }]; setPosts(next);   save('dpv_posts',   next) }, [posts])
  const updatePost = useCallback(post => { const next = posts.map(p => p.id === post.id ? post : p); setPosts(next);   save('dpv_posts',   next) }, [posts])
  const deletePost = useCallback(id   => { const next = posts.filter(p => p.id !== id);              setPosts(next);   save('dpv_posts',   next) }, [posts])

  // ── Reviews ───────────────────────────────────────────────────────────────
  const addReview    = useCallback(r => { const next = [...reviews,   { ...r,   id: Date.now() }]; setReviews(next); save('dpv_reviews', next) }, [reviews])
  const updateReview = useCallback(r => { const next = reviews.map(x => x.id === r.id ? r : x);   setReviews(next); save('dpv_reviews', next) }, [reviews])
  const deleteReview = useCallback(id => { const next = reviews.filter(x => x.id !== id);          setReviews(next); save('dpv_reviews', next) }, [reviews])

  // ── Events ────────────────────────────────────────────────────────────────
  const addEvent    = useCallback(e => { const next = [...events,   { ...e,   id: Date.now() }]; setEvents(next); save('dpv_events', next) }, [events])
  const updateEvent = useCallback(e => { const next = events.map(x => x.id === e.id ? e : x);   setEvents(next); save('dpv_events', next) }, [events])
  const deleteEvent = useCallback(id => { const next = events.filter(x => x.id !== id);          setEvents(next); save('dpv_events', next) }, [events])

  const value = {
    posts, addPost, updatePost, deletePost,
    reviews, addReview, updateReview, deleteReview,
    events, addEvent, updateEvent, deleteEvent,
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>')
  return ctx
}
