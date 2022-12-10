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
  
module.exports = {
  dummy, totalLikes
}