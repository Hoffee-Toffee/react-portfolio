import React from 'react'

interface CodeProps {
  content: string
  language?: string
}

export default function Code({ content, language }: CodeProps) {
  return (
    <code data-language={language}>
      {content}
    </code>
  )
}
