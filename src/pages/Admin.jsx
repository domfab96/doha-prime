import { useState, useCallback } from 'react'
import { useStore }   from '../context/StoreContext'
import { useContent } from '../context/ContentContext'
import { resizeImageToBase64, wordCount } from '../utils/imageUtils'

// ─── Shared helpers ───────────────────────────────────────────────────────────
const DEMO_PIN = '8576'

const Input = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-sm font-medium text-forest-700 mb-1 font-sans">{label}</label>}
    <input className="w-full border border-forest-200 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-500" {...props} />
  </div>
)
const Textarea = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-sm font-medium text-forest-700 mb-1 font-sans">{label}</label>}
    <textarea className="w-full border border-forest-200 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none" {...props} />
  </div>
)
const Select = ({ label, options, ...props }) => (
  <div>
    {label && <label className="block text-sm font-medium text-forest-700 mb-1 font-sans">{label}</label>}
    <select className="w-full border border-forest-200 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-500" {...props}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
)
const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <span className={`relative inline-block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-forest-600' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </span>
    <span className="text-sm font-medium text-forest-700 font-sans">{label}</span>
  </label>
)
const Btn = ({ children, onClick, variant = 'primary', className = '' }) => {
  const cls = {
    primary:  'bg-forest-700 hover:bg-forest-800 text-white',
    secondary:'bg-earth-500 hover:bg-earth-600 text-white',
    danger:   'bg-red-500 hover:bg-red-600 text-white',
    outline:  'border border-forest-300 text-forest-700 hover:bg-forest-50',
  }[variant]
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium font-sans transition-colors ${cls} ${className}`}>
      {children}
    </button>
  )
}

async function pickImage(cb) {
  const input = document.createElement('input')
  input.type = 'file'; input.accept = 'image/*'
  input.onchange = async e => {
    const file = e.target.files[0]
    if (!file) return
    try { const b64 = await resizeImageToBase64(file); cb(b64) }
    catch (err) { alert('Image error: ' + err.message) }
  }
  input.click()
}

// ─── Products Panel ───────────────────────────────────────────────────────────
function ProductsPanel() {
  const { products, saveProduct, addProduct, deleteProduct } = useStore()
  const [editing, setEditing] = useState(null)   // null = closed, 'new' = new form, id = edit form
  const blank = { name:'', price:'', unit:'kg', category:'Live Fish', description:'', inStock:true, image:null }
  const [form,   setForm]   = useState(blank)
  const [saved,  setSaved]  = useState({})

  const openNew  = () => { setForm(blank); setEditing('new') }
  const openEdit = p  => { setForm({ ...p }); setEditing(p.id) }
  const close    = () => { setEditing(null); setForm(blank) }

  const handleSave = () => {
    if (!form.name || !form.price) { alert('Name and price are required'); return }
    if (editing === 'new') {
      addProduct({ ...form, price: Number(form.price), badge: null })
    } else {
      saveProduct({ ...form, price: Number(form.price) })
      setSaved(s => ({ ...s, [form.id]: true }))
      setTimeout(() => setSaved(s => ({ ...s, [form.id]: false })), 2500)
    }
    close()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">Products</h2>
          <p className="text-forest-500 text-sm font-sans mt-0.5">Add, edit, or remove products from your store.</p>
        </div>
        <Btn onClick={openNew} variant="primary">+ Add New Product</Btn>
      </div>

      {/* Add / Edit form */}
      {editing !== null && (
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-forest-900">
            {editing === 'new' ? 'New Product' : 'Edit Product'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Product Name *" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="e.g. Smoked Tilapia" />
            <div className="flex gap-3">
              <div className="flex-1">
                <Input label="Price (₦) *" type="number" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} placeholder="e.g. 4500" />
              </div>
              <Select label="Unit" value={form.unit} onChange={e => setForm(f => ({...f, unit: e.target.value}))}
                options={['kg','piece','pack','dozen','bag']} />
            </div>
            <Select label="Category" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
              options={['Live Fish','Processed','Fingerlings','Other']} />
            <div className="flex items-end">
              <Toggle label="In Stock" checked={form.inStock} onChange={e => setForm(f => ({...f, inStock: e.target.checked}))} />
            </div>
          </div>
          <Textarea label="Description" rows={3} value={form.description}
            onChange={e => setForm(f => ({...f, description: e.target.value}))}
            placeholder="Describe the product — quality, size, usage..." />

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2 font-sans">
              Product Image <span className="text-forest-400 font-normal">(auto-resized to 800×600px)</span>
            </label>
            {form.image && (
              <div className="mb-2 rounded-xl overflow-hidden w-40 h-28 border border-forest-200">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
            <Btn variant="outline" onClick={() => pickImage(b64 => setForm(f => ({...f, image: b64})))}>
              📷 {form.image ? 'Change Photo' : 'Upload Photo'}
            </Btn>
            {form.image && <Btn variant="outline" className="ml-2" onClick={() => setForm(f => ({...f, image: null}))}>✕ Remove</Btn>}
          </div>

          <div className="flex gap-3 pt-2">
            <Btn onClick={handleSave}>{editing === 'new' ? 'Add Product' : 'Save Changes'}</Btn>
            <Btn variant="outline" onClick={close}>Cancel</Btn>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-forest-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-forest-700 text-white">
                <th className="px-4 py-3 text-left font-semibold font-sans">Product</th>
                <th className="px-4 py-3 text-left font-semibold font-sans">Price</th>
                <th className="px-4 py-3 text-left font-semibold font-sans">Category</th>
                <th className="px-4 py-3 text-center font-semibold font-sans">In Stock</th>
                <th className="px-4 py-3 text-left font-semibold font-sans">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} className={`border-t border-forest-50 hover:bg-forest-50 ${i%2===0?'bg-white':'bg-cream/40'}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image
                        ? <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        : <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">🐟</div>}
                      <span className="font-medium text-forest-800 font-sans">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-sans tabular-nums">₦{Number(p.price).toLocaleString()}/{p.unit}</td>
                  <td className="px-4 py-3 font-sans">{p.category}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full font-sans ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.inStock ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Btn variant="outline" onClick={() => openEdit(p)}>
                      {saved[p.id] ? '✓ Saved' : 'Edit'}
                    </Btn>
                    <Btn variant="danger" onClick={() => { if(confirm(`Delete "${p.name}"?`)) deleteProduct(p.id) }}>Delete</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Blog Panel ───────────────────────────────────────────────────────────────
function BlogPanel() {
  const { posts, addPost, updatePost, deletePost } = useContent()
  const [editing, setEditing] = useState(null)
  const blank = { title:'', excerpt:'', content:'', category:'Aquaculture', author:'Olufemi Dominic Fabian', date: new Date().toISOString().slice(0,10), image:null, published:false }
  const [form, setForm] = useState(blank)

  const openNew  = () => { setForm(blank); setEditing('new') }
  const openEdit = p  => { setForm({ ...p }); setEditing(p.id) }
  const close    = () => { setEditing(null) }

  const handleSave = () => {
    if (!form.title || !form.content) { alert('Title and content are required'); return }
    if (editing === 'new') addPost(form)
    else updatePost(form)
    close()
  }

  const contentWords = wordCount(form.content)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">Blog Posts</h2>
          <p className="text-forest-500 text-sm font-sans mt-0.5">Write posts that appear on the Blog page and Homepage preview.</p>
        </div>
        <Btn onClick={openNew}>+ New Post</Btn>
      </div>

      {/* Editor */}
      {editing !== null && (
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-forest-900">{editing === 'new' ? 'New Post' : 'Edit Post'}</h3>
          <Input label="Post Title *" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g. How We Improved Our FCR to 1.3" />
          <Textarea label="Short Excerpt (shown on homepage preview)" rows={2} value={form.excerpt}
            onChange={e => setForm(f => ({...f, excerpt: e.target.value}))}
            placeholder="One or two sentences summarising the post..." />
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-forest-700 font-sans">Full Post Content *</label>
              <span className={`text-xs font-sans ${contentWords > 1800 ? 'text-red-500' : 'text-forest-400'}`}>
                {contentWords} words
              </span>
            </div>
            <textarea
              className="w-full border border-forest-200 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
              rows={10} value={form.content}
              onChange={e => setForm(f => ({...f, content: e.target.value}))}
              placeholder="Write your full post here. Use line breaks for paragraphs." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select label="Category" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
              options={['Aquaculture','Horticulture','Farm Management','Market News']} />
            <Input label="Author" value={form.author} onChange={e => setForm(f => ({...f, author: e.target.value}))} />
            <Input label="Date" type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} />
          </div>
          {/* Cover image */}
          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2 font-sans">
              Cover Image <span className="text-forest-400 font-normal">(auto-resized to 800×600px)</span>
            </label>
            {form.image && (
              <div className="mb-2 rounded-xl overflow-hidden w-48 h-32 border border-forest-200">
                <img src={form.image} alt="cover" className="w-full h-full object-cover" />
              </div>
            )}
            <Btn variant="outline" onClick={() => pickImage(b64 => setForm(f => ({...f, image: b64})))}>
              📷 {form.image ? 'Change Cover' : 'Upload Cover Image'}
            </Btn>
            {form.image && <Btn variant="outline" className="ml-2" onClick={() => setForm(f => ({...f, image: null}))}>✕ Remove</Btn>}
          </div>
          <Toggle label="Published (visible on website)" checked={form.published} onChange={e => setForm(f => ({...f, published: e.target.checked}))} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={handleSave}>{editing === 'new' ? 'Publish Post' : 'Save Changes'}</Btn>
            <Btn variant="outline" onClick={close}>Cancel</Btn>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="bg-white border border-forest-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
            {p.image
              ? <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              : <div className="w-14 h-14 bg-forest-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📝</div>}
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-forest-900 text-base truncate">{p.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-green text-xs font-sans">{p.category}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full font-sans ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {p.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-forest-400 text-xs font-sans">{p.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="outline" onClick={() => openEdit(p)}>Edit</Btn>
              <Btn variant="danger" onClick={() => { if(confirm('Delete this post?')) deletePost(p.id) }}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Reviews Panel ────────────────────────────────────────────────────────────
function ReviewsPanel() {
  const { reviews, addReview, updateReview, deleteReview } = useContent()
  const [editing, setEditing] = useState(null)
  const blank = { name:'', location:'', rating:5, text:'', mediaType:null, mediaUrl:null, date: new Date().toISOString().slice(0,10), verified:true }
  const [form, setForm] = useState(blank)

  const openNew  = () => { setForm(blank); setEditing('new') }
  const openEdit = r  => { setForm({ ...r }); setEditing(r.id) }
  const close    = () => { setEditing(null) }

  const handleSave = () => {
    if (!form.name || !form.text) { alert('Customer name and review text are required'); return }
    if (editing === 'new') addReview(form)
    else updateReview(form)
    close()
  }

  const words = wordCount(form.text)
  const MAX_WORDS = 500

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">Customer Reviews</h2>
          <p className="text-forest-500 text-sm font-sans mt-0.5">Add reviews from WhatsApp customers. They appear on the homepage.</p>
        </div>
        <Btn onClick={openNew}>+ Add Review</Btn>
      </div>

      {/* Media specs notice */}
      <div className="bg-earth-50 border border-earth-200 rounded-xl p-4 text-sm font-sans text-earth-800">
        <p className="font-semibold mb-1">📐 Media dimensions guide</p>
        <ul className="space-y-0.5 text-xs">
          <li>• <strong>Images:</strong> Recommended 800×600px (4:3 landscape) · Any size accepted (auto-resized) · JPG or PNG</li>
          <li>• <strong>Videos:</strong> Paste a YouTube link or direct MP4 URL · Max review text: {MAX_WORDS} words</li>
        </ul>
      </div>

      {/* Editor */}
      {editing !== null && (
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-forest-900">{editing === 'new' ? 'New Review' : 'Edit Review'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Customer Name *" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="e.g. Blessing Okafor" />
            <Input label="Location" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} placeholder="e.g. Wuse 2, Abuja" />
          </div>
          {/* Star rating */}
          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2 font-sans">Star Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setForm(f => ({...f, rating: n}))}
                  className={`text-2xl transition-transform hover:scale-110 ${n <= form.rating ? 'text-earth-400' : 'text-gray-300'}`}>
                  ★
                </button>
              ))}
            </div>
          </div>
          {/* Review text */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-forest-700 font-sans">Review Text * <span className="font-normal text-forest-400">(max {MAX_WORDS} words)</span></label>
              <span className={`text-xs font-sans ${words > MAX_WORDS ? 'text-red-500 font-bold' : 'text-forest-400'}`}>
                {words}/{MAX_WORDS} words
              </span>
            </div>
            <textarea rows={5}
              className="w-full border border-forest-200 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
              value={form.text} onChange={e => setForm(f => ({...f, text: e.target.value}))}
              placeholder="Paste the customer's review exactly as they wrote it on WhatsApp..." />
            {words > MAX_WORDS && <p className="text-red-500 text-xs mt-1 font-sans">Too many words — please shorten the review.</p>}
          </div>
          {/* Media */}
          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2 font-sans">Media (optional)</label>
            <div className="flex gap-3 mb-3">
              {[['none','None'],['image','Image'],['video','Video']].map(([val, lbl]) => (
                <button key={val} onClick={() => setForm(f => ({...f, mediaType: val === 'none' ? null : val, mediaUrl: null}))}
                  className={`px-4 py-2 rounded-lg text-sm font-sans border transition-colors ${form.mediaType === (val === 'none' ? null : val) ? 'bg-forest-700 text-white border-forest-700' : 'border-forest-200 text-forest-700 hover:border-forest-400'}`}>
                  {lbl}
                </button>
              ))}
            </div>
            {form.mediaType === 'image' && (
              <div className="space-y-2">
                {form.mediaUrl && (
                  <div className="w-40 h-28 rounded-xl overflow-hidden border border-forest-200">
                    <img src={form.mediaUrl} alt="review" className="w-full h-full object-cover" />
                  </div>
                )}
                <Btn variant="outline" onClick={() => pickImage(b64 => setForm(f => ({...f, mediaUrl: b64})))}>
                  📷 Upload Customer Photo
                </Btn>
                <p className="text-xs text-forest-400 font-sans">Recommended: 800×600px · Auto-resized on upload · JPG/PNG</p>
              </div>
            )}
            {form.mediaType === 'video' && (
              <div className="space-y-2">
                <Input label="YouTube or Video URL" value={form.mediaUrl || ''}
                  onChange={e => setForm(f => ({...f, mediaUrl: e.target.value}))}
                  placeholder="https://youtube.com/watch?v=... or direct video link" />
                <p className="text-xs text-forest-400 font-sans">Paste a YouTube link (recommended) or direct MP4 URL.</p>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <Input label="Date" type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} />
            <div className="flex items-end pb-0.5">
              <Toggle label="Mark as Verified" checked={form.verified} onChange={e => setForm(f => ({...f, verified: e.target.checked}))} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Btn onClick={handleSave} className={words > MAX_WORDS ? 'opacity-50 pointer-events-none' : ''}>
              {editing === 'new' ? 'Add Review' : 'Save Changes'}
            </Btn>
            <Btn variant="outline" onClick={close}>Cancel</Btn>
          </div>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="bg-white border border-forest-100 rounded-xl p-4 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 bg-forest-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 font-sans">
              {r.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-forest-900 font-sans text-sm">{r.name}</p>
                <span className="text-earth-400 text-xs">{'★'.repeat(r.rating)}</span>
                {r.verified && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-sans">✓</span>}
              </div>
              <p className="text-forest-600 text-xs mt-1 font-sans line-clamp-2">{r.text}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Btn variant="outline" onClick={() => openEdit(r)}>Edit</Btn>
              <Btn variant="danger" onClick={() => { if(confirm('Delete this review?')) deleteReview(r.id) }}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Events Panel ─────────────────────────────────────────────────────────────
function EventsPanel() {
  const { events, addEvent, updateEvent, deleteEvent } = useContent()
  const [form, setForm] = useState({ title:'', date:'', isoDate:'', type:'Harvest', color:'green' })
  const [editing, setEditing] = useState(null)

  const openNew  = () => { setForm({ title:'', date:'', isoDate:new Date().toISOString().slice(0,10), type:'Harvest', color:'green' }); setEditing('new') }
  const openEdit = e  => { setForm({ ...e }); setEditing(e.id) }
  const close    = () => setEditing(null)

  const handleSave = () => {
    if (!form.title || !form.isoDate) { alert('Title and date are required'); return }
    const display = new Date(form.isoDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})
    const complete = { ...form, date: display }
    if (editing === 'new') addEvent(complete)
    else updateEvent(complete)
    close()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">Farm Events</h2>
          <p className="text-forest-500 text-sm font-sans mt-0.5">Upcoming events show on the Homepage and Projects page.</p>
        </div>
        <Btn onClick={openNew}>+ Add Event</Btn>
      </div>

      {editing !== null && (
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-forest-900">{editing === 'new' ? 'New Event' : 'Edit Event'}</h3>
          <Input label="Event Title *" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g. Q3 Harvest Day — Abuja Farm" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date *" type="date" value={form.isoDate} onChange={e => setForm(f => ({...f, isoDate: e.target.value}))} />
            <Select label="Event Type" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}
              options={['Harvest','Stocking','Planting','Event','Public','Other']} />
          </div>
          <Select label="Badge Colour" value={form.color} onChange={e => setForm(f => ({...f, color: e.target.value}))}
            options={['green','earth','blue','purple','teal']} />
          <div className="flex gap-3">
            <Btn onClick={handleSave}>{editing === 'new' ? 'Add Event' : 'Save'}</Btn>
            <Btn variant="outline" onClick={close}>Cancel</Btn>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {events.sort((a,b) => new Date(a.isoDate) - new Date(b.isoDate)).map(ev => (
          <div key={ev.id} className="bg-white border border-forest-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="text-forest-400 text-sm font-sans font-medium w-24 flex-shrink-0">{ev.date}</div>
            <div className="flex-1">
              <p className="font-medium text-forest-800 font-sans text-sm">{ev.title}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full font-sans bg-forest-100 text-forest-700 flex-shrink-0">
              {ev.type}
            </span>
            <div className="flex gap-2">
              <Btn variant="outline" onClick={() => openEdit(ev)}>Edit</Btn>
              <Btn variant="danger" onClick={() => { if(confirm('Delete this event?')) deleteEvent(ev.id) }}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dashboard Panel ──────────────────────────────────────────────────────────
function DashboardPanel({ setActive }) {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-forest-900">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon:'🐟', title:'Products',     desc:'Add, edit, price, and remove store products.', id:'products' },
          { icon:'📝', title:'Blog',         desc:'Write farm knowledge posts visible on homepage.', id:'blog' },
          { icon:'⭐', title:'Reviews',      desc:'Add customer testimonials from WhatsApp.',       id:'reviews' },
          { icon:'🗓️', title:'Events',       desc:'Manage upcoming farm events.',                   id:'events' },
          { icon:'🌾', title:'Add Project',  desc:'Log new farm projects.',                         id:'project' },
          { icon:'👥', title:'Manage Staff', desc:'Add or edit team member profiles.',              id:'staff' },
        ].map(({ icon, title, desc, id }) => (
          <div key={id} onClick={() => setActive(id)}
            className="bg-white rounded-2xl p-5 border border-forest-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <span className="text-2xl block mb-3">{icon}</span>
            <h3 className="font-serif text-base font-bold text-forest-900 group-hover:text-forest-700">{title}</h3>
            <p className="text-forest-500 text-sm mt-1 font-sans">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Staff Panel (existing) ───────────────────────────────────────────────────
function StaffPanel() {
  const staff = [
    { name:'Olufemi Dominic Fabian', role:'Founder & CEO',     status:'Active' },
    { name:'Amaka Okonkwo',          role:'Farm Manager',       status:'Active' },
    { name:'Bello Abdullahi',         role:'Horticulture Lead', status:'Active' },
    { name:'Chisom Nwachukwu',        role:'Sales & Marketing', status:'Active' },
    { name:'Ibrahim Musa',            role:'Field Technician',  status:'Active' },
    { name:'Fatima Yusuf',            role:'Records & Admin',   status:'Active' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-2xl font-bold text-forest-900">Manage Staff</h2>
        <Btn>+ Add Member</Btn>
      </div>
      <div className="bg-white rounded-2xl border border-forest-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-forest-700 text-white">
            <th className="px-5 py-3 text-left font-semibold font-sans">Name</th>
            <th className="px-5 py-3 text-left font-semibold font-sans">Role</th>
            <th className="px-5 py-3 text-left font-semibold font-sans">Status</th>
            <th className="px-5 py-3 text-left font-semibold font-sans">Actions</th>
          </tr></thead>
          <tbody>
            {staff.map(({ name, role, status }) => (
              <tr key={name} className="border-t border-forest-50 hover:bg-forest-50">
                <td className="px-5 py-3 font-medium text-forest-800 font-sans">{name}</td>
                <td className="px-5 py-3 text-forest-600 font-sans">{role}</td>
                <td className="px-5 py-3"><span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full font-sans">{status}</span></td>
                <td className="px-5 py-3 flex gap-2">
                  <button className="text-xs text-forest-600 hover:text-forest-900 underline font-sans">Edit</button>
                  <button className="text-xs text-red-400 hover:text-red-600 underline font-sans">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Main Admin ───────────────────────────────────────────────────────────────
const SIDEBAR = [
  { icon:'📊', label:'Dashboard', id:'dashboard' },
  { icon:'🐟', label:'Products',  id:'products' },
  { icon:'📝', label:'Blog',      id:'blog' },
  { icon:'⭐', label:'Reviews',   id:'reviews' },
  { icon:'🗓️', label:'Events',    id:'events' },
  { icon:'🌾', label:'Add Project', id:'project' },
  { icon:'👥', label:'Staff',     id:'staff' },
]

export default function Admin() {
  const [active,   setActive]   = useState('dashboard')
  const [sidebar,  setSidebar]  = useState(false)
  const [authed,   setAuthed]   = useState(false)
  const [pin,      setPin]      = useState('')

  if (!authed) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-cream">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-forest-100">
          <div className="text-center mb-6">
            <img src="/images/doha-logo.jpg" alt="Doha Prime" className="w-16 h-16 rounded-xl mx-auto mb-4 object-cover" />
            <h2 className="font-serif text-2xl font-bold text-forest-900">Admin Access</h2>
            <p className="text-forest-500 text-sm mt-1 font-sans">Enter your PIN to continue</p>
          </div>
          <input type="password" placeholder="Enter PIN" value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && pin === DEMO_PIN && setAuthed(true)}
            className="w-full border border-forest-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-forest-500 mb-4 font-sans" />
          <button onClick={() => pin === DEMO_PIN ? setAuthed(true) : alert('Incorrect PIN. Demo: 1234')}
            className="btn-primary w-full py-3 font-sans">Enter Dashboard →</button>
          <p className="text-center text-xs text-forest-400 mt-3 font-sans">Demo PIN: <strong>1234</strong></p>
        </div>
      </div>
    )
  }

  const panels = {
    dashboard: <DashboardPanel setActive={setActive} />,
    products:  <ProductsPanel />,
    blog:      <BlogPanel />,
    reviews:   <ReviewsPanel />,
    events:    <EventsPanel />,
    staff:     <StaffPanel />,
    project:   <div className="space-y-4"><h2 className="font-serif text-2xl font-bold text-forest-900">Add New Project</h2><p className="text-forest-500 font-sans text-sm">Project management coming soon.</p></div>,
  }

  return (
    <div className="min-h-screen pt-20 flex bg-cream">
      <aside className={`fixed top-20 left-0 bottom-0 z-40 w-56 bg-forest-900 flex flex-col transition-transform duration-300
        ${sidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:top-auto lg:bottom-auto lg:z-auto`}>
        <div className="p-4 border-b border-forest-800">
          <p className="font-serif text-white font-semibold text-sm">Admin Panel</p>
          <p className="text-forest-400 text-xs mt-0.5 font-sans">Doha Prime Ventures</p>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {SIDEBAR.map(({ icon, label, id }) => (
            <button key={id} onClick={() => { setActive(id); setSidebar(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium font-sans transition-colors
                ${active === id ? 'bg-forest-700 text-white border-r-2 border-earth-400' : 'text-forest-300 hover:bg-forest-800 hover:text-white'}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-forest-800">
          <button onClick={() => setAuthed(false)}
            className="w-full text-forest-400 hover:text-white text-xs flex items-center gap-2 transition-colors font-sans">
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {sidebar && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebar(false)} />}

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-forest-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => setSidebar(true)} className="lg:hidden p-2 text-forest-600 hover:text-forest-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="font-serif text-lg font-bold text-forest-900">
            {SIDEBAR.find(s => s.id === active)?.icon} {SIDEBAR.find(s => s.id === active)?.label ?? 'Dashboard'}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-forest-500 font-sans">Live</span>
          </div>
        </div>
        <div className="p-6 lg:p-8 max-w-5xl">
          {panels[active] ?? panels.dashboard}
        </div>
      </div>
    </div>
  )
}
