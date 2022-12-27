const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./api_test_helper')


beforeEach(async () => {
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

afterAll(() => {
  mongoose.connection.close()
})