import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value })
  }
  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value })
  }
  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2> Create a new blog </h2>
      <form onSubmit={addBlog}>
        <div>
            Title:
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            id='title-input'
            onChange={handleTitleChange}
          />
        </div>
        <div>
            Author:
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            id='author-input'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
            URL:
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            id='url-input'
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm