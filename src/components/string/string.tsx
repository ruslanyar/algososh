import React, { ChangeEvent, useState } from 'react';

import { Circle } from '../ui/circle/circle';
import { InputWithButton } from '../input-with-button/input-with-button';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { swap } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

import styles from './string.module.css';

const getArrayOfLetters = (str: string): string[][] | null => {
  if (!str) return null;

  const arr = str.split('');
  const result: string[][] = [[...arr]];

  let start = 0,
    end = arr.length - 1;

  while (start <= end) {
    swap(arr, start, end);
    result.push([...arr]);
    start++;
    end--;
  }

  return result;
};

const getCircleState = (idx: number, step: number, len: number) => {
  if (idx < step || idx > len - 1 - step) return ElementStates.Modified;
  if (idx === step || idx === len - 1 - step) return ElementStates.Changing;
  if (idx > step && idx < len - 1 - step) return ElementStates.Default;
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [letters, setLetters] = useState<{
    arr: string[];
    step: number;
  } | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickHandler = () => {
    const array = getArrayOfLetters(inputValue);

    if (!array) return;

    setIsLoading(true);

    let step = 0;
    setLetters({ arr: array[step], step: -1 });

    const timerId = setInterval(() => {
      if (step < array.length) {
        setLetters({ arr: array[step], step });
        step++;
      } else {
        clearInterval(timerId);
        setIsLoading(false);
      }
    }, DELAY_IN_MS);
  };

  return (
    <SolutionLayout title='Строка'>
      <InputWithButton
        value={inputValue}
        maxLength={11}
        text='Развернуть'
        onChange={onChangeHandler}
        onClick={onClickHandler}
        isLoader={isLoading}
      />
      <ul className={`${styles['elements-container']} list`}>
        {letters?.arr &&
          letters.arr.map((letter, idx) => (
            <li key={idx}>
              <Circle
                letter={letter}
                state={getCircleState(idx, letters.step, letters.arr.length)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
