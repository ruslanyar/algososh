import React from 'react';

import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { Direction } from '../../types/direction';

import styles from './sorting-page.module.css';

const array = [2, 34, 17, 100, 50];

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.container}>
        <div className={styles['controls-wrapper']}>
          <div className={styles['input-container']}>
            <RadioInput name='sort' label='Выбор' checked />
            <RadioInput name='sort' label='Пузырёк' />
          </div>
          <div className={styles['button-container']}>
            <Button sorting={Direction.Ascending} text='По возрастанию' extraClass={styles.button} />
            <Button sorting={Direction.Descending} text='По убыванию' extraClass={styles.button} />
            <Button text='Новый массив' extraClass={styles.button} />
          </div>
        </div>
        <ul className={`${styles['columns-list']} list`}>
          {array.map((el, idx) => (
            <li key={idx}>
              <Column index={el} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
