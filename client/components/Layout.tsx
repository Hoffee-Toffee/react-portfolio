import { Outlet, Link } from 'react-router-dom'
import { useWindowScroll, useWindowSize } from '@uidotdev/usehooks'

import '../styles/layout.css'

export default function Layout() {
  let [{ y: scroll }] = useWindowScroll()
  let { height: screen } = useWindowSize()

  scroll = scroll || 0
  screen = screen || 0
  const margin = 100

  // Make the header fade out as the user scrolls down the page
  const headerStyles = {
    opacity: 1 - scroll / margin,
    pointerEvents: 1 - scroll / margin > 0.5 ? 'auto' : 'none',
  }

  const footerStyles = {
    opacity: (30 + scroll - window.innerHeight - margin) / margin,
    pointerEvents: screen - scroll / margin > 0.5 ? 'auto' : 'none',
  }

  return (
    <>
      <header style={headerStyles}>
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

      <main>
        <Outlet />
      </main>

      <footer style={footerStyles}>
        <span>
          <a href="https://www.github.com/Hoffee-Toffee">Tristan Bulmer</a> 2023
        </span>
      </footer>
    </>
  )
}
