const Notification = ({ notification }) => {
  const notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
  }
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type} style={notificationStyle}>
      {notification.text}
    </div>
  )
};

export default Notification;