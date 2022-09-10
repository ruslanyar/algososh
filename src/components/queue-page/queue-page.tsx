import React, { ChangeEvent, useState, useReducer } from 'react';

import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

import { HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';
import {
  ActionType,
  initState,
  IQueueState,
  queueReducer,
} from './queueReducer';

import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const [queue, dispatch] = useReducer(queueReducer, initState);
  const [inputValue, setInputValue] = useState('');
  const [headState, setHeadState] = useState(ElementStates.Default);
  const [tailState, setTailState] = useState(ElementStates.Default);
  const [isEnqLoading, setIsEnqLoading] = useState(false);
  const [isDeqLoading, setIsDeqLoading] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const enqueue = (item: string) => {
    setIsEnqLoading(true);
    setTailState(ElementStates.Changing);
    dispatch({ type: ActionType.Enqueue, payload: item });
    setInputValue('');
    setTimeout(() => {
      setTailState(ElementStates.Default);
      setIsEnqLoading(false);
    }, 500);
  };

  const dequeue = () => {
    setIsDeqLoading(true);
    if (queue.length === 1) {
      setTailState(ElementStates.Changing);
    } else {
      setHeadState(ElementStates.Changing);
    }
    setTimeout(() => {
      dispatch({ type: ActionType.Dequeue });
      if (queue.length === 1) {
        setTailState(ElementStates.Default);
      } else {
        setHeadState(ElementStates.Default);
      }
      setIsDeqLoading(false);
    }, 500);
  };

  const clearQueue = () => {
    dispatch({ type: ActionType.Clear });
  };

  const getCircleState = (obj: IQueueState, idx: number) => {
    if (idx === obj.tail) {
      return tailState;
    } else if (idx === obj.head) {
      return headState;
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
          onClick={() => enqueue(inputValue)}
          disabled={!inputValue || queue.length >= queue.size || isDeqLoading}
          isLoader={isEnqLoading}
        />
        <Button
          text='Удалить'
          onClick={dequeue}
          disabled={!queue.length || isEnqLoading}
          isLoader={isDeqLoading}
        />
        <Button
          text='Очистить'
          onClick={clearQueue}
          disabled={!queue.length || isEnqLoading || isDeqLoading}
        />
      </div>
      <ul className={`${styles['elements-container']} list`}>
        {queue.list &&
          queue.list.map((el, idx) => (
            <li key={idx}>
              <Circle
                letter={el}
                index={idx}
                head={idx === queue.head ? HEAD : null}
                tail={idx === queue.tail ? TAIL : null}
                state={getCircleState(queue, idx)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
