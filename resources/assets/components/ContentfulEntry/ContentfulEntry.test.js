import React from 'react';
import { shallow } from 'enzyme';

import ContentfulEntry from './ContentfulEntry';

// Override the mock of this component declared in jest-setup for this test file.
jest.unmock('./ContentfulEntry');

// Mock Redux containers so we don't need Provider context.
jest.mock(
  '../CallToAction/CallToActionContainer',
  () => 'CallToActionContainer',
);
jest.mock(
  '../blocks/CampaignUpdate/CampaignUpdateContainer',
  () => 'CampaignUpdateContainer',
);

test('it can display a campaign update', () => {
  const wrapper = shallow(
    <ContentfulEntry
      json={{ id: '12345', type: 'campaignUpdate', fields: {} }}
    />,
  );
  expect(wrapper.find('CampaignUpdateContainer')).toHaveLength(1);
});

test('it can display a CTA block', () => {
  const wrapper = shallow(
    <ContentfulEntry
      json={{ id: '12345', type: 'callToAction', fields: {} }}
    />,
  );
  expect(wrapper.find('CallToActionContainer')).toHaveLength(1);
});

test('it can display a static block', () => {
  const wrapper = shallow(
    <ContentfulEntry
      json={{
        id: '12345',
        type: 'static',
        fields: {
          content: 'Donec ullamcorper fringilla.',
          title: 'Nibh ornare',
        },
      }}
    />,
  );
  expect(wrapper.find('StaticBlock')).toHaveLength(1);
});

test('it should display a placeholder for an unknown block type', () => {
  const wrapper = shallow(
    <ContentfulEntry json={{ id: '12345', type: 'tongue_cat' }} />,
  );
  expect(wrapper.find('NotFound')).toHaveLength(1);
});

test('it should display a placeholder for an empty block', () => {
  const wrapper = shallow(<ContentfulEntry />);
  expect(wrapper.find('NotFound')).toHaveLength(1);
});
