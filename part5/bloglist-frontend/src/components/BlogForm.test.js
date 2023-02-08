import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<Blogform /> updates parent state and calls onSubmit', async () => {
  const creatBlog = jest.fn()

  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={creatBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const sendButton = screen.getByText('save')

  await user.type(titleInput, 'title test')
  await user.type(authorInput, 'author test')
  await user.type(urlInput, 'test.com')
  await user.click(sendButton)

  expect(creatBlog.mock.calls).toHaveLength(1)
  expect(creatBlog.mock.calls[0][0].title).toBe('title test')
  expect(creatBlog.mock.calls[0][0].author).toBe('author test')
  expect(creatBlog.mock.calls[0][0].url).toBe('test.com')
})