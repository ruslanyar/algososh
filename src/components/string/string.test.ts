import { getArrayOfLetters, getCircleState } from './utils';

describe('Разворот строки', () => {
  it('с чётным количеством символов', () => {
    const result = getArrayOfLetters('jest');
    expect(result).toEqual([
      ['j', 'e', 's', 't'],
      ['t', 'e', 's', 'j'],
      ['t', 's', 'e', 'j'],
    ]);
  });

  it('с нечетным количеством символов', () => {
    const result = getArrayOfLetters('reverse');
    expect(result).toEqual([
      ['r', 'e', 'v', 'e', 'r', 's', 'e'],
      ['e', 'e', 'v', 'e', 'r', 's', 'r'],
      ['e', 's', 'v', 'e', 'r', 'e', 'r'],
      ['e', 's', 'r', 'e', 'v', 'e', 'r'],
      ['e', 's', 'r', 'e', 'v', 'e', 'r'],
    ]);
  });

  it('с одним символом', () => {
    const result = getArrayOfLetters('1');
    expect(result).toEqual([
      ['1'],
      ['1'],
    ]);
  });

  it('пустуя строка', () => {
    const result = getArrayOfLetters('');
    expect(result).toBe(null);
  });
});

describe('Получение состояния элементов', () => {
  it('modified', () => {
    const result = getCircleState(3, 5, 7);
    expect(result).toBe('modified');
  });

  it('changing', () => {
    const result = getCircleState(3, 3, 7);
    expect(result).toBe('changing');
  });

  it('default', () => {
    const result = getCircleState(3, 2, 7);
    expect(result).toBe('default');
  });
});
