import React from 'react'

interface ImageProps {
  src: string
  alt?: string
  caption?: string
}

export default function Image({ src, alt = '', caption }: ImageProps) {
  return (
    <figure>
      <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
