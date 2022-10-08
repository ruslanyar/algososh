import React, { ChangeEvent, useCallback, useState } from 'react';

import { InputWithButton } from '../input-with-button/input-with-button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { getFibMatrix } from './utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { maxFibonacciNum, minFibonacciNum, quantityOfCirclesInRow } from './constants';

import styles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fibArray, setFibArray] = useState<number[]>([]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const onClickHandler = useCallback(() => {
    const matrix = getFibMatrix(+inputValue);

    setIsLoading(true);

    let step = 0;

    const timerId = setInterval(() => {
      if (step < matrix.length) {
        setFibArray(matrix[step]);
        step++;
      } else {
        clearInterval(timerId);
        setIsLoading(false);
        setInputValue('');
      }
    }, SHORT_DELAY_IN_MS);
  }, [inputValue]);

  const isDisabled =
    +inputValue < minFibonacciNum ||
    +inputValue > maxFibonacciNum ||
    inputValue === '';

  const justify =
    fibArray.length <= quantityOfCirclesInRow ? 'center' : 'flex-start';

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <InputWithButton
        value={inputValue}
        text='Рассчитать'
        type='number'
        max={19}
        isLoader={isLoading}
        onChange={onChangeHandler}
        onClick={onClickHandler}
        disabled={isDisabled}
      />
      <ul
        style={{ justifyContent: justify }}
        className={`${styles['elements-container']} list`}
      >
        {fibArray &&
          fibArray.map((num, idx) => (
            <li key={idx}>
              <Circle letter={num.toString()} index={idx} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
