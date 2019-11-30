/// <reference types="Cypress" />

context('Actions', () => {
    it('Show summary', () => {
        cy.visit('http://localhost:3000/project/requests')
        cy.get('[data-cy=summary]').contains("Total downloads");
    })

    it('Show downloads', () => {
      cy.visit('http://localhost:3000/project/requests')
      cy.get("[data-cy=downloads]").get("tr").should('have.length', 8)
    })

    it('Show last 30 days downloads', () => {
      cy.visit('http://localhost:3000/project/requests')
      cy.get("[data-cy=downloads] button").click();
      cy.get("[data-cy=downloads]").get("tr").should('have.length', 31)
    })

    it ('Show error when project not found', () => {
      cy.visit('http://localhost:3000/project/asoidj29383rjf4uncpw9cumem')
      cy.contains('Not found')
    })
})