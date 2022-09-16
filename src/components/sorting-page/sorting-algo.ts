import { SetStateAction } from 'react';

import {
  MIN_LENGTH,
  MAX_LENGTH,
  MIN_VALUE,
  MAX_VALUE,
} from '../../constants/array-ranges';
import { setDelay, swap } from '../../utils/utils';

import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { TElement } from './types';

const getRandomInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArr = () => {
  const arrLength = getRandomInRange(MIN_LENGTH, MAX_LENGTH);
  const randomArr: TElement[] = [];
  let randomNum: number;
  while (randomArr.length < arrLength) {
    randomNum = getRandomInRange(MIN_VALUE, MAX_VALUE);
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
) => {
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

export const selectionSort = async (
  arr: TElement[],
  direction: Direction,
  setFn: React.Dispatch<SetStateAction<TElement[]>>
) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let selectedIdx = i;
    if (direction === Direction.Ascending) {
      for (let j = i + 1; j < length; j++) {
        await setDelay(1000);
        setFn(setElementsStateSelection(arr, i, j, selectedIdx));
        if (arr[selectedIdx].value > arr[j].value) selectedIdx = j;
      }
    } else {
      for (let j = i + 1; j < length; j++) {
        await setDelay(1000);
        setFn(setElementsStateSelection(arr, i, j, selectedIdx));
        if (arr[selectedIdx].value < arr[j].value) selectedIdx = j;
      }
    }
    if (arr[i].value !== arr[selectedIdx].value) swap(arr, i, selectedIdx);
  }
  await setDelay(1000);
  setFn(setElementsStateSelection(arr));
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

export const bubbleSort = async (
  arr: TElement[],
  direction: Direction,
  setFn: React.Dispatch<SetStateAction<TElement[]>>
) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    if (direction === Direction.Ascending) {
      for (let j = 0; j < length - i - 1; j++) {
        await setDelay(1000);
        setFn(setElementsStateBubble(arr, j, i));
        if (arr[j].value > arr[j + 1].value) swap(arr, j, j + 1);
      }
    } else {
      for (let j = 0; j < length - i - 1; j++) {
        await setDelay(1000);
        setFn(setElementsStateBubble(arr, j, i));
        if (arr[j].value < arr[j + 1].value) swap(arr, j, j + 1);
      }
    }
  }
  await setDelay(1000);
  setFn(setElementsStateBubble(arr));
};
