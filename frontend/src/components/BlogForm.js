import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle ] = useState('')
  const [newAuthor, setNewAuthor ] = useState('')
  const [newUrl, setNewUrl ] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div style={{ color:'#4ADEDE', fontWeight:'bold' }}>
        Title: <input id="title" value={newTitle} onChange={handleTitleChange} />
      </div><br />
      <div style={{ color:'#4ADEDE', fontWeight:'bold' }}>
        Author: <input id="author" value={newAuthor} onChange={handleAuthorChange} />
      </div><br />
      <div style={{ color:'#4ADEDE', fontWeight:'bold' }}>
        Url: <input id="url" value={newUrl} onChange={handleUrlChange} />
      </div><br />
      <div>
        <button id="login-button" type="submit" style={{ color:'#120C6E', fontWeight:'bold' }}>Add</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
