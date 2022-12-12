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

describe('favourite blog', () => {
  const emptyList = []
  const listWithOneBlog = blogLists.listWithOneBlog
  const listWithManyBlogs = blogLists.listWithManyBlogs

  //test if empty list is 0
  test('of empty list is null', () => {
    const result = listHelper.favouriteBlog(emptyList)
    expect(result).toEqual(
      null
    )
  })

  //test if list of single blog is the favourite
  test('when list has only one blog, the favourite blog is that', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  //test many blogs
  test('of a bigger list is right', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    )
  })
})