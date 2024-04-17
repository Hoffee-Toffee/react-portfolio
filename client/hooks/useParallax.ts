import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useParallax = () => {
  // interests.style.paddingRight =
  //   interests.offsetWidth - interests.clientWidth + 'px'

  // Secrets
  // document.getElementById('s-block').addEventListener('click', function () {
  //   window.location.href = window.location.origin + '/src/secret/secret.html'
  // })

  // Creates parallax effects based on the scroll position
  // Controls opacity and the position of elements
  const scrollBody = document.getElementById('interests')

  // Get the height of the 'interests' element
  const viewportHeight = scrollBody.offsetHeight

  // Get the scroll position of the 'interests' element
  const scrollPosition = scrollBody.scrollTop

  // Get all .fg-img elements as an array
  let fgImgs = Array.from(document.getElementsByClassName('fg-img'))

  // Also add the tetronimos element to the array
  fgImgs.push(document.getElementById('tetronimos'))

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        const src = img.getAttribute('data-src')
        img.setAttribute('src', src)
        observer.unobserve(img)
      }
    })
  })

  fgImgs.forEach((img) => {
    observer.observe(img)
  })

  // Remove all elements from the array that are not visible
  fgImgs = fgImgs.filter((el) => {
    return (
      el.getBoundingClientRect().top < viewportHeight &&
      el.getBoundingClientRect().bottom > 0
    )
  })

  // Style the remaining elements according to their group or id

  // Down-in: When the user transitions into this element from the element above
  // Down-out: When the user transitions from this element into the element below
  // Up-in: When the user transitions from the element below into this element
  // Up-out: When the user transitions from this element into the element above

  if (fgImgs.includes(document.getElementById('isaac-clarke'))) {
    // Isaac Clarke
    // Float up on down-in, and down on up-out
    // Fades out on down-out, and fades in on up-in
    const fgImg = document.getElementById('isaac-clarke')
    // Down-in & Up-out
    if (
      scrollPosition >= viewportHeight * 0.5 - fgImg.offsetHeight / 2 &&
      scrollPosition <= viewportHeight * 0.5 + fgImg.offsetHeight / 2
    ) {
      const changeInPosition = scrollPosition * 0.5 - fgImg.offsetHeight / 2
      fgImg.style.transform = 'translateY(' + -changeInPosition + 'px)'
      fgImg.style.opacity = 1
    }
    // Above
    else if (scrollPosition < viewportHeight * 0.5 - fgImg.offsetHeight / 2) {
      fgImg.style.transform = 'translateY(0px)'
      fgImg.style.opacity = 1
    }
    // Down-out & Up-in
    else if (
      scrollPosition > viewportHeight * 0.5 + fgImg.offsetHeight / 2 &&
      scrollPosition < viewportHeight * 0.5 + fgImg.offsetHeight
    ) {
      fgImg.style.opacity =
        1 -
        (scrollPosition - (viewportHeight * 0.5 + fgImg.offsetHeight / 2)) /
          (fgImg.offsetHeight / 2)
      fgImg.style.transform = 'translateY(0px'
    }
    // Below
    else if (scrollPosition > viewportHeight / 2 + fgImg.offsetHeight) {
      fgImg.style.opacity = '0'
    }
  }

  if (fgImgs.includes(document.getElementById('github'))) {
    // Github
    // Like Stark
    const fgImg = document.getElementById('github')
    // Down-in & Up-out & Down-out & Up-in
    if (
      scrollPosition >= viewportHeight * 1.5 - fgImg.offsetHeight / 2 &&
      scrollPosition <= viewportHeight * 1.5 + fgImg.offsetHeight * 2.5
    ) {
      const changeInPosition = scrollPosition / 2 - fgImg.offsetHeight
      fgImg.style.transform = 'translateY(' + -changeInPosition + 'px)'
    }
    // Above
    else if (scrollPosition < viewportHeight * 1.5 - fgImg.offsetHeight / 2) {
      fgImg.style.transform = 'translateY(0px)'
    }
  }

  if (fgImgs.includes(document.getElementById('starship'))) {
    // Starship
    const fgImg = document.getElementById('scroll')
    // Down-in & Up-out & Down-out & Up-in
    if (
      scrollPosition >= viewportHeight * 2.5 - fgImg.offsetHeight / 2 &&
      scrollPosition <= viewportHeight * 2.5 + fgImg.offsetHeight * 2.5
    ) {
      const changeInPosition = scrollPosition / 3 - fgImg.offsetHeight
      fgImg.style.transform = 'translateY(' + -changeInPosition + 'px)'
    }
    // Above
    else if (scrollPosition < viewportHeight * 2.5 - fgImg.offsetHeight / 2) {
      fgImg.style.transform = 'translateY(0px)'
    }
  }

  if (fgImgs.includes(document.getElementById('tetronimos'))) {
    // Tetronimos
    // Like Stark
    const fgImg = document.getElementById('tetronimos')
    // Down-in & Up-out & Down-out & Up-in
    if (
      scrollPosition >= viewportHeight * 3.5 - fgImg.offsetHeight / 2 &&
      scrollPosition <= viewportHeight * 3.5 + fgImg.offsetHeight * 2.5
    ) {
      const changeInPosition = scrollPosition / 4 - fgImg.offsetHeight
      fgImg.style.transform = 'translateY(' + -changeInPosition + 'px)'
    }
    // Above
    else if (scrollPosition < viewportHeight * 3.5 - fgImg.offsetHeight / 2) {
      fgImg.style.transform = 'translateY(0px)'
    }
  }

  if (fgImgs.includes(document.getElementById('memento'))) {
    // Memento
    // Like Stark
    const fgImg = document.getElementById('memento')
    // Down-in & Up-out & Down-out & Up-in
    if (
      scrollPosition >= viewportHeight * 4.5 - fgImg.offsetHeight / 2 &&
      scrollPosition <= viewportHeight * 4.5 + fgImg.offsetHeight * 2.5
    ) {
      const changeInPosition = scrollPosition / 5 - fgImg.offsetHeight
      fgImg.style.transform = 'translateY(' + -changeInPosition + 'px)'
    }
    // Above
    else if (scrollPosition < viewportHeight * 4.5 - fgImg.offsetHeight / 2) {
      fgImg.style.transform = 'translateY(0px)'
    }
  }

  // Get all .bg divs in the 'interests' element as an array
  const divs = Array.from(scrollBody.getElementsByClassName('bg'))

  // Loop through each .bg div
  divs.forEach((div) => {
    // Check if between the start and end of the parallax effect
    // Parallax effect starts once you reach the 'interest' element that the div is in
    // Parallax effect ends once you reach the 'interest' element that the div is in
    if (
      scrollPosition >= div.parentNode.offsetTop - viewportHeight / 2 &&
      scrollPosition <=
        div.parentNode.offsetTop +
          div.parentNode.offsetHeight -
          viewportHeight / 2
    ) {
      // Calculate the change in position
      const changeInPosition =
        scrollPosition -
        div.parentNode.offsetTop -
        viewportHeight / 2 +
        div.offsetHeight / 2

      // Change the position of the div
      div.style.transform = 'translateY(' + -changeInPosition + 'px)'
      div.style.visibility = 'visible'
    }
    // Check if before the start of the parallax effect
    else if (scrollPosition < div.parentNode.offsetTop - viewportHeight / 2) {
      div.style.visibility = 'hidden'
    }
    // Check if after the end of the parallax effect, don't apply to the last .bg div
    else if (
      scrollPosition >
        div.parentNode.offsetTop +
          div.parentNode.offsetHeight -
          viewportHeight / 2 &&
      div != divs[divs.length - 1]
    ) {
      div.style.transform = 'translateY(0)'
      div.style.visibility = 'hidden'
    }
  })

  return null
}

export default useParallax
