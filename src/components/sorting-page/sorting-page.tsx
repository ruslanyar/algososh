import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { Direction } from '../../types/direction';
import { bubbleSort, getRandomArr, selectionSort } from './sorting-algo';
import { TElement } from './types';

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
    const randomArr = getRandomArr();
    setArray(randomArr);
  };

  const onChangeHandler = () => {
    setIsSelectionChecked((prev) => !prev);
  };

  const ascHandler = async () => {
    setIsAscLoading(true);
    if (isSelectionChecked) {
      await selectionSort(array, Direction.Ascending, setArray);
    } else {
      await bubbleSort(array, Direction.Ascending, setArray);
    }
    setIsAscLoading(false);
  };

  const descHandler = async () => {
    setIsDescLoading(true);
    if (isSelectionChecked) {
      await selectionSort(array, Direction.Descending, setArray);
    } else {
      await bubbleSort(array, Direction.Descending, setArray);
    }
    setIsDescLoading(false);
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
