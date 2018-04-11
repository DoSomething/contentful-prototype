import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import BlockWrapper from './BlockWrapper';

test('it renders correctly with children', () => {
  const component = shallow(
    <BlockWrapper>
      <div id="tongue-cat" />
    </BlockWrapper>,
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('it renders without children', () => {
  const component = shallow(<BlockWrapper />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('it renders correctly with title', () => {
  const component = shallow(
    <BlockWrapper title="Lets Do This">
      <div id="tongue-cat" />
    </BlockWrapper>,
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('it links to a block', () => {
  const wrapper = mount(
    <MemoryRouter>
      <BlockWrapper title="Lets Do This" shareLink="/blocks/123abc">
        <div id="tongue-cat" />
      </BlockWrapper>
    </MemoryRouter>,
  );

  // Grab the link and make sure URL is formed correctly.
  const linkProps = wrapper
    .find('Link')
    .first()
    .props();
  expect(linkProps.to).toEqual('/blocks/123abc');
});
