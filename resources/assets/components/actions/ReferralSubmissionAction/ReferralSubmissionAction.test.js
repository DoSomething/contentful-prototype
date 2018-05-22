import React from 'react';
import { shallow } from 'enzyme';

import ReferralSubmissionAction from './ReferralSubmissionAction';

describe('PhotoSubmissionAction component', () => {
  const id = 'abcdefghi123456789';

  const wrapper = shallow(
    <ReferralSubmissionAction
      campaignId="1234"
      campaignRunId="6789"
      initPostSubmissionItem={jest.fn()}
      resetPostSubmissionItem={jest.fn()}
      id={id}
      storeCampaignPost={jest.fn()}
      submissions={{
        isPending: false,
        items: {},
      }}
      type="referral"
    />,
  );

  test('is rendered as a card component with a form and a submit button', () => {
    expect(wrapper.find('Card').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
