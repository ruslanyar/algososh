import React, { ChangeEvent, useRef, useState } from 'react';

import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { ElementStates } from '../../types/element-states';
import { DELAY_IN_MS } from '../../constants/delays';
import { Stack } from './Stack';

import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const stack = useRef(new Stack(20));
  const [stackList, setStackList] = useState<string[]>(stack.current.elements);
  const [inputValue, setInputValue] = useState('');
  const [lastElementState, setLastElementState] = useState(
    ElementStates.Changing
  );
  const [isLoading, setIsLoading] = useState({
    add: false,
    delete: false,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addToStack = (item: string) => {
    setIsLoading((prev) => ({ ...prev, add: true }));
    setLastElementState(ElementStates.Changing);
    stack.current.push(item);
    setStackList([...stack.current.elements]);
    setInputValue('');
    setTimeout(() => {
      setLastElementState(ElementStates.Default);
      setIsLoading((prev) => ({ ...prev, add: false }));
    }, DELAY_IN_MS);
  };

  const deleteFromStack = () => {
    setIsLoading((prev) => ({ ...prev, delete: true }));
    setLastElementState(ElementStates.Changing);
    setTimeout(() => {
      stack.current.pop();
      setStackList([...stack.current.elements]);
      setLastElementState(ElementStates.Default);
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }, DELAY_IN_MS);
  };

  const clearStack = () => {
    stack.current.clear();
    setStackList(stack.current.elements);
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
          disabled={
            !inputValue || stack.current.size >= stack.current.stackLimit
          }
          isLoader={isLoading.add}
        />
        <Button
          text='Удалить'
          onClick={deleteFromStack}
          disabled={isEmpty || isLoading.add}
          isLoader={isLoading.delete}
        />
        <Button
          text='Очистить'
          onClick={clearStack}
          disabled={isEmpty || isLoading.add || isLoading.delete}
        />
      </div>
      <ul className={`${styles['elements-container']} list`}>
        {stackList &&
          stackList.map((el, idx) => (
            <li key={idx}>
              <Circle
                letter={el}
                index={idx}
                head={stack.current.lastIndex === idx ? 'top' : null}
                state={
                  stack.current.lastIndex === idx
                    ? lastElementState
                    : ElementStates.Default
                }
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
