import React, { ChangeEvent, useCallback, useState } from 'react';

import { Circle } from '../ui/circle/circle';
import { InputWithButton } from '../input-with-button/input-with-button';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { DELAY_IN_MS } from '../../constants/delays';
import { getArrayOfLetters, getCircleState } from './utils';

import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [letters, setLetters] = useState<{
    arr: string[];
    step: number;
  } | null>(null);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const onClickHandler = useCallback(() => {
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
  }, [inputValue]);

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
