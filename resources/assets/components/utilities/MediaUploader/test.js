import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import MediaUploader from './MediaUploader';

test('MediaUploader snapshot test', () => {
  const component = shallow(<MediaUploader onChange={() => {}} />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
