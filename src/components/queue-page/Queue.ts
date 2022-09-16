import { IQueue } from './types';

export class Queue<T = string> implements IQueue<T> {
  private queue: (T | undefined)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length = 0;

  constructor(size: number) {
    this.size = size;
    this.queue = Array.from({ length: size });
  }

  enqueue = (item: T) => {
    if (this.isEmpty) {
      this.queue[this.tail] = item;
    } else {
      this.tail === this.size - 1 ? (this.tail = 0) : this.tail++;
      this.queue[this.tail] = item;
    }
    this.length++;
  };

  dequeue = () => {
    this.queue[this.head] = undefined;
    this.length--;
    if (this.isEmpty) {
      this.head = this.tail = 0;
    } else {
      this.head === this.size - 1 ? (this.head = 0) : this.head++;
    }
  };

  clear = () => {
    this.queue = Array.from({ length: this.size });
    this.head = this.tail = 0;
    this.length = 0;
  };

  get elements() {
    return this.queue;
  }

  get headIdx() {
    return this.head;
  }

  get tailIdx() {
    return this.tail;
  }

  get len() {
    return this.length;
  }

  get isEmpty() {
    return this.length === 0;
  }

  get isFull() {
    return this.length >= this.size;
  }
}
