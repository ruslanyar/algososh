/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe('Страница "Строка"', () => {
  before(() => {
    cy.visit('/recursion');
  });

  it('кнопка "Развернуть" недоступна, если в инпуте пусто', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').last().as('reverseBtn');
    cy.get('@reverseBtn').should('be.disabled');
    cy.get('input').type('word');
    cy.get('input').should('have.value', 'word');
    cy.get('@reverseBtn').should('not.be.disabled');
    cy.get('input').type('{backspace}{backspace}{backspace}{backspace}');
    cy.get('input').should('have.value', '');
    cy.get('@reverseBtn').should('be.disabled');
  });

  it('анимация разворота работает корректно', () => {
    cy.get('input').type('word');
    cy.get('button').last().as('reverseBtn');
    cy.get('@reverseBtn').click();
    cy
      .get('[class^=circle_circle__]')
      .each(($el, idx) => {
        cy.wrap($el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        if (idx === 0) cy.wrap($el).contains('w');
        if (idx === 1) cy.wrap($el).contains('o');
        if (idx === 2) cy.wrap($el).contains('r');
        if (idx === 3) cy.wrap($el).contains('d');
      })
      .wait(1000)
      .each(($el, idx) => {
        if (idx === 0 || idx === 3) {
          cy.wrap($el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          if (idx === 0) cy.wrap($el).contains('w');
          if (idx === 3) cy.wrap($el).contains('d');
        }
        if (idx === 1 || idx === 2) {
          cy.wrap($el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
          if (idx === 1) cy.wrap($el).contains('o');
          if (idx === 2) cy.wrap($el).contains('r');
        }
      })
      .wait(1000)
      .each(($el, idx) => {
        if (idx === 0 || idx === 3) {
          cy.wrap($el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
          if (idx === 0) cy.wrap($el).contains('d');
          if (idx === 3) cy.wrap($el).contains('w');
        }
        if (idx === 1 || idx === 2) {
          cy.wrap($el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          if (idx === 1) cy.wrap($el).contains('o');
          if (idx === 2) cy.wrap($el).contains('r'); 
        }
      })
      .wait(1000)
      .each(($el, idx) => {
        if (idx === 0 || idx === 3) {
          cy.wrap($el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
          if (idx === 0) cy.wrap($el).contains('d');
          if (idx === 3) cy.wrap($el).contains('w');
        }
        if (idx === 1 || idx === 2) {
          cy.wrap($el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
          if (idx === 1) cy.wrap($el).contains('r');
          if (idx === 2) cy.wrap($el).contains('o'); 
        }
      });
  });
});
