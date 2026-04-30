import React from 'react'

// A generic container/section — useful for grouping or passing nested templates
interface SectionProps {
  children?: React.ReactNode
  className?: string
}

export default function Section({ children, className }: SectionProps) {
  return <section className={className}>{children}</section>
}
