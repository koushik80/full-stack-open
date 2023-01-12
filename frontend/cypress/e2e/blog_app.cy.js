describe('Blog app', () => {

  //ex 5.17
  beforeEach( () => {
    cy.request('POST', 'http://localhost:5001/api/testing/reset')

    //ex: 5.18
    const user = {
      name: 'Koushik Dey',
      username: 'koushik',
      password: 'passtest'
    }
    cy.request('POST', 'http://localhost:5001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  // ex:5.18
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login').click()
      cy.get('#username').type('koushik')
      cy.get('#password').type('passtest')
      cy.get('#login-button').click()

      cy.contains('Koushik Dey logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('Login').click()
      cy.get('#username').type('koushik')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)') //optional
        .and('have.css', 'border-style', 'solid')   //optional

      cy.get('html').should('not.contain', 'Koushik Dey logged in')
    })
  })

  //ex: 5.19
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'koushik', password: 'passtest' })
    })

    //ex: 5.19
    it('A blog can be created', () => {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('New Cypress test')
      cy.get('#author').type('Koushik')
      cy.get('#url').type('www.koushik.com')
      cy.contains('Add').click()

      cy.contains('New Cypress test - Koushik')
    })

    //ex: 5.20
    it('test that confirms users can like a blog', () => {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('New Cypress test')
      cy.get('#author').type('Koushik')
      cy.get('#url').type('www.koushik.com')
      cy.contains('Add').click()

      cy.contains('New Cypress test - Koushik')
      cy.contains('View').click()
      //cy.contain('0')
      cy.get('#like-button').click()
      cy.contains('1')
    })

    //ex: 5.21
    it('test for ensuring that the user who created a blog can delete it', () => {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('New Cypress test')
      cy.get('#author').type('Koushik')
      cy.get('#url').type('www.koushik.com')
      cy.contains('Add').click()

      cy.contains('New Cypress test - Koushik')
      cy.contains('View').click()
      cy.get('#remove').click()

      cy.get('html').should('not.contain', 'New Cypress test - Koushik')
    })
  })

  //ex: 5.22
  describe('Blogs are ordered by number of likes', () => {
    beforeEach(() => {
      cy.login({ username: 'koushik', password: 'passtest' })
      cy.createBlog({ title: 'blg1', author: 'Mark', url: 'http://mark.com./blg1' })
      cy.createBlog({ title: 'blg2', author: 'Paul', url: 'http://paul.com./blg2' })
      cy.createBlog({ title: 'blg3', author: 'Dio', url: 'http://dio.com./blg3' })
      cy.createBlog({ title: 'blg4', author: 'Sam', url: 'http://sam.com./blg4' })

      cy.contains('blg1').parent().parent().as('blog1')
      cy.contains('blg2').parent().parent().as('blog2')
      cy.contains('blg3').parent().parent().as('blog3')
      cy.contains('blg4').parent().parent().as('blog4')
    })

    it('ordered by number of likes', () => {
      cy.get('@blog1').contains('View').click()
      cy.get('@blog2').contains('View').click()
      cy.get('@blog3').contains('View').click()
      cy.get('@blog4').contains('View').click()
      cy.get('@blog1').contains('Like').as('Like1')
      cy.get('@blog2').contains('Like').as('Like2')
      cy.get('@blog3').contains('Like').as('Like3')
      cy.get('@blog4').contains('Like').as('Like4')

      cy.get('@Like2').click()
      cy.wait(500)
      cy.get('@Like1').click()
      cy.wait(500)
      cy.get('@Like1').click()
      cy.wait(500)
      cy.get('@Like3').click()
      cy.wait(500)
      cy.get('@Like3').click()
      cy.wait(500)
      cy.get('@Like3').click()
      cy.wait(500)
      cy.get('@Like4').click()
      cy.wait(500)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})
