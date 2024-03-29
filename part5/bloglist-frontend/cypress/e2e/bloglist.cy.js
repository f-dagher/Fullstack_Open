describe('Blog app', function() {
  beforeEach(function() {
    //using 8080 as port for backend
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Son Goku',
      username: 'goku',
      password: '9001'
    }
    const newUser = {
      name: 'Test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, newUser)
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
        cy.createBlog(
          {
            title: 'Cypress by Goku',
            author: 'Goku',
            url: 'example.com',
            likes: 44
          }
        )
      })

      it('one of those can be liked', function () {
        cy.contains('Cypress by Goten').parent().find('button').as('view')
        cy.get('@view').click()
        cy.contains('like').click()
        cy.contains(9)
      })

      it('one of those can be deleted by the user', function () {
        cy.contains('Cypress by Goku').parent().find('button').as('view')
        cy.get('@view').click()
        cy.contains('remove').click()
        //success is spelt wrong and so success is used instead
        cy.get('.sucess')
          .should('contain', 'Removed Cypress by Goku')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
        //cy.wait(5000) - need to wait if using html
        cy.get('#bloglist').should('not.contain', 'Cypress by Goku')
        cy.get('#bloglist').should('contain', 'Cypress by Gohan')
        cy.get('#bloglist').should('contain', 'Cypress by ChiChi')
        cy.get('#bloglist').should('contain', 'Cypress by Goten')
      })

      it('a different user cannot see the delete button', function () {
        //logout user and login as different user
        cy.contains('logout').click()
        cy.login({ username: 'test', password: 'test' })
        cy.contains('Cypress by Goku').parent().find('button').as('view')
        cy.get('@view').click()

        cy.should('not.contain', 'remove')
      })

      it('blogs are ordered from greatest to least', function () {
        //like a blog so the order changes to see if it is ordered correctly
        cy.contains('Cypress by Goten').parent().find('button').as('view')
        cy.get('@view').click()

        //find like button for blog and click it 4 times
        for (let i = 0; i < 4; i++){
          cy.get('.like').click()
          cy.wait(500)
        }

        cy.get('.blog').eq(0).should('contain', 'Cypress by Goku')
        cy.get('.blog').eq(1).should('contain', 'Cypress by Goten')
        cy.get('.blog').eq(2).should('contain', 'Cypress by ChiChi')
        cy.get('.blog').eq(3).should('contain', 'Cypress by Gohan')
      })
    })
  })
})