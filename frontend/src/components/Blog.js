import React , { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'Hide' : 'View'

  const increaseLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const removeBlog = () => props.deleteBlog(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid 2px',
    color: '#041B2D',
    fontWeight: 'bold',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p style={{ color:'#35BBCA' }}>{blog.title} - {blog.author} <button onClick={toggleVisibility} style={{ color:'#004E9A', fontWeight:'bold' }}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p style={{ color:'#35BBCA', fontStyle:'italic' }}>{blog.url}</p>
        <p style={{ color:'#35BBCA' }}>{blogObject.likes} <button id='like-button' onClick={increaseLikes} style={{ color: '#0191B4', fontWeight: 'bold' }}>Like</button></p>
        <h4 style={{ color:'#35BBCA' }}>{blog.author }</h4>
        <button id='remove' onClick={removeBlog} style={{ color:'red', fontWeight:'bold' }}>Remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog