/* eslint-disable no-undef */
describe('Blog app', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Blogs')
    cy.contains('Username')
    cy.contains('Password')
  })

  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('input:first').type('koushik')
    cy.get('input:last').type('passtest')
    cy.get('#login-button').click()

    cy.contains('Koushik Dey logged in')
  })
})
