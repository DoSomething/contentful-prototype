import React from 'react';
import { shallow } from 'enzyme';

import TextSubmissionAction from './TextSubmissionAction';

const wrapper = shallow(
  <TextSubmissionAction
    campaignId="1234"
    campaignRunId="6789"
    contentfulId="1122334455667788990011"
    userId="666655554444333322221111"
  />,
);

test('TextSubmissionAction is rendered as a card component with a form', () => {
  expect(wrapper.find('Card').length).toEqual(1);
  expect(wrapper.find('form').length).toEqual(1);
});
