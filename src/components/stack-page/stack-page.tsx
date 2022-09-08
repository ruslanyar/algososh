import React, { ChangeEvent, useState } from 'react';

import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { setDelay } from '../../utils/utils';
import { ElementStates } from '../../types/element-states';

import styles from './stack-page.module.css';

const isLast = (stack: string[], idx: number) => stack.length - 1 === idx;

export const StackPage: React.FC = () => {
  const [stackList, setStackList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastElementState, setLastElementState] = useState(ElementStates.Changing);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addToStack = async (item: string) => {
    setLastElementState(ElementStates.Changing);
    setStackList((prev) => {
      const newStack = [...prev];
      newStack.push(item);
      return newStack;
    });
    setInputValue('');
    await setDelay(500);
    setLastElementState(ElementStates.Default);
  };

  const deleteFromStack = async () => {
    setLastElementState(ElementStates.Changing);
    await setDelay(500);
    setStackList((prev) => {
      const newStack = [...prev];
      newStack.pop();
      return newStack;
    });
    setLastElementState(ElementStates.Default);
  };

  const cleanStack = () => {
    setStackList([]);
  };

  const isEmpty = !stackList.length;

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.controls}>
        <Input
          value={inputValue}
          onChange={onChangeHandler}
          maxLength={4}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          text='Добавить'
          onClick={() => addToStack(inputValue)}
          disabled={!inputValue || stackList.length === 20}
        />
        <Button text='Удалить' onClick={deleteFromStack} disabled={isEmpty} />
        <Button text='Очистить' onClick={cleanStack} disabled={isEmpty} />
      </div>
      <ul className={`${styles['elements-container']} list`}>
        {stackList &&
          stackList.map((el, idx) => (
            <li key={idx}>
              <Circle
                letter={el}
                index={idx}
                head={isLast(stackList, idx) ? 'top' : null}
                state={isLast(stackList, idx) ? lastElementState : ElementStates.Default}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
