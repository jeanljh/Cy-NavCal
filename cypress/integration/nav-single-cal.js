/// <reference types="cypress" />

describe('Single Calendar Navigation', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('urlSingleCal'))
        cy.location('href').should('eq', Cypress.env('urlSingleCal'))
        cy.title().should('include', 'BookDoc')
    })
    it('Test Calendar Navigation', () => {
        cy.get('#dateField').as('selectedDate').click()
        cy.fixture('singleCal').its('inputDate').then(d => {
            const date = new Date(d)
            const sDate = date.toLocaleString('default', { month: 'long', year: 'numeric'})
            const day = date.getDate()
            const exp = date.toLocaleDateString('en-GB')
            cy.navCal(sDate)
            cy.contains(".react-datepicker__week > div:not([class*='disabled']):not([class*='outside'])", day).click()
            // cy.get(".react-datepicker__week > div").not("[class*='disabled']").not("[class*='outside']").contains(day).click() // another way
            cy.get('@selectedDate').should('have.value', exp)
        })
    })
})