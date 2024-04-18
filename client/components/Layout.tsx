import { Outlet, Link } from 'react-router-dom'
import useScroll from '../hooks/useScroll.ts'

import '../styles/layout.css'

export default function Layout() {
  useScroll()

  return (
    <>
      {window.location.pathname == '/secret' || (
        <header>
          <script
            src="https://kit.fontawesome.com/251912c541.js"
            crossOrigin="anonymous"
          ></script>
          <h1>
            <Link to="/">Tristan Bulmer</Link>
          </h1>

          <input type="checkbox" id="nav-toggle" />
          <label htmlFor="nav-toggle" id="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </label>

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/interests">Interests</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
            </ul>
          </nav>
        </header>
      )}

      <main>
        <Outlet />
      </main>

      {window.location.pathname == '/secret' || (
        <footer style={{ opacity: 0, pointerEvents: 'none' }}>
          <span>
            <a href="https://www.github.com/Hoffee-Toffee">Tristan Bulmer</a>{' '}
            2023
          </span>
        </footer>
      )}
    </>
  )
}
