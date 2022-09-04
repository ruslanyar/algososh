import React, { ChangeEvent, useState } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

import { InputWithButton } from '../input-with-button/input-with-button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import styles from './fibonacci-page.module.css';

const getFibMatrix = (str: string) => {
  const num = +str;
  const fibArr = ['0', '1'];
  const fibMatrix = [['0'], ['0', '1']];

  for (let i = 2; i <= num; i++) {
    fibArr.push((+fibArr[i - 2] + +fibArr[i - 1]).toString());
    fibMatrix.push([...fibArr]);
  }

  return fibMatrix;
};

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fibArray, setFibArray] = useState<string[]>([]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickHandler = () => {
    const matrix = getFibMatrix(inputValue);

    setIsLoading(true);

    let step = 0;

    const timerId = setInterval(() => {
      if (step < matrix.length) {
        setFibArray(matrix[step]);
        step++;
      } else {
        clearInterval(timerId);
        setIsLoading(false);
      }
    }, SHORT_DELAY_IN_MS);
  }

  const isDisabled = (+inputValue > 19) || (inputValue === '');

  const justify = fibArray.length < 11 ? 'center' : 'flex-start';

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <InputWithButton
        value={inputValue}
        text='Расчитать'
        type='number'
        max={19}
        isLoader={isLoading}
        onChange={onChangeHandler}
        onClick={onClickHandler}
        disabled={isDisabled}
      />
      <ul style={{justifyContent: justify}} className={`${styles['elements-container']} list`}>
        {fibArray && fibArray.map((num, idx) => (
          <li key={idx}>
            <Circle letter={num} index={idx} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
