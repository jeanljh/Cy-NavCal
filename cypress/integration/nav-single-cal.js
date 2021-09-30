/// <reference types="cypress" />

describe('Single Calendar Navigation', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('urlSingleCal'))
        cy.location('href').should('eq', Cypress.env('urlSingleCal'))
        cy.title().should('include', 'BookDoc')
        cy.get('.close').click()
    })
    it('Test Calendar Navigation', () => {
        cy.get('#search-calendar').click()
        cy.fixture('singleCal').its('inputDate').then(d => {
            const date = new Date(d)
            const sDate = date.toLocaleString('default', { month: 'long', year: 'numeric'})
            const day = date.getDate()
            const exp = date.toLocaleDateString('en-GB')
            cy.navCal(sDate)
            cy.get("span[class='ng-binding'],[class='ng-binding text-info']").contains(day).click()
            cy.get('#search-calendar').should('have.value', exp)
        })
    })
})