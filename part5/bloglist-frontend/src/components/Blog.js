import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
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
          <div>{blog.likes}</div>
          <div>{blog.user.username}</div>
        </div>
      }
  </div>
)}
export default Blog