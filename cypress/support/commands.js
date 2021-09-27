/// <reference types="cypress"/>
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getDays', id => cy.get('.DayPicker-Body').eq(id).find('.DayPicker-Day')
    .not('[class*=disabled]').not('[class*=outside]').as('arriveDays'))

Cypress.Commands.add('getDays2', () => cy.get('.DayPicker-Body').find('.DayPicker-Day')
    .not('[class*=disabled]').not('[class*=outside]'))

Cypress.Commands.add('getMonthHeader', id => cy.get('.DayPicker-Caption > div').eq(id).invoke('text'))

Cypress.Commands.add('selectDate', (date) => {
    const arrMonth = date.toLocaleDateString('default', { month: 'long', year: 'numeric' })
    cy.getMonthHeader(0).then(arrCal => {
        if (arrCal === arrMonth) {
            cy.getDays(0).contains(date.getDate()).click()
            return
        }
        cy.getMonthHeader(1).then(depCal => {
            if (depCal === arrMonth) {
                cy.getDays(1).contains(date.getDate()).click()
                return
            }
            cy.get('.DayPicker-NavButton--next').should('be.visible').click()
            cy.selectDate(date)
        })
    })
})

Cypress.Commands.add('selectDate2', (date) => {
    cy.getDays2().first().invoke('attr', 'aria-label').then(d => {
        const dt1 = new Date(d)
        if (date < dt1) {
            cy.log('here1')
            cy.get('.DayPicker-NavButton--prev').should('be.visible').click()
            cy.selectDate2(date)
            return
        }
    })
    cy.getDays2().last().invoke('attr', 'aria-label').then(d => {
        const dt2 = new Date(d)
        if (date > dt2) {
            cy.log('here2')
            cy.get('.DayPicker-NavButton--next').should('be.visible').click()
            cy.selectDate2(date)
            return
        }
    })
    cy.getDays2().each(d => {
        const dt = new Date(d.attr('aria-label'))
        // cy.log(dt + '')
        // cy.log('dateeeeee = ' + date)
        if (dt.getMonth() === date.getMonth() && dt.getDate() === date.getDate()) {
            cy.log('here3')
            cy.wrap(d).click()
            return false
        }
    })
})
