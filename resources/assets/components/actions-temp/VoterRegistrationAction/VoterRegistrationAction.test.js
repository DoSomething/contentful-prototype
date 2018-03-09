import React from 'react';
import { shallow } from 'enzyme';

import VoterRegistrationAction from './VoterRegistrationAction';

const trackEventMock = jest.fn();

const wrapper = shallow(
  <VoterRegistrationAction
    campaignId="1234"
    campaignRunId="9876"
    content="Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
    contentfulId="1234"
    link="http://example.com?campaign={campaignId}&campaingRun={campaignRunId}&user={northstarId}&source={source}"
    stepIndex={1}
    title="Register to vote!"
    userId="551234567890abcdefghijkl"
    trackEvent={trackEventMock}
  />,
);

test('VoterRegistrationAction is rendered as a card component with a button', () => {
  expect(wrapper.find('Card').length).toEqual(1);
  expect(wrapper.find('.button').length).toEqual(1);
});

test('VoterRegistrationAction calls the event tracker prop function when the button is clicked', () => {
  wrapper.find('.button').simulate('click');
  expect(trackEventMock).toHaveBeenCalled();
});
