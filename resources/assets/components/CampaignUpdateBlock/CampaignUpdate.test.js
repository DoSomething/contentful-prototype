import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CampaignUpdateBlock from './index';

test('Campaign Update Block with no additional content snapshot test', () => {
  const component = shallow(
    <CampaignUpdateBlock
      id="1234512345"
      shareLink="http://example.com/link-to-content"
      fields={{
        title: 'Heyo!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
      }}
    />,
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Campaign Update Block with additional content snapshot test', () => {
  const component = shallow(
    <CampaignUpdateBlock
      id="1234512345"
      shareLink="http://example.com/link-to-content"
      fields={{
        title: 'Heyo!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
        additionalContent: {
          author: 'Braümhilda Snosages',
        },
      }}
    />,
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Campaign Update Block with additional content as tweet snapshot test', () => {
  const component = shallow(
    <CampaignUpdateBlock
      id="1234512345"
      shareLink="http://example.com/link-to-content"
      fields={{
        title: 'Heyo!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus vestibulum.',
        additionalContent: {
          author: 'Braümhilda Snosages',
        },
      }}
    />,
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
