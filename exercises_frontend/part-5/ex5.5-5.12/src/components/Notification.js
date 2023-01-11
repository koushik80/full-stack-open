import React from 'react'
import PropTypes from 'prop-types'

const error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const success = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: '10',
  marginBottom: 10

}

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if (successMessage){
    return (
      <div style={success}>
        {successMessage}
      </div>
    )
  } else {
    return (
      <div style={error}>
        {errorMessage}
      </div>
    )
  }
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
}

export default Notification