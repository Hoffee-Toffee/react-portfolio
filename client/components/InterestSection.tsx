export default function InterestSection(props) {
  const { index, id, content } = props

  const style = {}

  return (
    <div id={id} className="interest" style={style}>
      {content}
      <span className="scroll-indicator">
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </span>
    </div>
  )
}
