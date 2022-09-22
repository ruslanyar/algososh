/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe('Страница "Стек"', () => {
  beforeEach(() => {
    cy.visit('/stack');
  });

  it('кнопка "Добавить" недоступна, если в инпуте пусто', () => {
    cy.get('input').should('have.value', '');
    cy.get('button')
      .contains('Добавить')
      .parent()
      .as('addBtn')
      .should('be.disabled');
    cy.get('input').type('3');
    cy.get('@addBtn').should('not.be.disabled');
    cy.get('input').type('{backspace}');
    cy.get('@addBtn').should('be.disabled');
  });

  it('элемент добавляется корректно', () => {
    cy.get('input').type('3');
    cy.get('button').contains('Добавить').parent().click();

    cy.get('[class*=circle_content]')
      .within(() => {
        cy.get('[class*=circle_circle]').should(
          'have.css',
          'border',
          '4px solid rgb(210, 82, 225)'
        );
        cy.get('[class*=circle_string]').should('have.text', 'top');
        cy.get('[class*=circle_letter]').should('have.text', '3');
        cy.get('[class*=circle_index]').should('have.text', '0');
      })
      .wait(1000)
      .within(() => {
        cy.get('[class*=circle_circle]').should(
          'have.css',
          'border',
          '4px solid rgb(0, 50, 255)'
        );
      });
  });

  it('элемент удаляется корректно', () => {
    cy.get('button')
      .contains('Удалить')
      .parent()
      .as('delBtn')
      .should('be.disabled');
    cy.get('input').type('3');
    cy.get('button')
      .contains('Добавить')
      .parent()
      .as('addBtn')
      .click()
      .wait(1000);
    cy.get('input').type('4');
    cy.get('@addBtn').click().wait(1000);
    cy.get('li').as('list').should('have.length', '2');
    cy.get('@delBtn').should('not.be.disabled').click();
    cy.get('@list')
      .within(() => {
        cy.get('[class*=circle_circle]')
          .last()
          .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      })
      .wait(1000);
    cy.get('@list').should('have.length', 1);
  });

  it('поведение кнопки "Очистить" корректно', () => {
    cy.get('button')
      .contains('Очистить')
      .parent()
      .as('clearBtn')
      .should('be.disabled');
    cy.get('button').contains('Добавить').parent().as('addBtn');
    cy.get('input').type('1');
    cy.get('@addBtn').click().wait(1000);
    cy.get('input').type('2');
    cy.get('@addBtn').click().wait(1000);
    cy.get('input').type('3');
    cy.get('@addBtn').click().wait(1000);
    cy.get('ul').as('list').should('not.be.empty');
    cy.get('@clearBtn').click();
    cy.get('@list').should('be.empty');
  });
});
