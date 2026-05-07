/**
 * Resizes any uploaded image to max 800×600px, converts to JPEG @ 82% quality.
 * Works on phone photos (5-10 MB) and brings them down to ~100-300 KB.
 * Returns a base64 data URL string.
 */
export function resizeImageToBase64(file, maxW = 800, maxH = 600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not load image'))
      img.onload = () => {
        let { width: w, height: h } = img
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH }
        const canvas = document.createElement('canvas')
        canvas.width  = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

/** Convert a YouTube URL to its embed URL */
export function toYouTubeEmbed(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : url
}

/** Count words in a string */
export function wordCount(text) {
  return (text || '').trim().split(/\s+/).filter(Boolean).length
}
