import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'testing render',
    author: 'Beerus',
    url: 'dbz.com',
    likes: 4,
    user: {
      username: 'admin',
      name: 'Admin'
    }
  }

  const loggedInUser = {
    username: 'admin',
    name: 'Admin'
  }

  const mockLike = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={loggedInUser} addLikes={mockLike}/>
    ).container
  })

  test('at start only the title and author are shown', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveClass('expanded-view')
  })

  test('after clicking the button, URL and likes are shown too', async() => {
    const user = userEvent.setup()
    const button = container.querySelector('.view')
    await user.click(button)

    const div = container.querySelector('.blog')
    const buttonElement = screen.getByText('hide')
    const expandedDiv = container.querySelector('.expanded-view')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
    expect(expandedDiv).toBeInTheDocument()
    expect(buttonElement).toBeDefined
  })

  test('clicking the like button twice results in two likes', async() => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('.view')
    await user.click(viewButton)

    const likeButton = container.querySelector('.like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})
