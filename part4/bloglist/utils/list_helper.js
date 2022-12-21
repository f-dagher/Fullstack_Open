const _ = require('lodash')

//dummy test
const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

//returns total likes of all blogs
const totalLikes = (blogs) => {

  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  let mostLikedBlog = null
  let maxLikes = 0

  // Loop through each blog in the list
  for (const blog of blogs) {
    // Check if the current blog has more likes than the current most liked blog
    if (blog.likes > maxLikes) {
      mostLikedBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
      maxLikes = blog.likes
    }
  }

  return mostLikedBlog
}

const mostBlogs = (blogs) =>{
  //count authors in blog list
  //return author with most amount of blogs
  const authorBlogs = _.countBy(blogs, 'author')
  //{ 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }
  
  const author = Object.keys(authorBlogs)

  // find the key with the largest value
  const mostPosts = author.reduce((a, b) => (author[a] > author[b] ? a : b))

  return {
    author: mostPosts, 
    blogs: authorBlogs[mostPosts]
  }
}

const mostLikes = (blogs) =>{
  //group blogs by author name
  //look through their blogs
  //sum all their likes
  //find max likes

  if (blogs.length === 0 ){
    return null
  }

  const groupedAuthors = _(blogs)
    .groupBy('author')
    .map((objs, key) => {
      return{
        'author': key,
        'likes': _.sumBy(objs, 'likes')
      }
    })
    .sortBy('likes')
    .reverse()
    .value()
  //console.log(groupedAuthors[0])

  return groupedAuthors[0]
}
  
module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}