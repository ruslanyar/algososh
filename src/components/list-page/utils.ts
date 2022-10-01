import { CIRCLE, HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';
import { LinkedList } from './linked-list';
import { Step, TElement } from './types';

const elementTemplate: TElement = {
  value: '',
  head: {
    type: '',
    value: '',
    state: ElementStates.Changing,
  },
  tail: {
    type: '',
    value: '',
    state: ElementStates.Changing,
  },
  state: ElementStates.Default,
};

export function getInitState(list: string[]): TElement[] {
  const listToRender = list.map((el, idx) => {
    return {
      ...elementTemplate,
      value: el,
      head: {
        ...elementTemplate.head,
        value: idx === 0 ? HEAD : '',
      },
      tail: {
        ...elementTemplate.tail,
        value: idx === list.length - 1 ? TAIL : '',
      }
    };
  });
  return listToRender;
}

export function getAddToHeadMatrix<T extends string>(
  linkedList: LinkedList<T>,
  item: T
): Step<TElement> {
  const matrix = [];

  const list: TElement[] = getInitState(linkedList.toArray());
  if (!list.length)
    list.push({
      ...elementTemplate,
      head: { ...elementTemplate.head },
      tail: { ...elementTemplate.tail },
    });

  const firstStep = [];
  let firstElement = { ...list[0] };
  let firstElementHead = { ...firstElement.head };
  firstElementHead.type = CIRCLE;
  firstElementHead.value = item;
  firstElement.head = firstElementHead;

  firstStep.push(firstElement, ...list.slice(1));

  linkedList.prepend(item);

  const secondStep = getInitState(linkedList.toArray());
  firstElement = { ...secondStep[0] };
  firstElement.state = ElementStates.Modified;
  secondStep[0] = firstElement;

  const thirdStep = [...secondStep];
  firstElement = { ...thirdStep[0] };
  firstElement.state = ElementStates.Default;
  thirdStep[0] = firstElement;

  matrix.push(firstStep, secondStep, thirdStep);

  return matrix;
}

export function getAddToTailMatrix<T extends string>(
  linkedList: LinkedList<T>,
  item: T
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  if (!list.length)
  list.push({
    ...elementTemplate,
    head: { ...elementTemplate.head },
    tail: { ...elementTemplate.tail },
  });

  const firstStep = list.map((el, idx, array) => {
    if (idx === array.length - 1) {
      return {
        ...el,
        head: {
          ...el.head,
          type: CIRCLE,
          value: item,
        },
      };
    }
    return el;
  });

  linkedList.append(item);

  const secondStep = getInitState(linkedList.toArray()).map(
    (el, idx, array) => {
      if (idx === array.length - 1) {
        return {
          ...el,
          state: ElementStates.Modified,
        };
      }
      return el;
    }
  );

  const thirdStep = secondStep.map((el, idx, array) => {
    if (idx === array.length - 1) {
      return {
        ...el,
        state: ElementStates.Default,
      };
    }
    return el;
  });

  matrix.push(firstStep, secondStep, thirdStep);

  return matrix;
}

export function getDeleteHeadMatrix<T extends string>(
  linkedList: LinkedList<T>
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  const firstStep = list.map((el, idx) => {
    if (idx === 0) {
      return {
        ...el,
        value: '',
        tail: {
          ...el.tail,
          type: CIRCLE,
          value: el.value,
        },
      };
    }
    return el;
  });

  linkedList.deleteHead();

  const secondStep = getInitState(linkedList.toArray());
  matrix.push(firstStep, secondStep);

  return matrix;
}

export function getDeleteTailMatrix<T extends string>(
  linkedList: LinkedList<T>
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  const firstStep = list.map((el, idx, array) => {
    if (idx === array.length - 1) {
      return {
        ...el,
        value: '',
        tail: {
          ...el.tail,
          type: CIRCLE,
          value: el.value,
        },
      };
    }
    return el;
  });

  linkedList.deleteTail();

  const secondStep = getInitState(linkedList.toArray());
  matrix.push(firstStep, secondStep);

  return matrix;
}

export function getAddByIndexMatrix<T extends string>(
  linkedList: LinkedList<T>,
  item: T,
  index: number
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  for (let i = 0; i <= index; i++) {
    const step = list.map((el, idx) => {
      if (i === idx) {
        return {
          ...el,
          head: {
            ...el.head,
            type: CIRCLE,
            value: item,
          },
        };
      } else if (idx < i) {
        return {
          ...el,
          state: ElementStates.Changing,
        };
      }
      return el;
    });
    matrix.push(step);
  }

  linkedList.addByIndex(item, index);

  const preLastStep = getInitState(linkedList.toArray());
  const insertedEl = { ...preLastStep[index] };
  insertedEl.state = ElementStates.Modified;
  preLastStep[index] = { ...insertedEl };

  const lastStep = [...preLastStep];
  insertedEl.state = ElementStates.Default;
  lastStep[index] = { ...insertedEl };

  matrix.push(preLastStep, lastStep);

  return matrix;
}

export function getDeleteByIndexMatrix<T extends string>(
  linkedList: LinkedList<T>,
  index: number
): Step<TElement> {
  const matrix = [];

  const list = getInitState(linkedList.toArray());

  for (let i = 0; i <= index; i++) {
    const step = list.map((el, idx) => {
      if (idx <= i) {
        return {
          ...el,
          state: ElementStates.Changing,
        };
      }
      return el;
    });
    matrix.push(step);
  }

  const preLastStep = [...matrix[matrix.length - 1]];
  const deletedEl = { ...preLastStep[index] };
  deletedEl.tail = {
    ...deletedEl.tail,
    value: deletedEl.value,
    type: CIRCLE,
  };
  deletedEl.value = '';
  deletedEl.state = ElementStates.Default;
  preLastStep[index] = deletedEl;

  linkedList.deleteByIndex(index);

  const lastStep = getInitState(linkedList.toArray());

  matrix.push(preLastStep, lastStep);

  return matrix;
}
