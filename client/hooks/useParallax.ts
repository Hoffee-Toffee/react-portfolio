// ─── Parallax method reference ────────────────────────────────────────────────
//
// Apply data attributes directly to the fg element (or any element in a slide):
//
//   data-parallax="scroll-up"
//     Continuous parallax drift through both entry and exit — element starts
//     low on entry and drifts upward throughout.
//     data-parallax-speed="0.5"   (default: 0.5 — fraction of scroll distance to drift;
//                                  0 = static, 1 = moves as fast as the scroll)
//     data-parallax-target="#id"  (optional — CSS selector of the element to transform;
//                                  defaults to the element itself)
//
//   data-parallax="float-fade"
//     Entry: drifts up from below, fades in over the second half of entry.
//     Exit:  stays static, fades out immediately.
//     Always uses speed 0.5.
//     data-parallax-fade-out="1.0" (default: 1.0 — fraction of viewportHeight at which
//                                   opacity reaches 0; 0.5 = fades out at half scroll-away)
//     data-parallax-target="#id"  (optional, same as above)
//
// The .bg class parallax is generic and needs no data attributes.
// ─────────────────────────────────────────────────────────────────────────────

const useParallax = () => {
  const scrollBody = document.getElementById('interests') as HTMLElement
  if (!scrollBody) return null

  const viewportHeight = scrollBody.offsetHeight
  const scrollPosition = scrollBody.scrollTop

  // Lazy-load images that declare a data-src attribute
  const lazyImgs = Array.from(scrollBody.querySelectorAll('[data-src]'))
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLElement
        const src = img.getAttribute('data-src')
        if (src) img.setAttribute('src', src)
        observer.unobserve(img)
      }
    })
  })
  lazyImgs.forEach((img) => observer.observe(img))

  // ── Data-attribute driven parallax ─────────────────────────────────────────
  const parallaxEls = Array.from(
    scrollBody.querySelectorAll('[data-parallax]'),
  ) as HTMLElement[]

  parallaxEls.forEach((el) => {
    const method = el.getAttribute('data-parallax')

    // Resolve optional transform target
    const targetSelector = el.getAttribute('data-parallax-target')
    const target: HTMLElement = targetSelector
      ? (scrollBody.querySelector(targetSelector) as HTMLElement) ?? el
      : el

    // slideStart is the scrollPosition at which the slide is fully in view.
    // Since the scroll container == viewportHeight and each slide == viewportHeight,
    // parentSlide.offsetTop is exactly that scroll position.
    const parentSlide = el.closest('.interest') as HTMLElement | null
    const slideStart = parentSlide ? parentSlide.offsetTop : 0

    // localScroll: 0 when the slide first enters view, viewportHeight when leaving.
    const localScroll = scrollPosition - slideStart

    // ── scroll-up ─────────────────────────────────────────────────────────────
    // Continuous parallax through both entry and exit.
    // data-parallax-speed controls the drift fraction (0 = static, 1 = matches scroll).
    if (method === 'scroll-up') {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') ?? '0.5')
      target.style.transform = `translateY(${-localScroll * speed}px)`
    }

    // ── float-fade ────────────────────────────────────────────────────────────
    // Entry  (localScroll < 0): drifts in from below, fades in over the second
    //                           half of entry (absScroll ½→1 viewport).
    // In view (localScroll = 0): natural position, fully visible.
    // Exit   (localScroll > 0): stays static, fades out immediately,
    //                           reaching opacity 0 by localScroll = viewportHeight.
    if (method === 'float-fade') {
      if (localScroll <= 0) {
        // Entry: drift up from a lower starting point + fade in
        target.style.transform = `translateY(${-localScroll * 0.5}px)`
        const absScroll = Math.abs(localScroll)
        const halfWindow = viewportHeight / 2
        if (absScroll <= halfWindow) {
          target.style.opacity = '1'
        } else if (absScroll <= viewportHeight) {
          target.style.opacity = String(
            1 - (absScroll - halfWindow) / halfWindow,
          )
        } else {
          target.style.opacity = '0'
        }
      } else {
        // Exit: hold position, fade out over fadeOutDistance
        const fadeOutDistance =
          parseFloat(el.getAttribute('data-parallax-fade-out') ?? '1') *
          viewportHeight
        target.style.transform = 'translateY(0px)'
        target.style.opacity =
          localScroll <= fadeOutDistance
            ? String(1 - localScroll / fadeOutDistance)
            : '0'
      }
    }
  })

  // ── Generic .bg parallax ───────────────────────────────────────────────────
  // All .bg divs get a scroll-based translateY automatically — no config needed.
  const divs = Array.from(
    scrollBody.getElementsByClassName('bg'),
  ) as HTMLElement[]

  divs.forEach((div) => {
    const parentNode = (div.closest('.interest') ??
      div.parentElement) as HTMLElement
    if (
      scrollPosition >= parentNode.offsetTop - viewportHeight / 2 &&
      scrollPosition <=
        parentNode.offsetTop + parentNode.offsetHeight - viewportHeight / 2
    ) {
      const changeInPosition =
        scrollPosition -
        parentNode.offsetTop -
        viewportHeight / 2 +
        div.offsetHeight / 2
      div.style.transform = `translateY(${-changeInPosition}px)`
      div.style.visibility = 'visible'
    } else if (scrollPosition < parentNode.offsetTop - viewportHeight / 2) {
      div.style.visibility = 'hidden'
    } else if (
      scrollPosition >
        parentNode.offsetTop + parentNode.offsetHeight - viewportHeight / 2 &&
      div !== divs[divs.length - 1]
    ) {
      div.style.transform = 'translateY(0)'
      div.style.visibility = 'hidden'
    }
  })

  return null
}

export default useParallax
