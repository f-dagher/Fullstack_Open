import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

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

  beforeEach(() => {
    container = render(
      <Blog blog={blog}/>
    ).container
  })

  test('at start only the title and author are shown', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveClass('expanded-view')
  })
})
