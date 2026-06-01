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
          I'm currently working at <a href="https://upshift.co.nz/">UpShift</a>, in Nelson, New Zealand.
          <br />
          I have been a part of the UpShift team since early 2025, and have been working on a variety of worthwhile projects.
          <br />
          <br />
          You can find more details on this work, and my personal projects <Link to="/projects">here</Link>.
        </p>

        <p>
          I think computers and programming are awesome and are one of my main{' '}
          <Link to="/interests">interests</Link>.
          <br />
          I love making and designing creative solutions to problems by thinking
          about them at a fundamental level, it's fun chipping away at large
          problems, exploring the entirety of the problem, and finding cool
          solutions and ideas.
          <br />
        </p>
      </div>

    </div>
  )
}

export default Home
