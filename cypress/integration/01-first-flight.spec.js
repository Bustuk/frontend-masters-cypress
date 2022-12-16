/// <reference types="cypress" />

describe('Jetsetter', () => {
  beforeEach(() => {
    cy.visit('/jetsetter')
  })



  it('should filter elements - items  not found', () => {
    cy.get('[data-test="filter-items"]').type('xd');
    cy.get('[data-test="items-unpacked"]').find('[data-test="items-empty-state"]').should('be.visible')
  })

  it('should filter elements - find one', () => {
    cy.get('[data-test="filter-items"]').type('i');
    cy.get('[data-test="items-unpacked"] li').should('have.length', 1)
    cy.contains('iPhone Charger')
  })

  it('should filter elements - find many', () => {
    cy.get('[data-test="filter-items"]').type('t');
    cy.get('[data-test="items-unpacked"]').find('li').then(items => {
      expect(items).to.have.length(2)
    })
  })

  it('should remove all items', () => {
    cy.get('[data-test="remove-all"]').click()

    cy.get('[data-test="items-empty-state"]').should('have.length', 2)
  })

  it('should remove single item from unpacked', () => {
    cy.get('[data-test="items-unpacked"]')
      .find('[data-test="remove"]')
      .last()
      .click()
    
    cy.contains('iPhone').should('not.exist')
  })

  it('should remove single item from packed', () => {
    cy.get('[data-test="items-packed"]')
      .find('[data-test="remove"]')
      .click()

    cy.contains('Hoodie').should('not.exist')
  })

  it('should mark all items as unpacked', () => {
    cy.get('[data-test="mark-all-as-unpacked"]')
      .click()

    cy.get('[data-test="items-unpacked"] li')
      .should('have.length', 5)
  })

  it('should pack items', () => {
    cy.get('[data-test="items-unpacked"]')
      .find('input')
      .first()
      .click()

      cy.get('[data-test="items-packed"]')
      .find('li')
      .should('have.length', 2)
  })

});
