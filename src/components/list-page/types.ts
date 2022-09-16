import { ElementStates } from '../../types/element-states';

export interface ILinkedList<T> {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => T[];
}

export type TElement = {
  value: string;
  head: TCircle;
  tail: TCircle;
  state: ElementStates;
};

type TCircle = Pick<TElement, 'value' | 'state'> & { type: string };
