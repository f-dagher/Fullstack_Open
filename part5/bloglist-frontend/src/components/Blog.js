import { useState } from 'react'

const Blog = ({ blog, addLikes }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const changedBlogLikes = { ...blog, likes: blog.likes + 1 }
    console.log(changedBlogLikes)
    addLikes(blog.id, changedBlogLikes)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <button onClick={toggleVisibility}> {visible? 'hide' : 'view'} </button>
      {visible &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes { ' ' }
            {blog.likes} { ' '}
            <button onClick={handleLikes}> like </button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      }
  </div>
)}
export default Blog