import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import articles from '../blog/articles/index.ts'
import ArticleRenderer from '../blog/templates/ArticleRenderer.tsx'
import '../styles/blog.scss'

export default function BlogPage() {
  const { blog } = useParams()
  const article = articles.find((a) => a.slug === blog)

  useEffect(() => {
    document.title = article
      ? `Tristan Bulmer | ${article.title}`
      : 'Tristan Bulmer | Blog'
    document.body.parentElement.id = 'blogPage'
  }, [article])

  if (!article) {
    return (
      <div id="content">
        <h1>Post not found</h1>
        <p>
          <Link to="/blog">Back to blog</Link>
        </p>
      </div>
    )
  }

  return (
    <div id="content" className="post">
      <ArticleRenderer nodes={article.content} />
      <p>
        <Link to="/blog">← Back to blog</Link>
      </p>
    </div>
  )
}
