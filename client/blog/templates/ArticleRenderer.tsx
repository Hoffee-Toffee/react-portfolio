import React from 'react'

// Renders an array of TemplateNodes recursively.
// Each node is resolved to its component by name from the provided registry.

import type { TemplateNode } from '../types.ts'
import * as Templates from './index.ts'

export default function ArticleRenderer({ nodes }: { nodes: TemplateNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        const Component = Templates[node.template as keyof typeof Templates]
        if (!Component) {
          console.warn(`Unknown blog template: "${node.template}"`)
          return null
        }
        const children = node.children ? (
          <ArticleRenderer nodes={node.children} />
        ) : undefined

        return (
          <Component key={i} {...(node.props ?? {})}>
            {children}
          </Component>
        )
      })}
    </>
  )
}
