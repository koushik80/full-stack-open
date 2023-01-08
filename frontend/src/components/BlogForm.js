import React from 'react'

const BlogForm = ({onSubmit, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
            Title: <input value={newTitle} onChange={handleTitleChange} />
        </div><br />
        <div>
            Author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div><br />
        <div>
            Url: <input value={newUrl} onChange={handleUrlChange} />
        </div><br />
        <div>
            <button type="submit">add</button>
        </div>
    </form>
  )
}

export default BlogForm
