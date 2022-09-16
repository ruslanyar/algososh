import React, { ChangeEvent, useRef, useState } from 'react';

import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';
import { Queue } from './Queue';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue(7));
  const [queueList, setQueueList] = useState(queue.current.elements);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState({ enq: false, deq: false });
  const [elementsState, setElementsState] = useState({
    head: ElementStates.Default,
    tail: ElementStates.Default,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const enqueueHandler = (item: string) => {
    setIsLoading((prev) => ({ ...prev, enq: true }));
    setElementsState((prev) => ({ ...prev, tail: ElementStates.Changing }));

    queue.current.enqueue(item);
    setQueueList(queue.current.elements);
    setInputValue('');

    setTimeout(() => {
      setIsLoading((prev) => ({ ...prev, enq: false }));
      setElementsState((prev) => ({ ...prev, tail: ElementStates.Default }));
    }, SHORT_DELAY_IN_MS);
  };

  const dequeueHandler = () => {
    setIsLoading((prev) => ({ ...prev, deq: true }));
    if (queue.current.len === 1) {
      setElementsState((prev) => ({ ...prev, tail: ElementStates.Changing }));
    } else {
      setElementsState((prev) => ({ ...prev, head: ElementStates.Changing }));
    }

    setTimeout(() => {
      queue.current.dequeue();
      setQueueList(queue.current.elements);
      if (queue.current.len === 0) {
        setElementsState((prev) => ({ ...prev, tail: ElementStates.Default }));
      } else {
        setElementsState((prev) => ({ ...prev, head: ElementStates.Default }));
      }
      setIsLoading((prev) => ({ ...prev, deq: false }));
    }, SHORT_DELAY_IN_MS);
  };

  const clearQueue = () => {
    queue.current.clear();
    setQueueList(queue.current.elements);
  };

  const getCircleState = (list: Queue, idx: number) => {
    if (idx === list.tailIdx) {
      return elementsState.tail;
    } else if (idx === list.headIdx) {
      return elementsState.head;
    } else {
      return ElementStates.Default;
    }
  };

  return (
    <SolutionLayout title='Очередь'>
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
          onClick={() => enqueueHandler(inputValue)}
          disabled={!inputValue || queue.current.isFull || isLoading.deq}
          isLoader={isLoading.enq}
        />
        <Button
          text='Удалить'
          onClick={dequeueHandler}
          disabled={queue.current.isEmpty || isLoading.enq}
          isLoader={isLoading.deq}
        />
        <Button
          text='Очистить'
          onClick={clearQueue}
          disabled={queue.current.isEmpty || isLoading.enq || isLoading.deq}
        />
      </div>
      <ul className={`${styles['elements-container']} list`}>
        {queueList &&
          queueList.map((el, idx) => (
            <li key={idx}>
              <Circle
                letter={el}
                index={idx}
                head={
                  !queue.current.isEmpty && idx === queue.current.headIdx
                    ? HEAD
                    : null
                }
                tail={
                  !queue.current.isEmpty && idx === queue.current.tailIdx
                    ? TAIL
                    : null
                }
                state={getCircleState(queue.current, idx)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
