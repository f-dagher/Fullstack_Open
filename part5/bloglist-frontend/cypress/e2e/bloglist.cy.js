describe('Blog app', function() {
  beforeEach(function() {
    //using 8080 as port for backend
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Son Goku',
      username: 'goku',
      password: '9001'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('goku')
      cy.get('#password').type('9001')
      cy.get('#login-button').click()

      cy.contains('Son Goku logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Son Goku logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'goku', password: '9001' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('a blog created by cypress')
      cy.get('#author-input').type('Cpyress Author')
      cy.get('#url-input').type('example.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
      cy.contains('Cpyress Author')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog(
          {
            title: 'Cypress by Gohan',
            author: 'Gohan',
            url: 'example.com',
            likes: 3
          }
        )
        cy.createBlog(
          {
            title: 'Cypress by Goten',
            author: 'Goten',
            url: 'example.com',
            likes: 8
          }
        )
        cy.createBlog(
          {
            title: 'Cypress by ChiChi',
            author: 'ChiChi',
            url: 'example.com',
            likes: 11
          }
        )
      })

      it('one of those can be liked', function () {
        cy.contains('Cypress by Goten').parent().find('button').as('view')
        cy.get('@view').click()
        cy.contains('like').click()
        cy.contains(9)
      })
    })
  })
})