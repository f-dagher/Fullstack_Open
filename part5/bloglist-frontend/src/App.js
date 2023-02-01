import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [msgStyle, setMsgStyle] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      setMessage(`${user.name} logged in`)
      setMsgStyle('sucess')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('wrong credentials')
      setMsgStyle('fail')
      setTimeout(() => {
        setMessage(null)
        setMsgStyle(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setMessage(`${user.name} logged out`)
    setMsgStyle('sucess')
    window.localStorage.clear()
    setUser(null)
    setTimeout(() => {
      setMessage(null)
      setMsgStyle(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    console.log('before adding')
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    console.log('added')
    setMessage(`A new blog: ${blogObject.title} by ${blogObject.author} is added`)
    setMsgStyle('sucess')
    setTimeout(() => {
      setMessage(null)
      setMsgStyle(null)
    }, 5000)
  }

  const addLikes = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setMsgStyle('sucess')
        setMessage('You liked a blog!')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (id, blogObject) => {
    if(window.confirm(`Remove blog '${blogObject.title}'?`)) {
      blogService
        .remove(id)
        .then(() => {
          setMsgStyle('sucess')
          setMessage( `Removed ${blogObject.title}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setBlogs(blogs.filter(b => b.id !== id))
        })
        .catch(error => {
          setMsgStyle('fail')
          setMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setMsgStyle(null)
            setMessage(null)
          }, 5000)
        })
    }
  }

  const blogsToShow =
    blogs
      .filter(blog => blog.title)
      .sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} msgStyle={msgStyle} />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        /> :
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogsToShow.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              addLikes={addLikes}
              removeBlog={removeBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App

/*
Used for testing

  if(!blogObject.title || !blogObject.author || !blogObject.url){
      setMessage('Missing fields')
      setMsgStyle('fail')
      setTimeout(() => {
        setMessage(null)
        setMsgStyle(null)
      }, 5000)
    }
*/
