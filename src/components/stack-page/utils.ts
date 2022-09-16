import { IStack } from './types';

export class Stack<T = string> implements IStack<T> {
  private stack: T[] = [];

  push = (item: T) => {
    this.stack.push(item);
  }

  pop = () => {
    this.stack.pop();
  }

  clear = () => {
    this.stack = [];
  }

  get elements() {
    return this.stack;
  }

  get size() {
    return this.stack.length;
  }

  get lastIndex() {
    return this.stack.length - 1;
  }
}
