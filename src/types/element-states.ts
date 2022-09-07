export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type TElement = {
  value: number;
  state: ElementStates;
};