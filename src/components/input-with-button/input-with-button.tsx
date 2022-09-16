import React from 'react';

import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';

import { InputWithButtonProps } from './types';

import styles from './input-with-button.module.css';

export const InputWithButton: React.FC<InputWithButtonProps> = ({
  value,
  maxLength,
  max,
  text,
  type,
  onChange,
  onClick,
  isLoader,
  disabled
}) => {
  return (
    <div className={styles['input-container']}>
      <Input
        isLimitText
        maxLength={maxLength}
        max={max}
        value={value}
        type={type}
        onChange={onChange}
        />
      <Button
        text={text}
        linkedList='small'
        isLoader={isLoader}
        onClick={onClick}
        disabled={disabled}
      />
    </div>
  );
};
