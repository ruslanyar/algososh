export const swap = (
  arr: any[],
  firstIndex: number,
  secondIndex: number
): void => {
  let tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
};
