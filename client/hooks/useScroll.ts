import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import parallax from './useParallax.ts'

const useScroll = () => {
  const location = useLocation()

  useEffect(() => {
    // Close menu after navigating to a new page
    if (document.getElementById('nav-toggle'))
      document.getElementById('nav-toggle').checked = false

    const onInterests = location.pathname === '/interests'
    const scrollingBody = onInterests
      ? document.getElementById('interests')
      : window

    const handleScroll = () => {
      // Update interests parallax if on that page
      if (onInterests) parallax()

      // Don't update if on the secret page
      if (location.pathname == '/secret') return
      // Close menu on scroll
      document.getElementById('nav-toggle').checked = false

      // Header fade logic
      const header = document.querySelector('header')
      const headerHeight = header?.clientHeight || 0
      const scroll = onInterests ? scrollingBody.scrollTop : window.scrollY
      const header_opacity = 1 - scroll / headerHeight
      header.style.opacity = Math.max(0, Math.min(header_opacity, 1))
      header.style.pointerEvents = header.style.opacity < 0.5 ? 'none' : 'auto'

      // Footer fade logic
      const footer = document.querySelector('footer')
      const footerHeight = footer?.clientHeight || 0
      const scrollHeight = onInterests
        ? scrollingBody.scrollHeight
        : document.documentElement.scrollHeight
      const scrollPositionFromBottom =
        scrollHeight - (scroll + window.innerHeight)
      const footer_opacity = 1 - scrollPositionFromBottom / footerHeight
      footer.style.opacity = Math.max(0, Math.min(footer_opacity, 1))
      footer.style.pointerEvents = footer.style.opacity < 0.5 ? 'none' : 'auto'

      // Movies-TV scroll indicator fade logic
      if (onInterests) {
        const snap2 = document.getElementById('movies-tv-snap2')
        const indicator = document.querySelector(
          '#movies-tv .scroll-indicator',
        ) as HTMLElement | null
        if (snap2 && indicator) {
          const snap2Top = snap2.offsetTop
          const fadeStart = snap2Top - window.innerHeight
          const fadeProgress = (scroll - fadeStart) / window.innerHeight
          indicator.style.opacity = String(
            Math.max(0, Math.min(1 - fadeProgress, 1)),
          )
        }
      }
    }

    scrollingBody.addEventListener('scroll', handleScroll)
    window.onresize = () => handleScroll() // handle resize as well

    // Clean up
    return () => {
      scrollingBody.removeEventListener('scroll', handleScroll)
      window.onresize = null
    }
  }, [location.pathname]) // Depend on the path to rebind event handlers when it changes
}

export default useScroll
