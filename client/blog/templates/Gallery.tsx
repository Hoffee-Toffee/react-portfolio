import React from 'react'

// Renders a scrollable gallery using the existing .gallery CSS.
// Each item is { src, alt?, caption? }
interface GalleryItem {
  src: string
  alt?: string
  caption?: string
}

interface GalleryProps {
  items: GalleryItem[]
  label?: string
}

export default function Gallery({ items, label }: GalleryProps) {
  return (
    <div className="gallery">
      <div>
        {items.map((item, i) => (
          <div key={i}>
            <img src={item.src} alt={item.alt ?? ''} />
          </div>
        ))}
      </div>
      {label && <span>{label}</span>}
    </div>
  )
}
