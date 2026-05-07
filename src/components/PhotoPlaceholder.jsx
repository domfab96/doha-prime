/**
 * PhotoPlaceholder — swap me out with a real <img> or background div
 * when your photos are ready!
 */
export default function PhotoPlaceholder({ label = 'Add Photo Here', height = 'h-64', icon = '📷' }) {
  return (
    <div
      className={`photo-placeholder ${height} select-none`}
      title={`Replace this div with: <img src="your-image.jpg" alt="${label}" />`}
    >
      <span className="text-3xl opacity-60">{icon}</span>
      <span className="text-center px-4 text-xs md:text-sm opacity-80">
        [ Add Photo Here: <strong>{label}</strong> ]
      </span>
      <span className="text-xs opacity-40 mt-1">Click to replace with your image</span>
    </div>
  )
}
