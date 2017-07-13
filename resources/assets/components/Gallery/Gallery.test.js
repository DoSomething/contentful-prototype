import React from 'react';
import renderer from 'react-test-renderer';
import Gallery from './Gallery';

test('it renders correctly with children', () => {
  const tree = renderer.create(
    <Gallery type="quartet">
      <div>item one</div>
      <div>item two</div>
      <div>item three</div>
      <div>item four</div>
    </Gallery>,
  );

  expect(tree).toMatchSnapshot();
});
