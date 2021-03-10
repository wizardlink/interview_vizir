interface ConversorOptions {
  destination: string
  origin: string
  plan: string
  time: string
}

function updateConversor (cy: Cypress.Chainable, values: ConversorOptions): void {
  // Set origin
  const origin = '[data-cy=selector-origin]'
  cy.get(origin)
    .click()
  cy.get(origin)
    .type(values.origin + '{enter}', { delay: 100 })

  // Set destination
  const destination = '[data-cy=selector-destination]'
  cy.get(destination)
    .click()
  cy.get(destination)
    .type(values.destination + '{enter}', { delay: 100 })

  // Set plan
  const plan = '[data-cy=selector-plan]'
  cy.get(plan)
    .click()
  cy.get(plan)
    .type(values.plan + '{enter}', { delay: 100 })

  // Set the time spent on the call
  const time = '[data-cy=input-time]'
  cy.get(time)
    .click()
  cy.get(time)
    .type(values.time + '{enter}', { delay: 100 })
}

describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/') // Refreshes page for every test
  })

  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'Telzir')
  })

  it('has the prices set as hyphen when there is nothing selected', () => {
    cy.get('[data-cy^=price]').should('include.text', '-')
  })

  it('updates price after selecting basic options', () => {
    updateConversor(cy, {
      origin: '011',
      destination: '016',
      plan: '30',
      time: '60'
    })

    cy.get('[data-cy^=price]').should('not.include.text', '-')
  })

  it('updates the price with the plan correctly', () => {
    updateConversor(cy, {
      origin: '011',
      destination: '016',
      plan: '30',
      time: '60'
    })

    // Calling from 011 to 016 has the fare of 1.90
    // Normally this would be an API call to make sure the fare is correct
    const fare = 1.90

    cy.get('[data-cy=price-plan]').should('include.text', `${(fare * 60 - fare * 30).toFixed(2)}`)
    cy.get('[data-cy=price-full]').should('include.text', `${(fare * 60).toFixed(2)}`)
  })

  it('shows the full discount when the plan is correctly set', () => {
    updateConversor(cy, {
      origin: '011',
      destination: '016',
      plan: '30',
      time: '30'
    })

    // Calling from 011 to 016 has the fare of 1.90
    // Normally this would be an API call to make sure the fare is correct
    const fare = 1.90

    cy.get('[data-cy=price-plan]').should('include.text', `${(fare * 30 - fare * 30).toFixed(2)}`)
    cy.get('[data-cy=price-full]').should('include.text', `${(fare * 30).toFixed(2)}`)
  })
})
