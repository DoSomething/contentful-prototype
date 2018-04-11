import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Card from './Card';

const component = shallow(
  <Card className="bordered padded rounded" title="Awesomest Content Ever">
    <p>Praesent commodo cursus magna, vel scelerisque nisl</p>
  </Card>,
);

test('it generates a card snapshot', () => {
  const tree = shallowToJson(component);

  expect(tree).toMatchSnapshot();
});

test('it can display a card as an article element', () => {
  expect(component.find('article')).toHaveLength(1);
});
