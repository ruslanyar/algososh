describe('Тестирование переходов по страницам', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
    cy.contains('МБОУ АЛГОСОШ');
  });

  afterEach(() => {
    cy.get('[class^=return-button_button__]').click();
  });

  it('должен открыть страницу "Строка" по нажатию на ссылку', () => {
    cy.get('a[href$="recursion"]').click();
    cy.contains('Строка');
  });

  it('должен открыть страницу "Фибоначчи" по нажатию на ссылку', () => {
    cy.get('a[href$="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('должен открыть страницу "Сортировка массива" по нажатию на ссылку', () => {
    cy.get('a[href$="sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('должен открыть страницу "Стек" по нажатию на ссылку', () => {
    cy.get('a[href$="stack"]').click();
    cy.contains('Стек');
  });

  it('должен открыть страницу "Очередь" по нажатию на ссылку', () => {
    cy.get('a[href$="queue"]').click();
    cy.contains('Очередь');
  });

  it('должен открыть страницу "Связный список" по нажатию на ссылку', () => {
    cy.get('a[href$="list"]').click();
    cy.contains('Связный список');
  });
});