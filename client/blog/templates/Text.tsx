import React from 'react'

interface TextProps {
  children?: React.ReactNode
  // Plain text content — use when no nested templates are needed
  text?: string
}

export default function Text({ text, children }: TextProps) {
  return <p>{children ?? text}</p>
}
