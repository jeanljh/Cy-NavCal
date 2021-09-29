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

// get all days from dual calendars
Cypress.Commands.add('getDays', () => cy.get('.DayPicker-Body').find('.DayPicker-Day')
    .not('[class*=disabled]').not('[class*=outside]'))

// get all days from single calendar
Cypress.Commands.add('getDays2', id => cy.get('.DayPicker-Body').eq(id).find('.DayPicker-Day')
    .not('[class*=disabled]').not('[class*=outside]'))

// get header text that contains month and year
Cypress.Commands.add('getMonthHeader', id => cy.get('.DayPicker-Caption > div').eq(id).invoke('text'))

// navigate calendar forward / backward and select a date
Cypress.Commands.add('selectDate', date => {
    cy.getDays().then(d => {
        const firstCal = new Date(d.first().attr('aria-label'))
        const lastCal = new Date(d.last().attr('aria-label'))
        if (date >= firstCal && date <= lastCal) {
            cy.getDays().each(d => {
                const dt = new Date(d.attr('aria-label'))
                if (dt.getMonth() === date.getMonth() && dt.getDate() === date.getDate()) {
                    cy.wrap(d).click()
                    return false
                }
            })
        }
        else if (date < firstCal) {
            cy.get('.DayPicker-NavButton--prev').should('be.visible').click()
            cy.selectDate(date)
        }
        else if (date > lastCal) {
            cy.get('.DayPicker-NavButton--next').should('be.visible').click()
            cy.selectDate(date)
        }
    })
})

// navigate calendar forward only and select a date
Cypress.Commands.add('selectDate2', date => {
    const arrMonth = date.toLocaleDateString('default', { month: 'long', year: 'numeric' })
    cy.getMonthHeader(0).then(arrCal => {
        if (arrCal === arrMonth) {
            cy.getDays2(0).contains(date.getDate()).click()
            return
        }
        cy.getMonthHeader(1).then(depCal => {
            if (depCal === arrMonth) {
                cy.getDays2(1).contains(date.getDate()).click()
                return
            }
            cy.get('.DayPicker-NavButton--next').should('be.visible').click()
            cy.selectDate2(date)
        })
    })
})


// Cypress.Commands.add('selectCal', date => {
//     cy.getDays().each(d => {
//         const dt = new Date(d.attr('aria-label'))
//         if (dt.getMonth() === date.getMonth() && dt.getDate() === date.getDate()) {
//             cy.wrap(d).click()
//             return false
//         }
//     })
// })
