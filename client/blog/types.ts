// A node in an article definition tree.
// `template` names a component in the templates directory.
// `props` are passed directly to that component (sans children).
// `children` are nested TemplateNodes rendered as the component's children.
export interface TemplateNode {
  template: string
  props?: Record<string, unknown>
  children?: TemplateNode[]
}

// Top-level article metadata + content
export interface Article {
  slug: string
  title: string
  date: string // ISO date string, e.g. "2024-03-15"
  summary: string
  content: TemplateNode[]
}
