import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Byline from './Byline';

test('Byline default snapshot test', () => {
  const component = shallow(<Byline />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Byline with props snapshot test', () => {
  const component = shallow(
    <Byline
      author="Braümhilda Snosages"
      jobTitle="Campaign Tester"
      avatar="http://placeimg.com/150/150/people"
    />,
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
