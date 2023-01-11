//local server:
//npx json-server --port 3001 --watch db.json

import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService
        .create(BlogToAdd)
      setSuccessMessage(
        `Blog ${BlogToAdd.title} was successfully added`
      )
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot add blog ${BlogToAdd.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(BlogToUpdate)
      setSuccessMessage(
        `Blog ${BlogToUpdate.title} was successfully updated`
      )
      setBlogs(blogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot update blog ${BlogToUpdate.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService
          .remove(BlogToDelete.id)
        setSuccessMessage(
          `Blog ${BlogToDelete.title} was successfully deleted`
        )
        setBlogs(blogs.filter(blog => blog.id !== BlogToDelete.id))
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch(exception) {
      setErrorMessage(
        `Cannot delete blog ${BlogToDelete.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const blogLikes = (l1, l2) => l2.likes - l1.likes

  const appColor = {
    'color': '#5874DC',
    'fontSize': 80
  }

  const cBlog = {
    'color': '#428CDA'
  }

  return (
    <div>
      <h2 style={appColor}>Blogs</h2> <hr color='red' />
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        /> :
        <div>
          <p>{user.name} logged in<button onClick={handleLogout} type="submit" style={{ color:'red', fontWeight:'bold' }}>Logout</button></p>
          <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
            <h2 style={cBlog}>Create Blog</h2>
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable> <br />
          {blogs.sort(blogLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
