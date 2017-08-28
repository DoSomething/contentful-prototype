import React from 'react';
import { shallow } from 'enzyme';
import Block from './Block';

// Mock Redux containers so we don't need Provider context.
jest.mock('./BlockContainer', () => 'BlockContainer');
jest.mock('../../containers/CallToActionBlockContainer', () => 'CallToActionBlockContainer');
jest.mock('../CampaignUpdateBlock/CampaignUpdateBlockContainer', () => 'CampaignUpdateBlockContainer');

test('it can display a campaign update', () => {
  const wrapper = shallow(<Block json={{ id: '12345', type: 'campaign_update' }} />);
  expect(wrapper.find('CampaignUpdateBlockContainer')).toHaveLength(1);
});

test('it can display a CTA block', () => {
  const wrapper = shallow(<Block json={{ id: '12345', type: 'join_cta' }} />);
  expect(wrapper.find('CallToActionBlockContainer')).toHaveLength(1);
});

test('it can display a static block', () => {
  const wrapper = shallow(<Block json={{ id: '12345', type: 'static', fields: {} }} />);
  expect(wrapper.find('StaticBlock')).toHaveLength(1);
});

test('it can display a reportback block', () => {
  const json = { id: '12345', type: 'reportbacks', fields: {}, reportbacks: [] };
  const wrapper = shallow(<Block json={json} />);
  expect(wrapper.find('ReportbackBlock')).toHaveLength(1);
});

test('it should display a placeholder for an unknown block type', () => {
  const wrapper = shallow(<Block json={{ id: '12345', type: 'tongue_cat' }} />);
  expect(wrapper.find('PlaceholderBlock')).toHaveLength(1);
});

test('it should display a placeholder for an empty block', () => {
  const wrapper = shallow(<Block />);
  expect(wrapper.find('PlaceholderBlock')).toHaveLength(1);
});
