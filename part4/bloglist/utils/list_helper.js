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
  let mostLikes = 0

  // Loop through each blog in the list
  for (const blog of blogs) {
    // Check if the current blog has more likes than the current most liked blog
    if (blog.likes > mostLikes) {
      mostLikedBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
      mostLikes = blog.likes
    }
  }

  return mostLikedBlog
}
  
module.exports = {
  dummy, totalLikes, favouriteBlog
}