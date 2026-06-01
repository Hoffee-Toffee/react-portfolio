import { Route, createRoutesFromElements, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Interests from './components/Interests'
import Projects from './components/Projects'
import Secret from './components/Secret'
import NotFound from './components/NotFound'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/blog" element={<Navigate to="/404" replace />} />
      <Route path="/blog/:blog" element={<Navigate to="/404" replace />} />

      <Route path="/projects" element={<Projects />} />
      <Route path="/secret" element={<Secret />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </>,
)
