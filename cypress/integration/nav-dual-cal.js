/// <reference types="cypress" />

describe('Dual Calendar Navigation', () => {
    beforeEach('Visit URL', () => {
        cy.visit('');
        cy.url().should('eq', Cypress.config().baseUrl)
        cy.title().should('contains', "Boutique Hotel KL | MoMo's Kuala Lumpur - Homepage | New Hotel in KL")
        cy.get('span.close-cpp').click()
        cy.get("[class*='desktopNav__bookNow']").click()
    })
    it('Test Default Calendar State', () => {
        const today = new Date()
        const arriveMonth = today.toLocaleDateString('default', {month:'long', year: 'numeric'})
        // verify arrive month/year header
        cy.getMonthHeader(0).should('eq', arriveMonth)

        // verify pre-selected today and tomorrow
        cy.getDays(0).eq(0).invoke('text').should('eq', new Date().getDate().toString())
        cy.getDays(0).eq(1).invoke('text').should('eq', (new Date().getDate() + 1) + '')
        
        today.setMonth(today.getMonth() + 1, 1)
        const departMonth = today.toLocaleDateString('default', {month:'long', year:'numeric'})
        // verify depart month/year header
        cy.getMonthHeader(1).should('eq', departMonth)
        
        // verify visibility of previous and next month buttons
        cy.get('.DayPicker-NavButton--prev').should('not.be.visible')
        cy.get('.DayPicker-NavButton--next').should('be.visible')
    })
    it.only('Test Calendar Navigation', () => {
        let arriveDate = '2022,2,1'
        let departDate = '2022,2,10'
        const today = new Date()
        const arriveDt = new Date(arriveDate)
        const departDt = new Date(departDate)
        expect(departDt).to.gt(arriveDt)
        expect(arriveDt).to.gte(today)
        cy.selectDate2(arriveDt)
        cy.selectDate2(departDt)
        cy.log('=================================')
        const backDate = new Date('2021,11,10')
        cy.selectDate2(backDate)
        // cy.get('.DayPicker-Body').find('.DayPicker-Day').not('[class*=disabled]').not('[class*=outside]')
        // .each(e => {
        //     e.attr
        // })
        // arriveDate = arriveDt.toLocaleDateString('default', {day: 'numeric', month: 'long', year: 'numeric'})
        // departDate = departDt.toLocaleDateString('default', {day: 'numeric', month: 'long', year: 'numeric'})
    })
})