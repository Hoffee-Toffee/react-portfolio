export default function InterestSection(props) {
  const { id, content } = props
  return (
    <div id={id} className="interest">
      {content}
      <span className="scroll-indicator">
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </span>
    </div>
  )
}
