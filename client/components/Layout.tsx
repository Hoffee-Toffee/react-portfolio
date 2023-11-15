import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header>
        <script
          src="https://kit.fontawesome.com/251912c541.js"
          crossOrigin="anonymous"
        ></script>
        <h1>
          <a href="/">Tristan Bulmer</a>
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
              <a href="../home/home.html">Home</a>
            </li>
            <li>
              <a href="../interests/interests.html">Interests</a>
            </li>
            <li>
              <a href="../blog/blog.html">Blog</a>
            </li>
            <li>
              <a href="../projects/projects.html">Projects</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <span>
          <a href="https://www.github.com/Hoffee-Toffee">Tristan Bulmer</a>
          2023
        </span>
      </footer>
    </>
  )
}
