import React, { ChangeEvent, useState } from 'react';

import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { CIRCLE } from '../../constants/element-captions';
import { DELAY_IN_MS } from '../../constants/delays';
import { LinkedList } from './LinkedList';
import {
  getAddByIndexMatrix,
  getAddToHeadMatrix,
  getAddToTailMatrix,
  getDeleteByIndexMatrix,
  getDeleteHeadMatrix,
  getDeleteTailMatrix,
  getInitState,
} from './utils';
import { TElement } from './types';

import styles from './list-page.module.css';

export const linkedList = new LinkedList<string>(['33', '5', '10', '7'], 7);

export const ListPage: React.FC = () => {
  const [list, setList] = useState<TElement[]>(getInitState(linkedList));
  const [valueInput, setValueInput] = useState('');
  const [indexInput, setIndexInput] = useState('');
  const [isLoading, setIsLoading] = useState({
    addHead: false,
    addTail: false,
    delHead: false,
    delTail: false,
    addByIdx: false,
    delByIdx: false,
  });

  const valueInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const indexInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.target.value);
  };

  const addToHead = (item: string) => {
    setIsLoading((prev) => ({ ...prev, addHead: true }));
    const matrix = getAddToHeadMatrix(list, item);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, addHead: false }));
      }
    }, DELAY_IN_MS);

    setValueInput('');
  };

  const addToTail = (item: string) => {
    setIsLoading((prev) => ({ ...prev, addTail: true }));
    const matrix = getAddToTailMatrix(list, item);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, addTail: false }));
      }
    }, DELAY_IN_MS);

    setValueInput('');
  };

  const deleteFromHead = () => {
    setIsLoading((prev) => ({ ...prev, delHead: true }));
    const matrix = getDeleteHeadMatrix(list);
    setList(matrix[0]);
    setTimeout(() => {
      setList(matrix[1]);
      setIsLoading((prev) => ({ ...prev, delHead: false }));
    }, DELAY_IN_MS);

    setValueInput('');
  };

  const deleteFromTail = () => {
    setIsLoading((prev) => ({ ...prev, delTail: true }));
    const matrix = getDeleteTailMatrix(list);
    setList(matrix[0]);
    setTimeout(() => {
      setList(matrix[1]);
      setIsLoading((prev) => ({ ...prev, delTail: false }));
    }, DELAY_IN_MS);

    setValueInput('');
  };

  const addByIndex = (item: string, idx: number) => {
    setIsLoading((prev) => ({ ...prev, addByIdx: true }));
    const matrix = getAddByIndexMatrix(list, item, idx);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, addByIdx: false }));
      }
    }, DELAY_IN_MS);

    setValueInput('');
    setIndexInput('');
  };

  const deleteByIndex = (idx: number) => {
    setIsLoading((prev) => ({ ...prev, delByIdx: true }));
    const matrix = getDeleteByIndexMatrix(list, idx);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, delByIdx: false }));
      }
    }, DELAY_IN_MS);

    setIndexInput('');
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.controls}>
        <Input
          value={valueInput}
          extraClass={styles.input}
          placeholder='Введите значение'
          isLimitText
          maxLength={4}
          onChange={valueInputOnChangeHandler}
        />
        <Button
          text='Добавить в head'
          linkedList='small'
          onClick={() => addToHead(valueInput)}
          disabled={!valueInput || list.length >= linkedList.getSizeLimit()}
          isLoader={isLoading.addHead}
        />
        <Button
          text='Добавить в tail'
          linkedList='small'
          onClick={() => addToTail(valueInput)}
          disabled={!valueInput || list.length >= linkedList.getSizeLimit()}
          isLoader={isLoading.addTail}
        />
        <Button
          text='Удалить из head'
          linkedList='small'
          onClick={deleteFromHead}
          disabled={
            !list.length ||
            isLoading.addHead ||
            isLoading.addTail ||
            isLoading.delTail ||
            isLoading.addByIdx ||
            isLoading.delByIdx
          }
          isLoader={isLoading.delHead}
        />
        <Button
          text='Удалить из tail'
          linkedList='small'
          onClick={deleteFromTail}
          disabled={
            !list.length ||
            isLoading.addHead ||
            isLoading.addTail ||
            isLoading.delHead ||
            isLoading.addByIdx ||
            isLoading.delByIdx
          }
          isLoader={isLoading.delTail}
        />
        <Input
          value={indexInput}
          extraClass={styles.input}
          placeholder='Введите индекс'
          type='number'
          onChange={indexInputOnChangeHandler}
        />
        <Button
          text='Добавить по индексу'
          linkedList='big'
          onClick={() => addByIndex(valueInput, +indexInput)}
          disabled={
            !valueInput ||
            !indexInput ||
            list.length >= linkedList.getSizeLimit()
          }
          isLoader={isLoading.addByIdx}
        />
        <Button
          text='Удалить по индексу'
          linkedList='big'
          onClick={() => deleteByIndex(+indexInput)}
          disabled={!indexInput || !list.length}
          isLoader={isLoading.delByIdx}
        />
      </div>
      <ul className={`${styles.elements} list`}>
        {list &&
          list.map((el, idx) => (
            <li key={idx} className={styles['elements-item']}>
              <Circle
                head={
                  el.head.type === CIRCLE ? (
                    <Circle
                      letter={el.head.value}
                      isSmall
                      state={el.head.state}
                    />
                  ) : (
                    el.head.value
                  )
                }
                tail={
                  el.tail?.type === CIRCLE ? (
                    <Circle
                      letter={el.tail?.value}
                      isSmall
                      state={el.tail?.state}
                    />
                  ) : (
                    el.tail?.value
                  )
                }
                letter={el.value}
                index={idx}
                state={el.state}
              />
              {idx !== list.length - 1 && <ArrowIcon />}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
