import { ILinkedList } from './types';

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  private sizeLimit: number;
  private list: T[];
  private initValuesArray?: T[] | null;

  constructor(initValuesArray?: T[], sizeLimit?: number) {
    this.head = null;
    this.list = [];
    this.size = 0;
    this.sizeLimit = sizeLimit === undefined ? Infinity : sizeLimit;
    this.initValuesArray =
      initValuesArray === undefined ? null : initValuesArray;

    if (initValuesArray?.length)
      initValuesArray.forEach((el) => this.append(el));
  }

  prepend = (item: T) => {
    if (this.size >= this.sizeLimit) return null;
    const node = new LinkedListNode<T>(item);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
    return node;
  };

  append = (item: T) => {
    if (this.size >= this.sizeLimit) return null;
    const node = new LinkedListNode<T>(item);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
    return node;
  };

  addByIndex = (item: T, index: number) => {
    if (index < 0 || index > this.size || this.size >= this.sizeLimit) return null;
    if (index === 0 || !this.head) {
      this.prepend(item);
    } else if (index === this.size) {
      this.append(item);
    } else {
      const node = new LinkedListNode<T>(item);
      let prev = null;
      let curr: LinkedListNode<T> | null = this.head;
      while (index > 0) {
        prev = curr;
        curr = curr!.next;
        index--;
      }
      prev!.next = node;
      node.next = curr;
      this.size++;
      return node;
    }
  };

  deleteByIndex = (index: number) => {
    if (index < 0 || index >= this.size || !this.head) return null;
    let prev = null;
    let curr = this.head;
    do {
      prev = curr;
      curr = curr!.next!;
      index--;
    } while (index > 0);
    prev.next = curr.next;
    this.size--;
    return curr;
  };

  deleteHead = () => {
    if (this.head === null) return null;
    this.head = this.head.next;
    this.size--;
    return this.head;
  };

  deleteTail = () => {
    if (this.head === null) return null;
    let prev = null;
    let curr = this.head;

    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    if (prev === null) {
      this.head = prev;
    } else {
      prev.next = null;
    }

    this.size--;

    return curr;
  };

  toArray = () => {
    if (this.head === null) return [];
    this.list = [];
    let current: LinkedListNode<T> | null = this.head;

    do {
      this.list.push(current.value);
      current = current.next;
    } while (current);

    return this.list;
  };

  getSizeLimit = () => {
    return this.sizeLimit;
  };
}
