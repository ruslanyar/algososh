import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { Direction } from '../../types/direction';
import { bubbleSort, getRandomArr, selectionSort } from './sorting-algo';
import { TElement } from './types';
import { MIN_LENGTH, MAX_LENGTH, MIN_VALUE, MAX_VALUE } from './constants';
import { DELAY_IN_MS } from '../../constants/delays';

import styles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TElement[]>([]);
  const [isSelectionChecked, setIsSelectionChecked] = useState(true);
  const [isAscLoading, setIsAscLoading] = useState(false);
  const [isDescLoading, setIsDescLoading] = useState(false);

  useEffect(() => {
    getNewArray();
  }, []);

  const getNewArray = () => {
    const randomArr = getRandomArr(
      MIN_LENGTH,
      MAX_LENGTH,
      MIN_VALUE,
      MAX_VALUE
    );
    setArray(randomArr);
  };

  const onChangeHandler = () => {
    setIsSelectionChecked((prev) => !prev);
  };

  const ascHandler = () => {
    setIsAscLoading(true);

    const matrix = isSelectionChecked
      ? selectionSort(array, Direction.Ascending)
      : bubbleSort(array, Direction.Ascending);

    if (!matrix) return setIsAscLoading(false);

    let step = 0;
    setArray(matrix[step]);

    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setArray(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsAscLoading(false);
      }
    }, DELAY_IN_MS);
  };

  const descHandler = () => {
    setIsDescLoading(true);

    const matrix = isSelectionChecked
      ? selectionSort(array, Direction.Descending)
      : bubbleSort(array, Direction.Descending);

    if (!matrix) return setIsDescLoading(false);

    let step = 0;
    setArray(matrix[step]);

    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setArray(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsDescLoading(false);
      }
    }, DELAY_IN_MS);
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.container}>
        <div className={styles['controls-wrapper']}>
          <div className={styles['input-container']}>
            <RadioInput
              name='sort'
              label='Выбор'
              checked={isSelectionChecked}
              onChange={onChangeHandler}
              disabled={isAscLoading || isDescLoading}
            />
            <RadioInput
              name='sort'
              label='Пузырёк'
              checked={!isSelectionChecked}
              onChange={onChangeHandler}
              disabled={isAscLoading || isDescLoading}
            />
          </div>
          <div className={styles['button-container']}>
            <Button
              sorting={Direction.Ascending}
              text='По возрастанию'
              extraClass={styles.button}
              onClick={ascHandler}
              isLoader={isAscLoading}
              disabled={isDescLoading}
            />
            <Button
              sorting={Direction.Descending}
              text='По убыванию'
              extraClass={styles.button}
              onClick={descHandler}
              isLoader={isDescLoading}
              disabled={isAscLoading}
            />
            <Button
              text='Новый массив'
              extraClass={styles.button}
              onClick={getNewArray}
              disabled={isAscLoading || isDescLoading}
            />
          </div>
        </div>
        <ul className={`${styles['columns-list']} list`}>
          {array &&
            array.map((el, idx) => (
              <li key={idx}>
                <Column index={el.value} state={el.state} />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
