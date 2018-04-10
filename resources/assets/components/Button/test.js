import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button snapshot test', () => {
  const tree = renderer
    .create(<Button className="-modifier" onClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
