/// <reference types="Cypress" />

describe('Dual Calendar Navigation', () => {
    beforeEach('Visit URL', () => {
        cy.visit('');
        cy.url().should('eq', Cypress.config().baseUrl)
        cy.title().should('contains', "Boutique Hotel KL | MoMo's Kuala Lumpur - Homepage | New Hotel in KL")
        cy.get('span.close-cpp').click()
        cy.get("[class*='desktopNav__bookNow']").click()
    })
    it('Test 1', () => {
        cy.get('.DayPicker-Body').as('dayPickers').eq(0).get('.DayPicker-Day').not('[class*=disabled]').as('arriveDays')
        cy.get('@dayPickers').eq(1).get('.DayPicker-Day').not('[class*=disabled]').as('departDays')
        // cy.get('._49_rs').its('0.contentDocument.body').should('not.be.empty')
        

        // cy.get('._49_rs').then(cy.wrap).as('aaa').should('not.be.null')
        // cy.get('._49_rs').then(e => {
        //     const body = e.contents().find('body')
        //     cy.wrap(body).as('iframe')
        // })

        // cy.get('@iframe').find('#check-in').click()
    })
})