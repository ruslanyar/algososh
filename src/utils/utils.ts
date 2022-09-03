export const swap = (
  arr: string[],
  firstIndex: number,
  secondIndex: number
): void => {
  let tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
};
