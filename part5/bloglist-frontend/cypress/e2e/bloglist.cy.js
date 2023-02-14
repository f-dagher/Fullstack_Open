describe('Blog app', function() {
  beforeEach(function() {
    //using 8080 as port for backend
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })
})