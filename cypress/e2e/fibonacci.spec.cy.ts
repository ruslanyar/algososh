/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe('Страница "Последовательность Фибоначчи"', () => {
  before(() => {
    cy.visit('/fibonacci');
  });

  it('кнопка "Расчитать" недоступна, если в инпуте пусто', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').last().as('calculateBtn');
    cy.get('@calculateBtn').should('be.disabled');
    cy.get('input').type('1').should('have.value', '1');
    cy.get('@calculateBtn').should('not.be.disabled');
    cy.get('input').type('{backspace}').should('have.value', '');
    cy.get('@calculateBtn').should('be.disabled');
  });

  it('числа генерируются корректно', () => {
    cy.get('input').type('7');
    cy.get('button').last().click();
    cy.get('li')
      .should('have.length', '1')
      .each(($el, idx) => {
        if (idx === 0)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '0');
            cy.get('p[class*=circle_index__]').should('have.text', '0');
          });
      })
      .wait(500);

    cy.get('li')
      .should('have.length', '2')
      .each(($el, idx) => {
        if (idx === 1)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '1');
            cy.get('p[class*=circle_index__]').should('have.text', '1');
          });
      })
      .wait(500);

    cy.get('li')
      .should('have.length', '3')
      .each(($el, idx) => {
        if (idx === 2)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '1');
            cy.get('p[class*=circle_index__]').should('have.text', '2');
          });
      })
      .wait(500);

      cy.get('li')
      .should('have.length', '4')
      .each(($el, idx) => {
        if (idx === 3)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '2');
            cy.get('p[class*=circle_index__]').should('have.text', '3');
          });
      })
      .wait(500);

      cy.get('li')
      .should('have.length', '5')
      .each(($el, idx) => {
        if (idx === 4)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '3');
            cy.get('p[class*=circle_index__]').should('have.text', '4');
          });
      })
      .wait(500);

      cy.get('li')
      .should('have.length', '6')
      .each(($el, idx) => {
        if (idx === 5)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '5');
            cy.get('p[class*=circle_index__]').should('have.text', '5');
          });
      })
      .wait(500);

      cy.get('li')
      .should('have.length', '7')
      .each(($el, idx) => {
        if (idx === 6)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '8');
            cy.get('p[class*=circle_index__]').should('have.text', '6');
          });
      })
      .wait(500);

      cy.get('li')
      .should('have.length', '8')
      .each(($el, idx) => {
        if (idx === 7)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter__]').should('have.text', '13');
            cy.get('p[class*=circle_index__]').should('have.text', '7');
          });
      });
  });
});
