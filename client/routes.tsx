import { Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Interests from './components/Interests'
import Blog from './components/Blog'
import BlogPage from './components/BlogPage'
import Projects from './components/Projects'
import Secret from './components/Secret'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="./:blog" element={<BlogPage />} />
      </Route>

      <Route path="/projects" element={<Projects />} />
      <Route path="/secret" element={<Secret />} />
    </Route>
  </>,
)
