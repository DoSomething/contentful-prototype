import React from 'react';
import { shallow } from 'enzyme';

import { get } from '../../../helpers/storage';

import VoterRegistrationAction from './VoterRegistrationAction';
import LocalStorageMock from '../../../__mocks__/localStorageMock';

const trackEventMock = jest.fn();

global.localStorage = new LocalStorageMock();

const renderVoterRegistration = () =>
  shallow(
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
  const wrapper = renderVoterRegistration();

  expect(wrapper.find('Card').length).toEqual(1);
  expect(wrapper.find('.button').length).toEqual(1);
});

describe('clicking the VoterRegistrationAction button', () => {
  test('calls the event tracker prop function', () => {
    const wrapper = renderVoterRegistration();

    wrapper.find('.button').simulate('click');
    expect(trackEventMock).toHaveBeenCalled();
  });

  test('sets the user to be hidden from voter_reg_modal in local storage', () => {
    const wrapper = renderVoterRegistration();
    wrapper.find('.button').simulate('click');

    expect(
      get(`${'551234567890abcdefghijkl'}_hide_voter_reg_modal`, 'boolean'),
    ).toBe(true);
  });
});
