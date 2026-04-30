import React from 'react'

interface ListProps {
  items: string[]
  ordered?: boolean
  header?: string
}

export default function List({ items, ordered = false, header }: ListProps) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag headerText={header ?? undefined}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  )
}
