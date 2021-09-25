/// <reference types="Cypress" />

describe('Single Calendar Navigation', () => {
    const url = 'https://www.iohotel.my/'
    beforeEach('Visit URL', () => {
        cy.visit(url);
        cy.url().should('eq', url)
        cy.title().should('contains', 'HOME | iO Hotel Kuala Lumpur')
    })
    it('Test 1', () => {
    })
})