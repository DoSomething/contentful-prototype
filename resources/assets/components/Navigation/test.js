import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TabbedNavigation from './TabbedNavigation';
import NavigationLink from './NavigationLink';

test('TabbedNavigation snapshot test', () => {
  const component = shallow(
    <TabbedNavigation>
      <NavigationLink>Awesome Link</NavigationLink>
    </TabbedNavigation>,
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
