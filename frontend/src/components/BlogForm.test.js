import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

import userEvent from '@testing-library/user-event'

test('test should check, that the form calls the event handler it received as props with the right details when a new blog is created.', async () => {
  const createBlog = jest.fn()

  const user = userEvent.setup()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const sendButton = screen.getByText('Add')
  const input = screen.queryAllByText('textbox')

  await user.type(input, {
    target: { value: 'I am learning app testing' }
  })

  /*
  const title = screen.queryByText('title')
  const author = screen.queryByText('author')
  const url = screen.queryByText('url')
  //const form = component.container.querySelector('form')


  await user.type(title, {
    target: { value: 'I am learning app testing' }
  })
  await user.type(author, {
    target: { value: 'Koushik' }
  })
  await user.type(url, {
    target: { value: 'www.koushik.com' }
  })
*/
  await user.click(sendButton)


  /*
  fireEvent.change(title, {
    target: { value: 'I am learning app testing' }
  })

  fireEvent.change(author, {
    target: { value: 'Koushik' }
  })

  fireEvent.change(url, {
    target: { value: 'www.koushik.com' }
  })
  fireEvent.submit(form)

  */

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('I am learning app testing')
  expect(createBlog.mock.calls[0][0].author).toBe('Koushik')
  expect(createBlog.mock.calls[0][0].url).toBe('www.koushik.com' )
})
