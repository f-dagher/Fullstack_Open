const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./api_test_helper')

const mongoUrl = config.MONGODB_URI

beforeEach(async () => {
  //was causing error withotut
  await mongoose.connect(mongoUrl)

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)

describe('adding blogs and ids', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
  
  test('ids are returned as id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => expect(blog.id).toBeDefined())
  }, 100000)
  
  test('ids are not returned as not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => expect(blog._id).not.toBeDefined())
  }, 100000)
})

describe('Posting new blogs' , () => {
  test('that is valid is added', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'New Person',
      url: 'example.com',
      likes: 3,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'A new blog'
    )
  })
  test('with missing likes defaults to 0 ', async () => {
    const newBlog = {
      title: 'I didnt specify likes',
      author: 'Me',
      url: 'example.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('with missing title results in bad request', async () => {
    const newBlog = {
      author: 'Me',
      url: 'example.com',
      likes: 4
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('with missing url results in bad request', async () => {
    const newBlog = {
      title: 'Missing an url',
      author: 'Me',
      likes: 4
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe ('deletion of a blog', () => {
  test('succeeds with code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe ('updating a blog', () => {
  test('succeeds with code 200 and correctly changes likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({likes: 9})
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const likes = blogsAtEnd.map(r => r.likes)
    console.log(likes)

    expect(likes).toContain(9)
  })
})




afterAll(() => {
  mongoose.connection.close()
})