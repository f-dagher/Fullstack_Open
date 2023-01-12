const blogsRouter = require('express').Router()
//const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const Blog = require('../models/blog')
//const User = require('../models/user')

const userExtractor = middleware.userExtractor


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = await request.user
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = await request.user

  if(!blog){
    response.status(404).json({ error: 'no blog found to delete'})
  }

  if (blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    response.status(401).json({ error: 'unauthorized user, no permissions'})
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  const user = await request.user

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if (blog.user.toString() === user.id.toString()){
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
  }
  else{
    response.status(401).json({ error: 'unauthorized user, no permissions'})
  }
  

})

module.exports = blogsRouter

/*
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})*/