import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useScroll = () => {
  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname)
    const onInterests = location.pathname === '/interests'
    const scrollingBody = onInterests
      ? document.getElementById('interests')
      : window

    const handleScroll = () => {
      // Header fade logic
      const header = document.querySelector('header')
      const headerHeight = header?.clientHeight || 0
      const scroll = onInterests ? scrollingBody.scrollTop : window.scrollY
      const header_opacity = 1 - scroll / headerHeight
      header.style.opacity = Math.max(0, Math.min(header_opacity, 1)).toString()

      // Footer fade logic
      const footer = document.querySelector('footer')
      const footerHeight = footer?.clientHeight || 0
      const scrollHeight = onInterests
        ? scrollingBody.scrollHeight
        : document.documentElement.scrollHeight
      const scrollPositionFromBottom =
        scrollHeight - (scroll + window.innerHeight)
      const footer_opacity = 1 - scrollPositionFromBottom / footerHeight
      footer.style.opacity = Math.max(0, Math.min(footer_opacity, 1)).toString()
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
