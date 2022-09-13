import React, { ChangeEvent, useState } from 'react';

import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';

import styles from './list-page.module.css';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';

type TElement = {
  letter: string;
  head: JSX.Element | string | null;
  tail: JSX.Element | string | null;
  state: ElementStates;
}

const initList = [
  [
    { letter: '7', head: HEAD, tail: null, state: ElementStates.Default },
    { letter: '33', head: null, tail: null, state: ElementStates.Default },
    { letter: '5', head: null, tail: null, state: ElementStates.Default },
    { letter: '10', head: null, tail: TAIL, state: ElementStates.Default },
  ]
];

export const ListPage: React.FC = () => {
  const [list, setList] = useState<TElement[][]>(initList);
  const [step, setStep] = useState(0);
  const [valueInput, setValueInput] = useState('');
  const [indexInput, setIndexInput] = useState('');

  const valueInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const indexInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.target.value);
  };

  const addToHead = (item: string) => {
    const newMatrix = [];
    const firstStep = list[0].map(el => ({...el}));
    firstStep[0].head = (<Circle letter={item} isSmall state={ElementStates.Changing} />);
    newMatrix.push(firstStep);

    const secondStep = firstStep.map(el => ({...el}));
    secondStep[0].head = null;
    secondStep.unshift({...secondStep[0]});
    secondStep[0].letter = item;
    secondStep[0].head = HEAD;
    secondStep[0].state = ElementStates.Modified;
    newMatrix.push(secondStep);

    const thirdStep = secondStep.map(el => ({...el}));
    thirdStep[0].state = ElementStates.Default;
    newMatrix.push(thirdStep);

    console.log(newMatrix);
    

    setList(newMatrix);

    const timerId = setInterval(() => {
      if (step < newMatrix.length) {
        setStep(prev => prev + 1);
      } else {
        clearInterval(timerId);
        console.log(step);
      }
    }, DELAY_IN_MS);
  };

  console.log(step);


  const addToTail = (item: string) => {

  };

  const deleteFromHead = () => {

  };

  const deleteFromTail = () => {

  };

  const addByIndex = (item: string, idx: number) => {

  };

  const deleteByIndex = (idx: number) => {

  };

  const getHead = (el: string | undefined) => {
    return <Circle letter={el} isSmall />
  }

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
        <Button text='Добавить в head' linkedList='small' onClick={() => addToHead(valueInput)} />
        <Button text='Добавить в tail' linkedList='small' onClick={() => addToTail(valueInput)} />
        <Button text='Удалить из head' linkedList='small' onClick={deleteFromHead} />
        <Button text='Удалить из tail' linkedList='small' onClick={deleteFromTail} />
        <Input
          value={indexInput}
          extraClass={styles.input}
          placeholder='Введите индекс'
          type='number'
          onChange={indexInputOnChangeHandler}
        />
        <Button text='Добавить по индексу' linkedList='big' />
        <Button text='Удалить по индексу' linkedList='big' />
      </div>
      <ul className={`${styles.elements} list`}>
        {list[step] &&
          list[step].map((el, idx) => (
            <li key={idx} className={styles['elements-item']}>
              <Circle
                head={el.head}
                tail={el.tail}
                letter={el.letter}
                index={idx}
                state={el.state}
              />
              {idx !== list[step].length - 1 && <ArrowIcon  />}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
//<Circle letter={el} isSmall />