import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div style={{ color:'#33539E', fontWeight:'bold', padding: '5px 2px' }}>
        Username
        <input
          id="username"
          type="text"
          autoComplete=""
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div><br />
      <div style={{ color:'#33539E', fontWeight:'bold', padding: '5px 2px' }}>
        Password
        <input
          id="password"
          type="password"
          autoComplete=""
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div><br />
      <button type="submit" style={{ color:'#56C506', fontWeight:'bold' }}>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm