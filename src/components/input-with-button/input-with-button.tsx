import React, { ChangeEvent } from 'react';

import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';

import styles from './input-with-button.module.css';

interface InputWithButtonProps {
  value: string;
  maxLength: number;
  max: number;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  isLoader: boolean;
}

export const InputWithButton: React.FC<InputWithButtonProps> = ({
  value,
  maxLength,
  max,
  text,
  onChange,
  onClick,
  isLoader,
}) => {
  return (
    <div className={styles['input-container']}>
      <Input
        isLimitText
        maxLength={maxLength}
        max={max}
        value={value}
        onChange={onChange}
      />
      <Button
        text={text}
        linkedList='small'
        isLoader={isLoader}
        onClick={onClick}
      />
    </div>
  );
};
