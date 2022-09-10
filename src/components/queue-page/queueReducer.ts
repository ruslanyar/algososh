import { Reducer } from 'react';

export interface IQueueState {
  list: (string | undefined)[];
  head: number | null;
  tail: number | null;
  length: number;
  size: 7;
}

export enum ActionType {
  Enqueue = 'Enqueue',
  Dequeue = 'Dequeue',
  Clear = 'Clear',
}

interface IQueueAction {
  type: ActionType.Enqueue;
  payload: string;
}

interface IEnqueueAction {
  type: ActionType.Dequeue;
}

interface IClearAction {
  type: ActionType.Clear;
}

type TActions = IQueueAction | IEnqueueAction | IClearAction;

export const initState: IQueueState = {
  list: Array.from({ length: 7 }),
  head: null,
  tail: null,
  length: 0,
  size: 7,
};

export const queueReducer: Reducer<IQueueState, TActions> = (state, action) => {
  switch (action.type) {
    case ActionType.Enqueue:
      const enqState = {...state};
      if (state.length === 0) {
        enqState.head = enqState.tail = 0;
      } else {
        state.tail === state.size - 1
          ? enqState.tail = 0
          : enqState.tail!++;
      }
      enqState.list[enqState.tail!] = action.payload;
      enqState.length++;
      return enqState;

    case ActionType.Dequeue:
      const deqState = {...state};
      deqState.list[deqState.head!] = undefined;
      deqState.length--;
      if (deqState.length === 0) {
        deqState.head = deqState.tail = null;
      } else {
        deqState.head === deqState.size - 1
          ? (deqState.head = 0)
          : deqState.head!++;
      }
      return deqState;

    case ActionType.Clear:
      return {
        ...initState,
        list: Array.from({ length: 7 })
      };

    default:
      throw new Error('Wrong action type');
  }
};
