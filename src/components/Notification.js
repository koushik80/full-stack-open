const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type} style={{color:"red"}}>
      {notification.text}
    </div>
  )
};

export default Notification;