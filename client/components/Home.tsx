import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import '../styles/home.scss'
import me from '../images/Me.png'

function Home() {
  useEffect(() => {
    document.title = 'Tristan Bulmer | Home'
    document.body.parentElement.id = 'homePage'
  }, [])

  return (
    <div id="main">
      <div id="content">
        <div id="top-box">
          <img id="me" src={me} alt="Me" />
          <div id="right-col">
            <h1>Welcome to my portfolio!</h1>
            <ul>
              <li>
                <a href="https://github.com/Hoffee-Toffee">GitHub</a>
              </li>
              <li>
                <a href="https://linkedin.com/in/tristan-bulmer">LinkedIn</a>{' '}
              </li>
              <li>
                <a href="/client/files/Tristan Bulmer CV.pdf">CV</a>{' '}
              </li>
              <li>
                <a href="mailto:tb59391@gmail.com">Email Me</a>
              </li>
            </ul>
          </div>
        </div>

        <p>
          I'm studying at <a href="https://devacademy.co.nz/">Dev Academy</a>,
          New Zealand.
          <br />
          For my blog for Dev Academy, see <Link to="/blog">here</Link>.
          <br />
          I'm currently working on a few personal{' '}
          <Link to="/projects">projects</Link>.
        </p>

        <p>
          I think computers and programming are awesome and are one of my main{' '}
          <Link to="/interests">interests</Link>.
          <br />
          I love making and designing creative solutions to problems by thinking
          about them at a fundamental level, it's fun chipping a way at large
          problems, exploring the entirety of the problem, and finding cool
          solutions and ideas.
          <br />
        </p>

        <p>
          WIP - The rest of this section is currently being re-written. This
          placeholder text is simply replacing the now outdated information.
        </p>
      </div>

    </div>
  )
}

export default Home
