import { useState } from 'react'
import { useFarmData } from '../hooks/useFarmData'

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmt  = n => Number(n || 0).toLocaleString('en-NG')
const fmtN = n => `₦${fmt(n)}`

function fcrColor(fcr) {
  if (!fcr) return 'text-forest-400'
  if (fcr < 1.6)  return 'text-green-600'
  if (fcr < 2.2)  return 'text-yellow-600'
  return 'text-red-500'
}
function fcrLabel(fcr) {
  if (!fcr) return '—'
  if (fcr < 1.6)  return 'Excellent'
  if (fcr < 2.2)  return 'Good'
  return 'Review'
}

function WQBadge({ wq }) {
  const map = {
    Good: 'bg-green-100 text-green-800',
    Fair: 'bg-yellow-100 text-yellow-800',
    Poor: 'bg-red-100 text-red-800',
  }
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[wq] ?? 'bg-gray-100 text-gray-600'}`}>
      {wq || '—'}
    </span>
  )
}

function SyncDot({ status }) {
  const cfg = {
    connecting: { dot: 'bg-yellow-400 animate-pulse', label: 'Connecting…' },
    live:       { dot: 'bg-green-500 animate-pulse',  label: 'Live' },
    error:      { dot: 'bg-red-500',                  label: 'Offline' },
  }[status] ?? { dot: 'bg-gray-400', label: '' }
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      <span className="text-xs text-forest-500">{cfg.label}</span>
    </span>
  )
}

// ─── Sub-sections ────────────────────────────────────────────────────────────

function FarmTotals({ totals }) {
  const cards = [
    { label: 'Active Ponds',   value: totals.activePonds,              unit: '',     color: 'text-forest-800' },
    { label: 'Fish Alive (est.)', value: fmt(totals.totalFishAlive),   unit: 'fish', color: 'text-forest-800' },
    { label: 'Total Mortality',value: fmt(totals.totalMortality),      unit: 'fish', color: 'text-red-600' },
    { label: 'Harvests Done',  value: totals.cyclesDone,               unit: '',     color: 'text-forest-800' },
    { label: 'Total Revenue',  value: fmtN(totals.totalRevenue),       unit: '',     color: 'text-green-700' },
    { label: 'Net Profit',     value: fmtN(totals.totalProfit),        unit: '',     color: totals.totalProfit >= 0 ? 'text-green-700' : 'text-red-600' },
    { label: 'Avg FCR',        value: totals.avgFCR ?? '—',            unit: ':1',   color: fcrColor(totals.avgFCR) },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
      {cards.map(({ label, value, unit, color }) => (
        <div key={label} className="bg-white rounded-xl border border-forest-100 p-4 shadow-sm">
          <p className="text-forest-500 text-xs uppercase tracking-wider font-medium mb-1">{label}</p>
          <p className={`font-serif text-xl font-bold ${color}`}>
            {value}<span className="text-sm font-normal text-forest-400 ml-0.5">{unit}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

function PondCard({ pond, onClick }) {
  const { batch, metrics, todayLog, name, capacity } = pond
  if (!batch.active) {
    return (
      <div onClick={onClick}
        className="bg-white border border-dashed border-forest-200 rounded-xl p-5 text-center cursor-pointer hover:border-forest-400 transition-colors">
        <span className="text-3xl block mb-2">🐟</span>
        <p className="font-semibold text-forest-700">{name}</p>
        <p className="text-forest-400 text-xs mt-1">No active batch</p>
        <p className="text-forest-300 text-xs">Capacity: {fmt(capacity)}</p>
      </div>
    )
  }

  const pct = metrics.capacityUsed ?? 0
  const barColor = pct > 90 ? 'bg-red-400' : pct > 70 ? 'bg-yellow-400' : 'bg-forest-500'

  return (
    <div onClick={onClick}
      className="bg-white border border-forest-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex justify-between items-start">
        <div>
          <p className="font-serif font-bold text-forest-900 text-lg">{name}</p>
          <p className="text-xs text-forest-500">{batch.stage} · stocked {batch.dateStocked}</p>
        </div>
        <span className="bg-forest-100 text-forest-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          Active
        </span>
      </div>
      {/* Capacity bar */}
      <div className="px-4 pb-2">
        <div className="flex justify-between text-xs text-forest-400 mb-1">
          <span>{fmt(parseInt(batch.count))} stocked</span>
          <span>{pct}% capacity</span>
        </div>
        <div className="h-1.5 bg-forest-100 rounded-full">
          <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-forest-100 border-t border-forest-100 text-center">
        {[
          { label: 'Days',     value: metrics.daysStocked ?? '—' },
          { label: 'Alive',    value: fmt(metrics.estimatedAlive) },
          { label: 'FCR',      value: metrics.fcr ?? '—', color: fcrColor(metrics.fcr) },
        ].map(({ label, value, color }) => (
          <div key={label} className="py-3">
            <p className={`font-bold text-sm ${color ?? 'text-forest-800'}`}>{value}</p>
            <p className="text-forest-400 text-xs">{label}</p>
          </div>
        ))}
      </div>
      {/* Today's log status */}
      <div className={`px-4 py-2 border-t text-xs font-medium flex items-center gap-1.5
        ${todayLog ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
        <span>{todayLog ? '✓' : '⚠️'}</span>
        {todayLog
          ? `Today: ${todayLog.feed}kg feed · ${todayLog.mort} deaths · WQ: ${todayLog.wq}`
          : 'No log entry for today yet'}
      </div>
    </div>
  )
}

function PondDetailModal({ pond, onClose }) {
  const { batch, logs, metrics, name, capacity } = pond
  if (!pond) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-forest-200 rounded-full" />
        </div>
        {/* Header */}
        <div className="px-6 py-4 border-b border-forest-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-serif text-xl font-bold text-forest-900">{name}</h2>
            {batch.active && (
              <p className="text-xs text-forest-500">{batch.stage} · {fmt(batch.count)} stocked · {metrics.daysStocked} days</p>
            )}
          </div>
          <button onClick={onClose} className="text-forest-400 hover:text-forest-700 p-2">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {batch.active ? (
            <>
              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Total Feed',  value: `${metrics.totalFeedKg.toFixed(1)} kg` },
                  { label: 'Mortality',   value: fmt(metrics.totalMortality), color: 'text-red-600' },
                  { label: 'Alive (est.)',value: fmt(metrics.estimatedAlive), color: 'text-forest-700' },
                  { label: 'Avg Weight',  value: metrics.lastSampleWeight ? `${metrics.lastSampleWeight}g` : '—' },
                  { label: 'FCR',         value: metrics.fcr ?? '—', color: fcrColor(metrics.fcr),
                    sub: fcrLabel(metrics.fcr) },
                  { label: 'Capacity',    value: `${metrics.capacityUsed}%` },
                  { label: 'Fish Cost',   value: fmtN(batch.fishCost || 0) },
                  { label: 'Date Stocked',value: batch.dateStocked },
                ].map(({ label, value, color, sub }) => (
                  <div key={label} className="bg-forest-50 rounded-xl p-3 border border-forest-100">
                    <p className="text-forest-500 text-xs mb-1">{label}</p>
                    <p className={`font-bold text-sm ${color ?? 'text-forest-900'}`}>{value}</p>
                    {sub && <p className="text-xs text-forest-400">{sub}</p>}
                  </div>
                ))}
              </div>

              {/* Daily logs */}
              <div>
                <h3 className="font-serif font-semibold text-forest-800 mb-3">Daily Log History
                  <span className="text-forest-400 font-sans font-normal text-sm ml-2">({logs.length} entries)</span>
                </h3>
                {logs.length === 0 ? (
                  <p className="text-forest-400 text-sm italic">No logs yet for this batch.</p>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {logs.map((log, i) => (
                      <div key={i} className="bg-white border border-forest-100 rounded-xl p-3 text-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-forest-800">{log.date}</span>
                          <div className="flex items-center gap-2">
                            <WQBadge wq={log.wq} />
                            {log.time && <span className="text-forest-400 text-xs">{log.time}</span>}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-forest-50 rounded-lg p-2">
                            <p className="text-xs text-forest-500">Feed</p>
                            <p className="font-bold text-forest-800">{log.feed}kg</p>
                          </div>
                          <div className="bg-red-50 rounded-lg p-2">
                            <p className="text-xs text-red-400">Deaths</p>
                            <p className="font-bold text-red-600">{log.mort}</p>
                          </div>
                          <div className="bg-earth-50 rounded-lg p-2">
                            <p className="text-xs text-earth-500">Avg Wt</p>
                            <p className="font-bold text-earth-700">{log.sampleWeight ? `${log.sampleWeight}g` : '—'}</p>
                          </div>
                        </div>
                        {log.notes && (
                          <p className="text-forest-500 text-xs mt-2 italic">"{log.notes}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <span className="text-5xl block mb-3">🐟</span>
              <p className="text-forest-500">No active batch in this pond.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function HarvestTable({ harvests }) {
  if (!harvests.length) {
    return (
      <div className="text-center py-12 text-forest-400">
        <span className="text-4xl block mb-3">🎣</span>
        <p>No harvests recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-forest-700 text-white">
            {['Date', 'Pond', 'Weight (kg)', 'Revenue', 'Costs', 'Profit/Loss', 'FCR', 'Fish Count'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {harvests.map((h, i) => (
            <tr key={i} className={`border-t border-forest-50 hover:bg-forest-50 transition-colors
              ${i % 2 === 0 ? 'bg-white' : 'bg-cream/40'}`}>
              <td className="px-4 py-3 whitespace-nowrap">{h.date}</td>
              <td className="px-4 py-3 font-medium text-forest-800">{h.pondName || h.pondId}</td>
              <td className="px-4 py-3 tabular-nums">{fmt(h.weightKg)}</td>
              <td className="px-4 py-3 text-green-700 font-medium tabular-nums">{fmtN(h.revenue)}</td>
              <td className="px-4 py-3 tabular-nums">{fmtN(h.costs)}</td>
              <td className="px-4 py-3 font-bold tabular-nums">
                <span className={h.profit >= 0 ? 'text-green-600' : 'text-red-500'}>
                  {h.profit >= 0 ? '+' : ''}{fmtN(h.profit)}
                </span>
              </td>
              <td className="px-4 py-3">
                {h.fcr
                  ? <span className={`font-bold ${fcrColor(parseFloat(h.fcr))}`}>{h.fcr}</span>
                  : '—'}
              </td>
              <td className="px-4 py-3 tabular-nums">{fmt(h.count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main Records page ───────────────────────────────────────────────────────
export default function Records() {
  const { loading, error, syncStatus, data } = useFarmData()
  const [selectedPond, setSelectedPond] = useState(null)
  const [activeTab,    setActiveTab]    = useState('ponds')

  return (
    <div className="pt-20">
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-forest-900 py-16">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-white">
              <span className="badge-earth mb-4">Live Data</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">Farm Records</h1>
              <p className="text-forest-300 mt-3 max-w-lg">
                {data?.settings?.farmName
                  ? `${data.settings.farmName} · ${data.settings.location || 'Abuja'}`
                  : 'Live data from your FarmTrack app — updated daily by your staff.'}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-forest-800 rounded-xl px-4 py-3 self-start sm:self-auto">
              <SyncDot status={syncStatus} />
              <span className="text-white/60 text-xs">Firebase Firestore</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ──────────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="section-container">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center py-24 gap-4">
              <div className="w-12 h-12 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
              <p className="text-forest-600 font-medium">Connecting to FarmTrack database…</p>
              <p className="text-forest-400 text-sm">Fetching live pond data</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="max-w-lg mx-auto py-16 text-center">
              <span className="text-5xl block mb-4">📡</span>
              <h2 className="font-serif text-xl font-bold text-forest-900 mb-2">Connection Error</h2>
              <p className="text-forest-600 text-sm mb-4">{error}</p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left text-sm text-amber-800">
                <p className="font-semibold mb-1">To fix this:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open Firebase Console → Firestore → Rules</li>
                  <li>Add a read rule: <code className="bg-amber-100 px-1 rounded">allow read: if true;</code></li>
                  <li>This allows the website to read (but not write) your farm data.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Live Data */}
          {!loading && !error && data && (
            <>
              {/* Farm-wide totals */}
              <FarmTotals totals={data.totals} />

              {/* Tab nav */}
              <div className="flex gap-1 bg-white rounded-xl p-1 border border-forest-100 shadow-sm mb-8 w-fit">
                {[
                  { id: 'ponds',    label: '🏊 Pond Batches' },
                  { id: 'harvests', label: '🎣 Harvest History' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all
                      ${activeTab === tab.id
                        ? 'bg-forest-700 text-white shadow-sm'
                        : 'text-forest-600 hover:text-forest-800'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Ponds tab */}
              {activeTab === 'ponds' && (
                <div>
                  {/* Today's logging status banner */}
                  {(() => {
                    const activePonds = data.ponds.filter(p => p.batch.active)
                    const loggedToday = activePonds.filter(p => p.todayLog).length
                    const total       = activePonds.length
                    if (total === 0) return null
                    const allLogged = loggedToday === total
                    return (
                      <div className={`mb-6 rounded-xl px-5 py-3 flex items-center gap-3 text-sm font-medium
                        ${allLogged ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
                        <span className="text-lg">{allLogged ? '✅' : '⚠️'}</span>
                        <span>
                          {allLogged
                            ? `All ${total} active ponds logged today — great work!`
                            : `${loggedToday}/${total} active ponds logged today. ${total - loggedToday} pending.`}
                        </span>
                        <span className="ml-auto text-xs opacity-60">
                          {new Date().toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    )
                  })()}

                  {/* Pond grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.ponds.map(pond => (
                      <PondCard key={pond.id} pond={pond} onClick={() => setSelectedPond(pond)} />
                    ))}
                  </div>

                  {/* FCR colour key */}
                  <div className="mt-6 text-xs text-forest-500 flex flex-wrap gap-3">
                    <span>FCR guide:</span>
                    <span className="text-green-600 font-semibold">&#60;1.6 Excellent</span>
                    <span className="text-yellow-600 font-semibold">1.6–2.2 Good</span>
                    <span className="text-red-500 font-semibold">&#62;2.2 Review feeding</span>
                  </div>
                </div>
              )}

              {/* Harvests tab */}
              {activeTab === 'harvests' && (
                <div className="bg-white rounded-2xl border border-forest-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-forest-100 flex items-center justify-between">
                    <h2 className="font-serif text-lg font-bold text-forest-900">Harvest History</h2>
                    <span className="text-forest-400 text-sm">{data.harvests.length} records</span>
                  </div>
                  <HarvestTable harvests={data.harvests} />
                  {data.harvests.length > 0 && (
                    <div className="px-5 py-3 bg-forest-50 border-t border-forest-100 text-xs text-forest-500">
                      Profit/Loss = Revenue − (Fish cost + Feed cost + Other costs)
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Pond detail modal */}
      {selectedPond && (
        <PondDetailModal pond={selectedPond} onClose={() => setSelectedPond(null)} />
      )}
    </div>
  )
}
