import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import articles from '../blog/articles/index.ts'
import '../styles/blog.scss'

export default function Blog() {
  useEffect(() => {
    document.title = 'Tristan Bulmer | Blog'
    document.body.parentElement.id = 'blogPage'
  }, [])

  return (
    <div id="content">
      <h1>Blog</h1>
      <div id="blog-list">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/blog/${article.slug}`}
            className="blog-snippet"
          >
            <span className="blog-date">{article.date}</span>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
