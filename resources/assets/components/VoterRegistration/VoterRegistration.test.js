import React from 'react';
import { render } from 'enzyme';

import VoterRegistration from './VoterRegistration';

// jest.mock('./VoterRegistrationContainer', () => 'VoterRegistrationContainer');

test('VoterRegistration is rendered as a card component with a button', () => {
  const wrapper = render(
    <VoterRegistration
      campaignId="1234"
      campaignRunId="9876"
      content="Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
      link="http://example.com?campaign={}&campaingRun={}&user={}&source={}"
      stepIndex={1}
      title="Register to vote!"
      userId="551234567890abcdefghijkl"
    />
  );

  expect(wrapper.find('.card').length).toEqual(1);
  expect(wrapper.find('.button').length).toEqual(1);
});
