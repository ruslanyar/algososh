import { CIRCLE, HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';
import { LinkedList } from './LinkedList';
import { linkedList } from './list-page';
import { TElement } from './types';

export function getInitState<T extends string>(
  linkedList: LinkedList<T>
): TElement[] {
  const array = linkedList.toArray();
  const renderList = array.map((el, idx) => {
    const element: TElement = {
      value: el,
      head: {
        type: '',
        value: idx === 0 ? HEAD : '',
        state: ElementStates.Changing,
      },
      tail: {
        type: '',
        value: idx === array.length - 1 ? TAIL : '',
        state: ElementStates.Changing,
      },
      state: ElementStates.Default,
    };
    return element;
  });
  return renderList;
}

export function getAddToHeadMatrix(list: TElement[], item: string) {
  const matrix = [];

  const firstStep = [];
  let firstElement = { ...list[0] };
  let firstElementHead = { ...firstElement.head };

  firstElementHead.type = CIRCLE;
  firstElementHead.value = item;
  firstElement.head = firstElementHead;

  firstStep.push(firstElement, ...list.slice(1));

  linkedList.prepend(item);

  const secondStep = getInitState(linkedList);
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

export function getAddToTailMatrix(list: TElement[], item: string) {
  const matrix = [];

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

  const secondStep = getInitState(linkedList).map((el, idx, array) => {
    if (idx === array.length - 1) {
      return {
        ...el,
        state: ElementStates.Modified,
      };
    }
    return el;
  });

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

export function getDeleteHeadMatrix(list: TElement[]) {
  const matrix = [];

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

  const secondStep = getInitState(linkedList);
  matrix.push(firstStep, secondStep);

  return matrix;
}

export function getDeleteTailMatrix(list: TElement[]) {
  const matrix = [];

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

  const secondStep = getInitState(linkedList);
  matrix.push(firstStep, secondStep);

  return matrix;
}

export function getAddByIndexMatrix(
  list: TElement[],
  item: string,
  index: number
) {
  const matrix = [];

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

  const preLastStep = getInitState(linkedList);
  const insertedEl = { ...preLastStep[index] };
  insertedEl.state = ElementStates.Modified;
  preLastStep[index] = { ...insertedEl };

  const lastStep = [...preLastStep];
  insertedEl.state = ElementStates.Default;
  lastStep[index] = { ...insertedEl };

  matrix.push(preLastStep, lastStep);

  return matrix;
}

export function getDeleteByIndexMatrix(list: TElement[], index: number) {
  const matrix = [];

  for (let i = 0; i <= index; i++) {
    const step = list.map((el, idx) => {
      if (idx === i) {
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

  const lastStep = getInitState(linkedList);

  matrix.push(preLastStep, lastStep);

  return matrix;
}
