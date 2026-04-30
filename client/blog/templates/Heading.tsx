import React from 'react'

interface HeadingProps {
  level?: 1 | 2 | 3 | 4
  text: string
  subtitle?: string
  date?: string
}

export default function Heading({ level = 2, text, subtitle, date }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <>
      {date && <date>{date}</date>}
      <Tag>{text}</Tag>
      {subtitle && <subtitle>{subtitle}</subtitle>}
    </>
  )
}
