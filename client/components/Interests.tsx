/* eslint-disable react/jsx-key */
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'

import InterestSection from './InterestSection'
import Astrophage from './Astrophage'
import '../styles/interests.scss'

export default function Interests() {
  useEffect(() => {
    document.title = 'Tristan Bulmer | Interests'
    document.body.parentElement.id = 'interestsPage'
  }, [])

  const [petrova, setPetrova] = useState(false)
  const [overlay, setOverlay] = useState<'none' | 'black' | 'white-in' | 'white-fade'>('none')
  // const cooldownRef = useRef(false)
  const petrovaRef = useRef(false)

  const triggerTransition = useCallback((toOn: boolean) => {
    // if (cooldownRef.current) return
    if (petrovaRef.current === toOn) return
    // cooldownRef.current = true

    setOverlay('black')
    setTimeout(() => {
      petrovaRef.current = toOn
      setPetrova(toOn)
      setOverlay('white-in')
      setTimeout(() => {
        setOverlay('white-fade')
        setTimeout(() => setOverlay('none'), 1500)
      }, 250)
    }, 150)

    // setTimeout(() => { cooldownRef.current = false }, 1500)
  }, [])

  useEffect(() => {
    const interestsEl = document.getElementById('interests')
    if (!interestsEl) return

    const handleScroll = () => {
      const snap2El = document.getElementById('movies-tv-snap2')
      if (!snap2El) return
      const p2Top = snap2El.getBoundingClientRect().top + interestsEl.scrollTop
      const p1Top = p2Top - window.innerHeight
      const scrollTop = interestsEl.scrollTop
      if (!petrovaRef.current && scrollTop >= p2Top) {
        triggerTransition(true)
      } else if (petrovaRef.current && scrollTop <= p1Top) {
        triggerTransition(false)
      }
    }

    interestsEl.addEventListener('scroll', handleScroll)
    return () => interestsEl.removeEventListener('scroll', handleScroll)
  }, [triggerTransition])

  const interests = [
    <InterestSection
      id="dead-space"
      content={
        <>
          <div className="fg-img" id="isaac-clarke" data-parallax="float-fade" data-parallax-fade-out="0.5"></div>

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
          <div className="fg-img" id="github" data-parallax="scroll-up" data-parallax-speed="0.5"></div>
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
            <div className="fg-img" id="starship" data-parallax="scroll-up" data-parallax-speed="0.333" data-parallax-target="#scroll"></div>
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
          <div id="tetronimos" data-parallax="scroll-up" data-parallax-speed="0.25">
            <div className="fg-img" id="l-block"></div>
            <div className="fg-img" id="o-block"></div>
            <Link to="/secret">
              <div className="fg-img" id="s-block"></div>
            </Link>
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
    />
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
      <div id="movies-tv-zone">
        <div id="movies-tv" className="interest">
          <div className={`movies-tv-content${petrova ? ' petrova-mode' : ''}`}>
            <Astrophage active={petrova} />
            <div id="grace-scale">
              <div id="grace-rotate">
                <div className="fg-img" id="grace" data-parallax="scroll-up" data-parallax-speed="0.2"></div>
              </div>
            </div>
            <div id="grace-overlay" className={overlay}></div>

            <div className="bg">
              <div className="content">
                <h1>Movies and TV</h1>
                <p>
                  Here is a list of some of my favourite movies and TV shows...
                </p>

                <ul>
                  <li>Project Hail Mary</li>
                  <li>Oppenheimer</li>
                  <li>Saw</li>
                  <li>Inception</li>
                  <li>Better Call Saul</li>
                  <li>Memento</li>
                  <li>Breaking Bad</li>
                  <li>Tenet</li>
                  <li>Back to the Future</li>
                  <li>The Martian</li>
                </ul>
              </div>
            </div>
          </div>
          <span className="scroll-indicator">
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </span>
        </div>
        <div id="movies-tv-snap2"></div>
      </div>
    </div>
  )
}
