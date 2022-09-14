export const getFibMatrix = (num: number) => {
  const fibArr = [0, 1];
  const fibMatrix = [[0], [0, 1]];

  for (let i = 2; i <= num; i++) {
    fibArr.push(fibArr[i - 2] + fibArr[i - 1]);
    fibMatrix.push([...fibArr]);
  }

  return fibMatrix;
};
