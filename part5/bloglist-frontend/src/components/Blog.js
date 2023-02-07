import { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const changedBlogLikes = { ...blog, likes: blog.likes + 1 }
    console.log(changedBlogLikes)
    addLikes(blog.id, changedBlogLikes)
  }

  const handleRemove = () => {
    removeBlog(blog.id, blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className={'blog'}>
      <div className='default-view'>
        {blog.title} {blog.author}
      </div>
      <button onClick={toggleVisibility} className={'view'}> {visible? 'hide' : 'view'} </button>
      {visible &&
        <div className='expanded-view'>
          <div className='url'>{blog.url}</div>
          <div className='likes'>
            likes { ' ' }
            {blog.likes} { ' '}
            <button onClick={handleLikes} className={'like'}> like </button>
          </div>
          <div className='username'>{blog.user.username}</div>
          {user.username === blog.user.username &&
            <div>
              <button onClick={handleRemove}> remove </button>
            </div>
          }
        </div>
      }
    </div>
  )}
export default Blog