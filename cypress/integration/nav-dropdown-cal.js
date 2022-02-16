/// <reference types='cypress' />
const data =  require('../fixtures/dropdownCal.json')

context('Dropdown Calendar Navigation', () => {
    const today = new Date()
    const todayDate = today.toLocaleDateString('en-GB')
    // const todayDate = (today.getDate() + '/').padStart(3, '0') + (today.getMonth() + 1 + '/').padStart(3, '0') + today.getFullYear()
    
    const tmr = new Date(today)
    tmr.setDate(tmr.getDate() + 1)
    const tmrDate = tmr.toLocaleDateString('en-GB')
    // const tmrDate = (tmr.getDate() + '/').padStart(3, '0') + (tmr.getMonth() + 1 + '/').padStart(3, '0') + tmr.getFullYear()

    beforeEach('Visit /add_visit', () => {
        cy.visit(Cypress.env('urlDropdownCal'))
        cy.url().should('eq', Cypress.env('urlDropdownCal'))
        cy.wait(1000)
    })

    specify('Test Default Date', () => {
        cy.get('.date_div').invoke('val').should('eq', tmrDate)
    })

    specify('Test Today Date', () => {
        cy.get('.date_div').as('picker').click()
        cy.get('.picker__button--today').click()
        cy.get('@picker').should('have.value', todayDate)
    })

    specify('Test Clear Date', () => {
        cy.get('.date_div').as('picker').click()
        cy.get('.picker__day--highlighted').click()
        cy.get('@picker').click()
        cy.get('.picker__button--clear').click({force: true})
        cy.get('@picker').should('have.value', tmrDate)
    })

    specify('Test Close Date Picker', () => {
        cy.get('.date_div').click()
        cy.get('.picker__holder').as('pickerBox').should('be.visible')
        cy.get('.picker__button--close').click()
        cy.get('@pickerBox').should('not.be.visible')
    })

    specify('Test Select Date Picker', () => {
        cy.selectDatePicker(data.inputDate)
    })
})