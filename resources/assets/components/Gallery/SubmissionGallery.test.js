import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SubmissionGallery from './SubmissionGallery';

const mediaItem = {
  media: {
    uri: 'http://fakelink.com',
  },
};

test('it renders correctly with required props', () => {
  const component = shallow(
    <SubmissionGallery submissions={{
      isFetching: false,
      items: [mediaItem],
    }}
    />,
  );

  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('it renders loader while fetching', () => {
  const component = shallow(
    <SubmissionGallery submissions={{
      isFetching: true,
      items: [mediaItem],
    }}
    />,
  );

  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
