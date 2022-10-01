import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Button } from './button';

describe('Компонент Button', () => {
  it('Компонент есть в документе', () => {
    render(<Button />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  it('Snapshot: кнопка с текстом', () => {
    const tree = renderer.create(<Button text='Click me' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: кнопка без текста', () => {
    const tree = renderer.create(<Button />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: заблокированная кнопка', () => {
    const tree = renderer.create(<Button disabled />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: кнопка с индикацией загрузки', () => {
    const tree = renderer.create(<Button isLoader />);
    expect(tree).toMatchSnapshot();
  });

  it('Нажатие на кнопку вызывает колбек', () => {
    const onClickCb = jest.fn();
    render(<Button onClick={onClickCb}/>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(onClickCb).toHaveBeenCalledTimes(1);
  });
});