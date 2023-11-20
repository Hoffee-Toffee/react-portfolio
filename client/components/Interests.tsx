/* eslint-disable react/jsx-key */
import { Link } from 'react-router-dom'
import InterestSection from './InterestSection'
import '../styles/interests.css'

export default function Interests() {
  const interests = [
    <InterestSection
      id="dead-space"
      content={
        <>
          <div className="fg-img" id="isaac-clarke"></div>

          <div className="bg">
            <div className="content">
              <h1>Dead Space</h1>
              <p>
                I love the Dead Space series for the rich design of the game.
              </p>
              <p>
                As a horror game, it relies on players feeling as if the events
                are happening to them, which is why immersive audio and diagetic
                UI design is so important.
              </p>
              <p>
                Dead Space's terrifyingly beautiful sci-fi setting builds
                perfectly on this, adding to the isolation and wonder of the
                game.
              </p>
              <div className="interest-links">
                <a href="https://deadspace.fandom.com/wiki/Main_Page">
                  Dead Space Wiki
                </a>
                <a href="https://www.ea.com/games/dead-space">
                  Dead Space EA Page
                </a>
              </div>
            </div>
          </div>
        </>
      }
    />,
    <InterestSection
      id="programming"
      content={
        <>
          {' '}
          <div className="fg-img" id="github"></div>
          <div className="bg">
            <div className="content">
              <h1>Programming</h1>
              <p>
                I love exploring problems at a fundamental level, learning about
                the intricacies of the problem, and finding creative solutions.
              </p>
              <p>
                Programming is amazing, you can use it to solve real-world
                problems and make cool things.
              </p>
              <p>
                My first language was Python, but now I am most familiar with
                HTML, CSS and JavaScript.
              </p>
              <p>
                I also have some experience with PHP and SQL, but am currently
                using Firebase for most of my projects.
              </p>

              <div className="interest-links">
                <Link to="/projects">My Projects</Link>
                <Link to="/home#about">More Info</Link>
              </div>
            </div>
          </div>
        </>
      }
    />,
    <InterestSection
      id="space"
      content={
        <>
          {' '}
          <div id="scroll">
            <div className="fg-img" id="starship"></div>
          </div>
          <div className="bg">
            <div className="content">
              <h1>Space</h1>
              <p>
                Space is amazing, it's so big and vast, and there is so much to
                explore.
              </p>
              <p>
                The possibilities offered by space and space exploration are
                practically endless and are so exciting.
              </p>
              <p>
                The next few decades - with the Starship program especially -
                will aid in scientific endevours in space, aiding Earth in the
                process.
              </p>
              <p>
                I'm not hopeful that superluminal travel will be possible, but
                there is so much we can do even in the bounds of our own solar
                system.
              </p>
              <p>
                In my lifetime I'm sure I'll see the beginnings of space
                colonization, among other exciting new technologies and
                discoveries.
              </p>

              <div className="interest-links">
                <a href="https://www.spacex.com/">SpaceX</a>
                <a href="https://www.nasa.gov/">NASA</a>
              </div>
            </div>
          </div>
        </>
      }
    />,
    <InterestSection
      id="games"
      content={
        <>
          <div id="tetronimos">
            <div className="fg-img" id="l-block"></div>
            <div className="fg-img" id="o-block"></div>
            <div className="fg-img" id="s-block"></div>
            <div className="fg-img" id="t-block"></div>
          </div>

          <div className="bg">
            <div className="content">
              <h1>Games</h1>
              <p>
                I don't play many games because I don't have enough time or
                money, but I do enjoy playing games.
              </p>
              <p>Here are some of my favourite games...</p>

              <ul>
                <li>Dead Space</li>
                <li>Minecraft</li>
                <li>Crash Bandicoot</li>
                <li>Doom (1993)</li>
                <li>Portal</li>
                <li>Return of the Obra Dinn</li>
                <li>Soma</li>
                <li>Superliminal</li>
                <li>Tetris</li>
                <li>The Stanley Parable</li>
              </ul>
            </div>
          </div>
        </>
      }
    />,
    <InterestSection
      id="movies-tv"
      content={
        <>
          <div className="fg-img" id="memento"></div>

          <div className="bg">
            <div className="content">
              <h1>Movies and TV</h1>
              <p>
                Here is a list of some of my favourite movies and TV shows...
              </p>

              <ul>
                <li>Oppenheimer</li>
                <li>Saw</li>
                <li>Inception</li>
                <li>Better Call Saul</li>
                <li>Memento</li>
                <li>Breaking Bad</li>
                <li>Tenet</li>
                <li>Back to the Future</li>
                <li>The Imitation Game</li>
                <li>WarGames</li>
                <li>The Simpsons</li>
              </ul>
            </div>
          </div>
        </>
      }
    />,
    <InterestSection
      id="other"
      content={
        <>
          {' '}
          <div className="fg-img" id="kurzgesagt-bird"></div>
          <div className="fg-img" id="kurzgesagt-black-hole"></div>
          <div className="bg">
            <div className="content">
              <h1>Other</h1>
              <p>
                Here is a list of some links to YouTube channels and other
                things that I enjoy...
              </p>

              <ul>
                <li>
                  <a
                    href="https://www.youtube.com/Computerphile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Computerphile
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/Veritasium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Veritasium
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/Kurzgesagt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kurzgesagt
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/Vsauce"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vsauce
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/SabineHossenfelder"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sabine Hossenfelder
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/Numberphile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Numberphile
                  </a>
                </li>

                <li>
                  <a
                    href="https://waitbutwhy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wait But Why
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      }
    />,
  ]
  return (
    <div id="interests">
      <div className="title-card" id="interests-title">
        <div className="content">
          <h1>My Interests</h1>
          <p>Here are some of my interests.</p>
        </div>
        <span className="scroll-indicator">
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </span>
      </div>
      {interests.map((interest, index) => ({
        ...interest,
        props: { ...interest.props, index },
        key: `Interest ${index + 1}`,
      }))}
      <div className="title-card" id="interests-end">
        <div className="content">
          <h1>End of Interests</h1>
          <p>Yep, that's about it.</p>
        </div>
      </div>
    </div>
  )
}
