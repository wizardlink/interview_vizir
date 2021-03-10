describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/') // Refreshes page for every test
  })

  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'Telzir')
  })

  it('has the prices set as hyphen when there is nothing selected', () => {
    cy.get('[data-cy=price]').should('include.text', '-')
  })

  it('updates price after selecting the options', () => {
    // Set origin
    cy.get('[data-cy=selector-origin]').click()
    cy.contains('011').click()

    // Set destination
    cy.get('[data-cy=selector-destination]').click()
    cy.contains('016').click()

    // Set the time spent on the call
    cy.get('[data-cy=input-time]')
      .click()
      .type('60')

    cy.get('[data-cy=price]').should('not.include.text', '-')
  })
})
