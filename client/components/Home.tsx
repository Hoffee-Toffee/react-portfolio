import { Link } from 'react-router-dom'
import { useFruits } from '../hooks/useFruits.js'
import '../styles/home.css'
import '../styles/blog.css'

function App() {
  const { data } = useFruits()

  return (
    <div id="main">
      <div id="sneezeBox">
        <div className="card">
          <h1>
            <span id="holo">
              <b id="count">???</b>
            </span>{' '}
            sneezes
          </h1>
          <p>
            Count Start:{' '}
            <b id="start" className="date">
              ???
            </b>
          </p>
          <p>
            Last Updated:
            <b id="updated" className="date">
              ???
            </b>
          </p>
          <p>
            Current Time:
            <b id="now" className="date">
              ???
            </b>
          </p>
          <hr />
          <h2>Calendar</h2>
          <div className="graph yearly">
            <ul className="months">
              <li>Jan</li>
              <li>Feb</li>
              <li>Mar</li>
              <li>Apr</li>
              <li>May</li>
              <li>Jun</li>
              <li>Jul</li>
              <li>Aug</li>
              <li>Sep</li>
              <li>Oct</li>
              <li>Nov</li>
              <li>Dec</li>
            </ul>
            <ul className="days">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul className="squares"></ul>
            <div className="switch">
              <a>{`<`}</a>
              <h3 className="date"></h3>
              <a>{`>`}</a>
            </div>
          </div>
          <div className="graph monthly">
            <ul className="days">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul className="squares"></ul>
            <div className="switch">
              <a>{`<`}</a>
              <h3 className="date"></h3>
              <a>{`>`}</a>
            </div>
          </div>
          <div className="key">
            <ul className="squares">
              <li data-level="1" count="0"></li>
              <li data-level="2" count="1 - 2"></li>
              <li data-level="3" count="3 - 5"></li>
              <li data-level="4" count="6 - 9"></li>
              <li data-level="5" count="10 - 14"></li>
              <li data-level="6" count="15 - 20"></li>
              <li data-level="7" count="21 - 29"></li>
              <li data-level="8" count="30+"></li>
            </ul>
            <p>
              (slashed squares either have no data or are yet to be confirmed)
            </p>
          </div>
          <hr />
          <h2>Averages</h2>
          <p>
            Average sneezes per day: <b id="daily">???</b>
          </p>
          <p>
            Average time between sneezes:{' '}
            <b id="interval" className="date">
              ???
            </b>
          </p>
          <h2>Milestone Estimates</h2>
          <p>
            4-digit milestone (<b id="thousandMS">???</b> sneezes):
            <b id="thousand" className="date">
              ???
            </b>
          </p>
          <p>
            5-digit milestone (<b id="tenThousandMS">???</b> sneezes):
            <b id="tenThousand" className="date">
              ???
            </b>
          </p>
          <p>
            6-digit milestone (<b id="hunThousandMS">???</b> sneezes):
            <b id="hunThousand" className="date">
              ???
            </b>
          </p>
        </div>
      </div>
      <div id="content">
        <h1>Welcome to my portfolio!</h1>

        <p>
          I'm studying at <a href="https://devacademy.co.nz/">Dev Academy</a>,
          New Zealand.
          <br />
          For my blog for Dev Academy, see
          <Link to="/blog">here</Link>.
          <br />
          I'm currently working on a few personal
          <Link to="/projects">projects</Link>.
        </p>

        <p>
          I think computers and programming are awesome and are one of my main
          <Link to="/interests">interests</Link>.
          <br />
          I love making and designing creative solutions to problems by thinking
          about them at a fundamental level, it's fun chipping a way at large
          problems, exploring the entirety of the problem, and finding cool
          solutions and ideas.
          <br />
        </p>

        <p>
          Most of my programming experience is in web development, but I am
          getting bit into game development via my Supe Game project.
          <br />
          I have experience with HTML, CSS, JavaScript, PHP, Python, SQL,
          Node.js, and AutoHotKey.
          <br />
          The languages I am most familiar with are HTML, CSS, JavaScript, and
          Python.
          <br />
          Python was my first language, but I don't use it as much as I used to.
          <br />
          I have some experience with PHP and SQL, and am currently getting back
          into SQL for some of my projects.
          <br />
        </p>

        <h2>Things I have made in the past include...</h2>
        <ul>
          <li>Countless python scripts (text games, web scrapers, etc.)</li>
          <li>
            Two Discord bots (one with a bunch of silly commands and features,
            and one that I used to manage and control my Minecraft server)
          </li>
          <li>
            A few websites (most are terrible from when I was starting out and
            messing around)
          </li>
        </ul>

        <p>
          Most of my previous projects are not yet on github, but I plan to add
          them soon.
        </p>

        <h2>I am currently working on...</h2>
        <ul>
          <li>
            A <Link to="/supe-game">superhero fighting game</Link> and a website
            for it
          </li>
          <li>This portfolio website</li>
          <li>
            A <Link to="/supedb">wiki</Link>, with added timeline tools, for
            visualising the connections between people, events, objects and
            concepts in stories
          </li>
        </ul>
      </div>
    </div>
  )

  // return (
  //   <>
  //     <div classNameName="app">
  //       <h1>Fullstack Boilerplate - with Fruits!</h1>
  //       <ul>
  //         {data &&
  //           Object.entries(data.calendar).map(([key, value]) => {
  //             return (
  //               <li key={key}>
  //                 {key}:{' '}
  //                 {value.confirmed ? (
  //                   <b>{value.count}</b>
  //                 ) : (
  //                   <i>{value.count}</i>
  //                 )}
  //               </li>
  //             )
  //           })}
  //       </ul>
  //     </div>
  //   </>
  // )
}

export default App
