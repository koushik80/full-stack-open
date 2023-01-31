import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props.notification

  const style = {
    border: 'solid teal',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(mapStateToProps, null)(Notification)