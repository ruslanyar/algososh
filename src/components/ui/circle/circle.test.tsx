import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

import { Circle } from './circle';

describe('Компонент Circle', () => {
  it('Snapshot: Рендер без буквы', () => {
    const tree = renderer.create(<Circle />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер с буквой', () => {
    const tree = renderer.create(<Circle letter='test' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер с head', () => {
    const tree = renderer.create(<Circle head='head' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер с react-элементом в head', () => {
    const head = <Circle isSmall />;
    const tree = renderer.create(<Circle head={head} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер с tail', () => {
    const tree = renderer.create(<Circle tail='tail' />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер с react-элементом в tail', () => {
    const tail = <Circle isSmall />;
    const tree = renderer.create(<Circle tail={tail} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер с index', () => {
    const tree = renderer.create(<Circle index={0} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер с пропом "isSmall ===  true"', () => {
    const tree = renderer.create(<Circle isSmall />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер в состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер в состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot: Рендер в состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(tree).toMatchSnapshot();
  });
});
