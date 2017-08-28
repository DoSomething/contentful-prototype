import React from 'react';
import renderer from 'react-test-renderer';
import CallToAction from './CallToAction';

test('CallToAction snapshot test', () => {
  const tree = renderer.create(
    <CallToAction className="sample-class" onClick={() => {}} />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
