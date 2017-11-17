import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CampaignUpdate from './CampaignUpdate';

// Mock Redux containers so we don't need Provider context.
jest.mock('../Share/ShareContainer', () => 'Share');

const author = {
  fields: {
    avatar: 'http://example.com/avatar-aang.jpg',
    jobTitle: 'The Last Airbender',
    name: 'Aang',
  },
};

const component = shallow(
  <CampaignUpdate
    id="1234567890"
    author={author}
    content="Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum."
    shareLink="http://example.com/link-to-content"
    titleLink="http://example.com/link-to-content"
  />,
);

test('it generates a campaign update snapshot', () => {
  const tree = shallowToJson(component);

  expect(tree).toMatchSnapshot();
});

test('it can display a campaign update as a card component', () => {
  expect(component.find('Card')).toHaveLength(1);
});
