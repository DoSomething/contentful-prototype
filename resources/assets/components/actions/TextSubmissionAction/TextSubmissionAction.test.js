import React from 'react';
import { shallow } from 'enzyme';

import TextSubmissionAction from './TextSubmissionAction';

describe('TextSubmissionAction component', () => {
  const id = 'abcdefghi123456789';

  const wrapper = shallow(
    <TextSubmissionAction
      automatedTest={true}
      campaignId="1234"
      id={id}
      resetPostSubmissionItem={jest.fn()}
      storeCampaignPost={jest.fn()}
      submissions={{
        isPending: false,
        items: {},
      }}
      type="text"
      userId="666655554444333322221111"
      storePost={jest.fn()}
    />,
  );

  test('is rendered as a card component with a form and submit button', () => {
    expect(wrapper.find('Card').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
