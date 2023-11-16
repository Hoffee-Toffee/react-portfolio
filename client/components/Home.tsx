import { Link } from 'react-router-dom'
import { useFruits } from '../hooks/useFruits.js'
import '../styles/home.css'
import '../styles/blog.css'

function App() {
  const { data, isError, isLoading } = useFruits()

  if (!data || isError || isLoading) {
    return <p>Loading</p>
  }

  const { count, updated, calendar } = data

  // Started
  const started = new Date(
    'December 31, 2022 11:59 PM GMT+1300 (New Zealand Daylight Time',
  )

  // Updated
  const updatedDate = new Date(updated)

  // Now
  const now = new Date()

  // Ms since count start
  const msAgo = new Date() - started

  // daily
  // Divide count by difference in ms of current and start, (ms / (1000*60*60*24)) to get as days
  const daily = count / (msAgo / (1000 * 60 * 60 * 24))

  // interval
  const intervalRaw = msAgo / count
  const interval = formatRelativeDate(intervalRaw, 0)

  // thousand
  const thousandMS = nextMilestone(1, count)

  const thousand = thousandMS / (count / msAgo) - msAgo + updatedDate.getTime()

  // tenThousand
  const tenThousandMS = nextMilestone(2, count)

  const tenThousand =
    tenThousandMS / (count / msAgo) - msAgo + updatedDate.getTime()

  // hunThousand
  const hunThousandMS = nextMilestone(3, count)

  const hunThousand =
    hunThousandMS / (count / msAgo) - msAgo + updatedDate.getTime()

  // Data processing
  // let processed = sneezeCalc(data)

  return (
    <div id="main">
      <div id="sneezeBox">
        <div className="card">
          <h1>
            <span id="holo">
              <b id="count">{count.toLocaleString()}</b>
            </span>{' '}
            sneezes
          </h1>
          <p>
            Count Start:{' '}
            <b id="start" className="date">
              {formatFullDate(started)}
            </b>
          </p>
          <p>
            Last Updated:{' '}
            <b id="updated" className="date">
              {formatFullDate(updatedDate)}
            </b>
          </p>
          <p>
            Current Time:{' '}
            <b id="now" className="date">
              {formatFullDate(now)}
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
            Average sneezes per day: <b id="daily">{daily.toLocaleString()}</b>
          </p>
          <p>
            Average time between sneezes:{' '}
            <b id="interval" className="date">
              {interval}
            </b>
          </p>
          <h2>Milestone Estimates</h2>
          <p>
            4-digit milestone (
            <b id="thousandMS">{thousandMS.toLocaleString()}</b> sneezes):{' '}
            <b id="thousand" className="date">
              {formatRelativeDate(thousand, updated)}
            </b>
          </p>
          <p>
            5-digit milestone (
            <b id="tenThousandMS">{tenThousandMS.toLocaleString()}</b> sneezes):{' '}
            <b id="tenThousand" className="date">
              {formatRelativeDate(tenThousand, updated)}
            </b>
          </p>
          <p>
            6-digit milestone (
            <b id="hunThousandMS">{hunThousandMS.toLocaleString()}</b> sneezes):{' '}
            <b id="hunThousand" className="date">
              {formatRelativeDate(hunThousand, updated)}
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
}

function formatFullDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}

function formatRelativeDate(estimate, start) {
  const currentDate = start !== undefined ? new Date(start) : new Date()
  const estimateDate = new Date(estimate)
  const timeDiff = estimateDate - currentDate

  let seconds = Math.floor(timeDiff / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  if (years >= 10) {
    // Just show the estimated year if a decade or so in the future
    return estimateDate.getFullYear().toString()
  } else if (years >= 2) {
    // Just show the estimated month and year if a couple of years or so in the future
    return estimateDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  } else if (days >= 7) {
    // Just show the month and day if a week or so in the future (plus the year to avoid confusion)
    return estimateDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } else if (days >= 1) {
    // Just show the days and hours remaining if over a day in the future
    hours %= 24
    return `${days} ${days === 1 ? 'day' : 'days'}${
      hours > 0 ? ` and ${hours} ${hours === 1 ? 'hour' : 'hours'}` : ''
    }`
  } else if (hours >= 1) {
    // Just show the hours and minutes remaining if an hour or so in the future
    minutes %= 60
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}${
      minutes > 0
        ? ` and ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
        : ''
    }`
  } else if (minutes >= 1) {
    // Just show the minutes and seconds remaining if a minute or so in the future
    seconds %= 60
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}${
      seconds > 0
        ? ` and ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
        : ''
    }`
  } else {
    // Finally, all remaining estimates must be seconds away (negatives will go here, but none should be generated by this program)
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
  }
}

function nextMilestone(level, count) {
  const milestone = 100 * Math.pow(10, level)
  const round = Math.ceil(count / milestone) * milestone

  return round == count ? count + milestone : round
}

export default App
