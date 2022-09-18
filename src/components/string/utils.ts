import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils/utils';

export const getArrayOfLetters = (str: string): string[][] | null => {
  if (!str) return null;

  const arr = str.split('');
  const result: string[][] = [[...arr]];

  let start = 0,
    end = arr.length - 1;

  while (start <= end) {
    swap(arr, start, end);
    result.push([...arr]);
    start++;
    end--;
  }

  return result;
};

export const getCircleState = (
  idx: number,
  step: number,
  len: number
): ElementStates | undefined => {
  console.log({idx,step,len});
  
  if (idx < step || idx > len - 1 - step) return ElementStates.Modified;
  if (idx === step || idx === len - 1 - step) return ElementStates.Changing;
  if (idx > step && idx < len - 1 - step) return ElementStates.Default;
};
