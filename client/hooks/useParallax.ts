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
  const scrollBodyRect = scrollBody.getBoundingClientRect()

  // Returns the stable offset of el from the top of the scroll container,
  // regardless of scroll position. Reliable for sticky elements.
  const getScrollOffset = (el: HTMLElement): number =>
    el.getBoundingClientRect().top - scrollBodyRect.top + scrollPosition

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
    // For sticky slides, use getBoundingClientRect on the snap1 parent wrapper
    // to get the stable scroll-container offset, avoiding offsetTop=0 from sticky.
    const parentSlide = el.closest('.interest') as HTMLElement | null
    const isSticky = parentSlide
      ? getComputedStyle(parentSlide).position === 'sticky'
      : false
    const slideStart = parentSlide
      ? isSticky
        ? getScrollOffset(parentSlide.parentElement as HTMLElement)
        : parentSlide.offsetTop
      : 0

    // localScroll: 0 when the slide first enters view, viewportHeight when leaving.
    const localScroll = scrollPosition - slideStart

    // ── scroll-up ─────────────────────────────────────────────────────────────
    // Continuous parallax through both entry and exit.
    // data-parallax-speed controls the drift fraction (0 = static, 1 = matches scroll).
    // For sticky slides: clamp localScroll to 0 so the element only drifts during
    // entry (title card → P1) and stays frozen at its natural position through the zone.
    if (method === 'scroll-up') {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') ?? '0.5')
      const effectiveScroll = isSticky ? Math.min(localScroll, 0) : localScroll
      target.style.transform = `translateY(${-effectiveScroll * speed}px)`
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
    // For sticky elements: effectiveOffsetTop from the zone (parentElement),
    // zoneHeight from the zone itself (NOT grandparent — that would be #interests = 100dvh).
    const isSticky = getComputedStyle(parentNode).position === 'sticky'
    const effectiveOffsetTop = isSticky
      ? getScrollOffset(parentNode.parentElement as HTMLElement)
      : parentNode.offsetTop
    const zoneHeight = isSticky
      ? parentNode.parentElement?.offsetHeight ?? parentNode.offsetHeight
      : parentNode.offsetHeight
    if (
      scrollPosition >= effectiveOffsetTop - viewportHeight / 2 &&
      scrollPosition <= effectiveOffsetTop + zoneHeight - viewportHeight / 2
    ) {
      const changeInPosition =
        scrollPosition -
        effectiveOffsetTop -
        viewportHeight / 2 +
        div.offsetHeight / 2
      div.style.transform = `translateY(${-changeInPosition}px)`
      div.style.visibility = 'visible'
    } else if (scrollPosition < effectiveOffsetTop - viewportHeight / 2) {
      div.style.visibility = 'hidden'
    } else if (
      scrollPosition > effectiveOffsetTop + zoneHeight - viewportHeight / 2 &&
      div !== divs[divs.length - 1]
    ) {
      div.style.transform = 'translateY(0)'
      div.style.visibility = 'hidden'
    }
  })

  // ── Grace zone drift (P1 → P2) ──────────────────────────────────────────
  // Entry parallax is handled by data-parallax="scroll-up" on #grace (translateY).
  // This translateY drift on #grace-scale compensates for the static sticky background
  // between P1 and P2. translateY is used (not marginTop) so it is not clipped by
  // the overflow:hidden on #grace-scale.
  //
  // Key design:
  //   Entry  (localScroll < 0): translateY held at +Amp*VH (Grace pushed below center).
  //   P1     (localScroll = 0): translateY = +Amp*VH — no jump, Grace is below center.
  //   P1→P2  (0 → VH):         power-curve drift +Amp*VH → 0 → -Amp*VH (Grace rises).
  //   Past P2 (localScroll > VH): translateY held at -Amp*VH.
  //
  // Grace is centered between P1 & P2 (not at P1, not at P2).
  //
  // Tweak GRACE_DRIFT_EXPONENT: 1 = linear, 3 = moderate S-curve, 5+ = very slow through middle.
  // Tweak GRACE_DRIFT_AMPLITUDE: fraction of viewport height for total travel.
  const GRACE_DRIFT_EXPONENT = 3
  const GRACE_DRIFT_AMPLITUDE = 0.1 // 0.1 = ±10dvh (total 20dvh travel)

  const graceScale = scrollBody.querySelector(
    '#grace-scale',
  ) as HTMLElement | null
  const moviesTvZone = scrollBody.querySelector(
    '#movies-tv-zone',
  ) as HTMLElement | null
  if (graceScale && moviesTvZone) {
    const zoneStart = getScrollOffset(moviesTvZone)
    const localScroll = scrollPosition - zoneStart
    let translateYPx: number
    if (localScroll < 0) {
      // Entry: hold at the zone-start value so there's no jump at P1
      translateYPx = GRACE_DRIFT_AMPLITUDE * viewportHeight
    } else {
      // Zone P1→P2: power-curve from +Amp (below) → 0 (mid) → -Amp (above)
      const t = Math.min(localScroll / viewportHeight, 1)
      const normalized = 2 * t - 1 // -1 at P1, 0 at midpoint, +1 at P2
      const eased =
        Math.sign(normalized) *
        Math.pow(Math.abs(normalized), GRACE_DRIFT_EXPONENT)
      // eased=-1 at P1 → +Amp (below); eased=+1 at P2 → -Amp (above)
      translateYPx = -eased * GRACE_DRIFT_AMPLITUDE * viewportHeight
    }
    // Preserve any existing transforms on #grace-scale (e.g. from grace-scale animation)
    // by only replacing/appending our translateY token
    graceScale.style.transform = `translateY(${translateYPx}px)`
  }

  return null
}

export default useParallax
