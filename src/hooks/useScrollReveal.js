import { useEffect, useRef } from 'react'

/**
 * Reveals an element once it scrolls into view.
 *
 * Pair the returned ref with one of two classes:
 *   .reveal          — the element itself fades up
 *   .reveal-stagger  — its direct children fade up one after another
 *
 * Both are defined in index.css. The observer disconnects after firing, so an
 * element never animates twice, and anyone who has asked their system for
 * reduced motion simply gets the final state immediately.
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

export default useScrollReveal
