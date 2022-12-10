const listHelper = require('../utils/list_helper')
const blogLists = require('./example_blogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const emptyList = []
  const listWithOneBlog = blogLists.listWithOneBlog
  const listWithManyBlogs = blogLists.listWithManyBlogs

  //test if empty list is 0
  test('of empty list is 0', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  //test if list of single blog is its own likes
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  //test many blogs
  test('of a bigger list is right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})