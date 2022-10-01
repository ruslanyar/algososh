import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { bubbleSort, selectionSort } from './sorting-algo';

describe('Алгоритм сортировки выбором', () => {
  it('пустой массив', () => {
    expect(selectionSort([], Direction.Ascending)).toBe(null);
  });

  it('массив из одного элемента', () => {
    expect(
      selectionSort(
        [{ value: 1, state: ElementStates.Default }],
        Direction.Ascending
      )
    ).toEqual([[{ value: 1, state: ElementStates.Modified }]]);
  });

  it('массив из нескольких элементов', () => {
    const input = [
      {
        value: 82,
        state: ElementStates.Default,
      },
      {
        value: 4,
        state: ElementStates.Default,
      },
      {
        value: 19,
        state: ElementStates.Default,
      },
    ];

    const output = [
      [
        {
          value: 82,
          state: ElementStates.Changing,
        },
        {
          value: 4,
          state: ElementStates.Changing,
        },
        {
          value: 19,
          state: ElementStates.Default,
        },
      ],
      [
        {
          value: 82,
          state: ElementStates.Default,
        },
        {
          value: 4,
          state: ElementStates.Changing,
        },
        {
          value: 19,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 4,
          state: ElementStates.Modified,
        },
        {
          value: 82,
          state: ElementStates.Changing,
        },
        {
          value: 19,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 4,
          state: ElementStates.Modified,
        },
        {
          value: 19,
          state: ElementStates.Modified,
        },
        {
          value: 82,
          state: ElementStates.Modified,
        },
      ],
    ];
    expect(selectionSort(input, Direction.Ascending)).toEqual(output);
  });
});

describe('Алгоритм сортировки пузырьком', () => {
  it('пустой массив', () => {
    expect(bubbleSort([], Direction.Ascending)).toBe(null);
  });

  it('массив из одного элемента', () => {
    expect(
      bubbleSort(
        [{ value: 1, state: ElementStates.Default }],
        Direction.Ascending
      )
    ).toEqual([[{ value: 1, state: ElementStates.Modified }]]);
  });

  it('массив из нескольких элементов', () => {
    const input = [
      {
        value: 11,
        state: ElementStates.Default,
      },
      {
        value: 52,
        state: ElementStates.Default,
      },
      {
        value: 36,
        state: ElementStates.Default,
      },
    ];

    const output = [
      [
        {
          value: 11,
          state: ElementStates.Changing,
        },
        {
          value: 52,
          state: ElementStates.Changing,
        },
        {
          value: 36,
          state: ElementStates.Default,
        },
      ],
      [
        {
          value: 52,
          state: ElementStates.Default,
        },
        {
          value: 11,
          state: ElementStates.Changing,
        },
        {
          value: 36,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 52,
          state: ElementStates.Changing,
        },
        {
          value: 36,
          state: ElementStates.Changing,
        },
        {
          value: 11,
          state: ElementStates.Modified,
        },
      ],
      [
        {
          value: 52,
          state: ElementStates.Modified,
        },
        {
          value: 36,
          state: ElementStates.Modified,
        },
        {
          value: 11,
          state: ElementStates.Modified,
        },
      ],
    ];

    expect(bubbleSort(input, Direction.Descending)).toEqual(output);
  });
});
