import React from 'react';
import { shallow } from 'enzyme';

import TextSubmissionAction from './TextSubmissionAction';

describe('TextSubmissionAction component', () => {
  const id = 'abcdefghi123456789';

  const wrapper = shallow(
    <TextSubmissionAction
      campaignId="1234"
      campaignRunId="6789"
      clearPostSubmissionItem={jest.fn()}
      contentfulId="1122334455667788990011"
      id={id}
      openModal={jest.fn()}
      storeCampaignPost={jest.fn()}
      submissions={{
        isPending: false,
        items: {},
      }}
      type="text"
      userId="666655554444333322221111"
    />,
  );

  test('is rendered as a card component with a form and submit button', () => {
    expect(wrapper.find('Card').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
  });
});
