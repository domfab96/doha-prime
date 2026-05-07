// src/hooks/useFarmData.js
// ─── Real-time Firestore listener — mirrors how FarmTrack syncs its data ───
import { useState, useEffect } from 'react'
import { POND_DEFS, FARM_DOC_REF, onSnapshot } from '../firebase'

/**
 * Returns live farm data straight from Firestore.
 * Updates automatically whenever FarmTrack saves a new daily log,
 * stocks a pond, or records a harvest.
 *
 * Shape returned:
 * {
 *   loading:    boolean,
 *   error:      string | null,
 *   syncStatus: 'connecting' | 'live' | 'error',
 *   settings:   { farmName, ownerName, location },
 *   ponds:      [ enriched pond objects — see below ],
 *   harvests:   [ harvest records ],
 *   totals:     { activePonds, totalFishAlive, totalMortality, cyclesDone,
 *                 totalRevenue, totalProfit, avgFCR }
 * }
 *
 * Each enriched pond object:
 * {
 *   id, name, capacity,
 *   batch:      { active, count, dateStocked, stage, fishCost } | { active: false },
 *   logs:       [ daily log entries, newest first ],
 *   todayLog:   today's log entry | null,
 *   metrics:    { daysStocked, totalFeedKg, totalMortality, estimatedAlive,
 *                 fcr, lastSampleWeight, capacityUsed }
 * }
 */
export function useFarmData() {
  const [data,       setData]       = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [syncStatus, setSyncStatus] = useState('connecting')

  useEffect(() => {
    setSyncStatus('connecting')

    // onSnapshot sets up a real-time listener — fires immediately with current
    // data, then again every time FarmTrack writes a new entry.
    const unsubscribe = onSnapshot(
      FARM_DOC_REF,
      (snap) => {
        if (!snap.exists()) {
          setError('No farm data found. Make sure FarmTrack is set up.')
          setLoading(false)
          setSyncStatus('error')
          return
        }

        const raw = snap.data()
        const settings   = raw.settings   || {}
        const rawBatches = raw.batches    || {}
        const rawLogs    = raw.dailyLogs  || {}
        const harvests   = (raw.harvests  || []).slice().reverse() // newest first

        // ── Enrich each pond ────────────────────────────────────────────
        const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

        const ponds = POND_DEFS.map(def => {
          const batch = rawBatches[def.id] || { active: false }
          const logs  = (rawLogs[def.id]  || []).slice().reverse() // newest first

          // ── Per-pond metrics ──────────────────────────────────────────
          let metrics = {
            daysStocked:       null,
            totalFeedKg:       0,
            totalMortality:    0,
            estimatedAlive:    null,
            fcr:               null,
            lastSampleWeight:  null,
            capacityUsed:      null,
          }

          if (batch.active) {
            const startDate  = new Date(batch.dateStocked)
            const now        = new Date()
            metrics.daysStocked = Math.max(0, Math.floor((now - startDate) / 86400000))

            const allLogs = rawLogs[def.id] || []
            metrics.totalFeedKg    = allLogs.reduce((s, l) => s + (parseFloat(l.feed)  || 0), 0)
            metrics.totalMortality = allLogs.reduce((s, l) => s + (parseInt(l.mort)    || 0), 0)

            const count = parseInt(batch.count) || 0
            metrics.estimatedAlive = Math.max(0, count - metrics.totalMortality)
            metrics.capacityUsed   = def.capacity > 0
              ? Math.round((count / def.capacity) * 100)
              : 0

            // FCR = total feed (kg) / estimated biomass kg
            // Estimate biomass from last sample weight
            const withWeight = allLogs.filter(l => l.sampleWeight)
            if (withWeight.length) {
              const lastW = parseFloat(withWeight[withWeight.length - 1].sampleWeight)
              metrics.lastSampleWeight = lastW
              const estimatedBiomassKg = (metrics.estimatedAlive * lastW) / 1000
              if (estimatedBiomassKg > 0) {
                metrics.fcr = parseFloat((metrics.totalFeedKg / estimatedBiomassKg).toFixed(2))
              }
            }
          }

          // Today's log for this pond
          const todayLog = logs.find(l => {
            // FarmTrack stores date as "DD/MM/YYYY" or "YYYY-MM-DD"
            const d = l.date || ''
            return d === today || d === toNGDate(today)
          }) || null

          return { ...def, batch, logs, todayLog, metrics }
        })

        // ── Farm-wide totals ────────────────────────────────────────────
        const activePonds    = ponds.filter(p => p.batch.active).length
        const totalFishAlive = ponds.reduce((s, p) => s + (p.metrics.estimatedAlive || 0), 0)
        const totalMortality = ponds.reduce((s, p) => s + p.metrics.totalMortality, 0)
        const cyclesDone     = harvests.length

        const totalRevenue   = harvests.reduce((s, h) => s + (h.revenue || 0), 0)
        const totalProfit    = harvests.reduce((s, h) => s + (h.profit  || 0), 0)
        const fcrsWithData   = harvests.filter(h => h.fcr).map(h => parseFloat(h.fcr))
        const avgFCR         = fcrsWithData.length
          ? (fcrsWithData.reduce((a, b) => a + b, 0) / fcrsWithData.length).toFixed(2)
          : null

        setData({
          settings,
          ponds,
          harvests,
          totals: { activePonds, totalFishAlive, totalMortality, cyclesDone, totalRevenue, totalProfit, avgFCR },
        })
        setLoading(false)
        setSyncStatus('live')
        setError(null)
      },
      (err) => {
        console.error('Firestore error:', err)
        setError(`Database connection error: ${err.message}`)
        setLoading(false)
        setSyncStatus('error')
      }
    )

    // Clean up the listener when this component unmounts
    return () => unsubscribe()
  }, [])

  return { loading, error, syncStatus, data }
}

// Helper: convert YYYY-MM-DD → DD/MM/YYYY (Nigerian locale used by FarmTrack)
function toNGDate(iso) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
