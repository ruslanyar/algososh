describe('Страница "Последовательность Фибоначчи"', () => {
  before(() => {
    cy.visit('/fibonacci');
  });

  it('кнопка "Расчитать" недоступна, если в инпуте пусто', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').last().as('calculateBtn');
    cy.get('@calculateBtn').should('be.disabled');
    cy.get('input').type('1').should('have.value', '1');
    cy.get('@calculateBtn').should('be.enabled');
    cy.get('input').type('{backspace}').should('have.value', '');
    cy.get('@calculateBtn').should('be.disabled');
  });

  it('числа генерируются корректно', () => {
    cy.clock();
    cy.get('input').type('7');
    cy.get('button').last().click();
    cy.tick(500);
    cy.get('li')
      .should('have.length', '1')
      .each(($el, idx) => {
        if (idx === 0)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '0');
            cy.get('p[class*=circle_index]').should('have.text', '0');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '2')
      .each(($el, idx) => {
        if (idx === 1)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '1');
            cy.get('p[class*=circle_index]').should('have.text', '1');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '3')
      .each(($el, idx) => {
        if (idx === 2)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '1');
            cy.get('p[class*=circle_index]').should('have.text', '2');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '4')
      .each(($el, idx) => {
        if (idx === 3)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '2');
            cy.get('p[class*=circle_index]').should('have.text', '3');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '5')
      .each(($el, idx) => {
        if (idx === 4)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '3');
            cy.get('p[class*=circle_index]').should('have.text', '4');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '6')
      .each(($el, idx) => {
        if (idx === 5)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '5');
            cy.get('p[class*=circle_index]').should('have.text', '5');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '7')
      .each(($el, idx) => {
        if (idx === 6)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '8');
            cy.get('p[class*=circle_index]').should('have.text', '6');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '8')
      .each(($el, idx) => {
        if (idx === 7)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '13');
            cy.get('p[class*=circle_index]').should('have.text', '7');
          });
      });
  });
});
