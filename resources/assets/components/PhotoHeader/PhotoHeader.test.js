import React from 'react';
import renderer from 'react-test-renderer';
import PhotoHeader from './PhotoHeader';

test('PhotoHeader snapshot test', () => {
  const tree = renderer.create(
    <PhotoHeader backgroundImage="https://fake-image.com/img.png">
      <h1>title</h1>
    </PhotoHeader>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
