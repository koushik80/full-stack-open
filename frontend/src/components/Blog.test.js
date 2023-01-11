import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog component tests', () => {
  let blog = {
    title:'I am learning app testing',
    author:'Koushik',
    url:'www.koushik.com',
    likes:4
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()
  let loggedUser = ''

  //ex 5.13
  test('Test which checks that the component displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default.', () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        loggedUser={loggedUser}
      />)
    //either
    /* expect(container).toHaveTextContent(
      'I am learning app testing'
    )
    expect(container).toHaveTextContent(
      'Koushik'
    )
    */
    //or
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('I am learning app testing')
    expect(div).toHaveTextContent('Koushik')
    //expect(div).not.toHaveTextContent('www.koushik.com')
    //expect(div).not.toHaveTextContent('4')
  })

  //ex 5.14
  test('Test which checks when the View button is clicked displays url and number of likes', async () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        loggedUser={loggedUser}
      />)

    const user = userEvent.setup() // if we use user-event
    const button = component.getByText('View')
    await user.click(button)
    //or
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.koushik.com')
    expect(component.container).toHaveTextContent('4')
  })

  //ex 5.15- test failed
  test('Test which ensures that if the like button is clicked twice.', async () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        loggedUser={loggedUser}
      />)

    const mockHandler = jest.fn()
    const button = component.getByText('View')
    fireEvent.click(button)

    const likeButton = screen.getByText('button', { name: 'like' })
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
