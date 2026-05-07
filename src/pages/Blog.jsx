import { useState } from 'react'
import { useContent } from '../context/ContentContext'

const CATEGORIES = ['All', 'Aquaculture', 'Horticulture', 'Farm Management', 'Market News']

export default function Blog() {
  const { posts } = useContent()
  const [cat,  setCat]  = useState('All')
  const [post, setPost] = useState(null)

  const visible = posts
    .filter(p => p.published)
    .filter(p => cat === 'All' || p.category === cat)

  return (
    <div className="pt-20">
      <section className="bg-forest-900 py-20">
        <div className="section-container text-center text-white">
          <span className="badge-earth mb-4 font-sans">Knowledge Hub</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">Farm Blog</h1>
          <p className="text-forest-300 mt-4 max-w-xl mx-auto font-sans font-light">
            Insights on aquaculture, horticulture, and building a profitable farm business in Nigeria.
          </p>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="section-container">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium font-sans transition-all
                  ${cat === c ? 'bg-forest-700 text-white shadow-sm' : 'bg-white border border-forest-200 text-forest-700 hover:border-forest-400'}`}>
                {c}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="text-center py-20 text-forest-400">
              <span className="text-4xl block mb-3">📝</span>
              <p className="font-sans">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map(p => (
                <article key={p.id} className="card overflow-hidden group cursor-pointer"
                  onClick={() => setPost(p)}>
                  {p.image && (
                    <div className="overflow-hidden h-48">
                      <img src={p.image} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-green text-xs font-sans">{p.category}</span>
                      <span className="text-forest-400 text-xs font-sans">
                        {new Date(p.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-forest-900 mb-2 leading-snug group-hover:text-forest-700">
                      {p.title}
                    </h2>
                    <p className="text-forest-600 text-sm leading-relaxed font-sans line-clamp-3">{p.excerpt}</p>
                    <p className="text-forest-700 text-sm font-semibold mt-4 font-sans">Read more →</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Post modal */}
      {post && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setPost(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
            {post.image && (
              <div className="h-56 overflow-hidden rounded-t-2xl">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-green font-sans">{post.category}</span>
                <span className="text-forest-400 text-sm font-sans">
                  {new Date(post.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-forest-900 mb-4">{post.title}</h2>
              <div className="text-forest-700 text-sm leading-relaxed font-sans whitespace-pre-line">{post.content}</div>
              <p className="text-forest-500 text-xs mt-6 font-sans">By {post.author}</p>
              <button onClick={() => setPost(null)} className="mt-6 btn-primary w-full font-sans">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
