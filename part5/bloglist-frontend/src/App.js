import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: ''})
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
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
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '', author: '', url: ''})
      })
  }

  
  const handleTitleChange = (event) => {
    setNewBlog({...newBlog, title: event.target.value})
    console.log(newBlog)
  }
  const handleAuthorChange = (event) => {
    setNewBlog({...newBlog, author: event.target.value})
    console.log(newBlog)
  }
  const handleUrlChange = (event) => {
    setNewBlog({...newBlog, url: event.target.value})
    console.log(newBlog)
  }


  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.title)
  
    const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    )

    const blogForm = () => (
      <div>
        <h2> Create a new blog </h2>
        <form onSubmit={addBlog}>
          <div>
            Title: 
              <input
              type="text"
              value={newBlog.title}
              name="Title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            Author: 
              <input
              type="text"
              value={newBlog.author}
              name="Author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            URL: 
              <input
              type="text"
              value={newBlog.url}
              name="Url"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    )

    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={errorMessage} />
        {user === null ?
          loginForm() :
          <div>
            <p>
              {user.name} logged in 
              <button onClick={handleLogout}>logout</button>
            </p>
            {blogForm()}
            {blogsToShow.map(blog => 
              <Blog
                key={blog.id}
                blog={blog}
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
*/
