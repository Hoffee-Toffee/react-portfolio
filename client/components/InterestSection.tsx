export default function InterestSection(props) {
  const { index, id, content, scrollData } = props
  let { pageHeight, scroll, sectionHeight } = scrollData

  let style = {}

  scroll = scroll || 0
  pageHeight = pageHeight || 0
  sectionHeight = sectionHeight || 0

  // Check if between the start and end of the parallax effect
  // Parallax effect starts once you reach the 'interest' element that the div is in
  // Parallax effect ends once you reach the 'interest' element that the div is in
  if (
    scroll >= index * sectionHeight - pageHeight / 2 &&
    scroll <= (index + 1) * sectionHeight * pageHeight
  ) {
    // Calculate the change in position
    const changeInPosition =
      scroll - (index + 0.5) * sectionHeight - pageHeight / 2
    // Change the position of the div
    style = {
      transform: 'translateY(' + -changeInPosition + 'px)',
      visibility: 'visible',
    }
  }
  // Check if before the start of the parallax effect
  else if (scroll < pageHeight / 2) {
    style = { visibility: 'hidden' }
  }
  // Check if after the end of the parallax effect, don't apply to the last .bg div
  else if (scroll > pageHeight / 2) {
    style = {
      transform: 'translateY(0)',
      visibility: 'hidden',
    }
  }

  return (
    <div id={id} className="interest" style={style}>
      {content}
      <span className="scroll-indicator">
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </span>
    </div>
  )
}
