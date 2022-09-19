import { swap } from '../../utils/utils';

import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { TElement } from './types';

const getRandomInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArr = (
  minLength: number,
  maxLength: number,
  minValue: number,
  maxValue: number
) => {
  const arrLength = getRandomInRange(minLength, maxLength);
  const randomArr: TElement[] = [];
  let randomNum: number;
  while (randomArr.length < arrLength) {
    randomNum = getRandomInRange(minValue, maxValue);
    // eslint-disable-next-line no-loop-func
    if (!randomArr.some((el) => randomNum === el.value)) {
      randomArr.push({ value: randomNum, state: ElementStates.Default });
    }
  }
  return randomArr;
};

const setElementsStateSelection = (
  arr: TElement[],
  idxI: number = arr.length,
  idxJ: number = arr.length,
  selectedIdx: number = arr.length
): TElement[] => {
  let state: ElementStates;
  const newArray = arr.map((el, idxEl) => {
    if (idxEl === selectedIdx || idxEl === idxJ) {
      state = ElementStates.Changing;
    } else if (idxEl < idxI) {
      state = ElementStates.Modified;
    } else {
      state = ElementStates.Default;
    }
    return {
      ...el,
      state,
    };
  });

  return newArray;
};

export const selectionSort = (
  arr: TElement[],
  direction: Direction
): TElement[][] | null => {
  const { length } = arr;
  if (!length) return null;

  const sortMatrix: TElement[][] = [];
  let stepArray: TElement[];

  for (let i = 0; i < length - 1; i++) {
    let selectedIdx = i;

    for (let j = i + 1; j < length; j++) {
      stepArray = setElementsStateSelection(arr, i, j, selectedIdx);
      sortMatrix.push(stepArray);
      if (
        direction === Direction.Ascending
          ? arr[selectedIdx].value > arr[j].value
          : arr[selectedIdx].value < arr[j].value
      )
        selectedIdx = j;
    }

    if (arr[i].value !== arr[selectedIdx].value) swap(arr, i, selectedIdx);
  }
  stepArray = setElementsStateSelection(arr);
  sortMatrix.push(stepArray);

  return sortMatrix;
};

const setElementsStateBubble = (
  arr: TElement[],
  idxJ: number = arr.length,
  idxI: number = arr.length
) => {
  const { length } = arr;
  let state: ElementStates;
  const newArray = arr.map((el, idx) => {
    if (idx === idxJ || idx === idxJ + 1) {
      state = ElementStates.Changing;
    } else if (idx > length - idxI - 1) {
      state = ElementStates.Modified;
    } else {
      state = ElementStates.Default;
    }
    return {
      ...el,
      state,
    };
  });

  return newArray;
};

export const bubbleSort = (
  arr: TElement[],
  direction: Direction
): TElement[][] | null => {
  const { length } = arr;
  if (!length) return null;

  const sortMatrix: TElement[][] = [];
  let stepArray: TElement[];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      stepArray = setElementsStateBubble(arr, j, i);
      sortMatrix.push(stepArray);
      if (
        direction === Direction.Ascending
          ? arr[j].value > arr[j + 1].value
          : arr[j].value < arr[j + 1].value
      )
        swap(arr, j, j + 1);
    }
  }
  stepArray = setElementsStateBubble(arr);
  sortMatrix.push(setElementsStateBubble(arr));

  return sortMatrix;
};
