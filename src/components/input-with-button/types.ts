import { ChangeEvent } from 'react';

export interface InputWithButtonProps {
  value: string;
  maxLength?: number;
  max?: number;
  text: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  isLoader: boolean;
  disabled?: boolean;
}
