import React from 'react';
import { mount } from 'enzyme';

import { get } from '../../../helpers/storage';
import VoterRegistrationAction from './VoterRegistrationAction';
import LocalStorageMock from '../../../__mocks__/localStorageMock';
import { trackAnalyticsEvent as trackEventMock } from '../../../helpers/analytics';
import IntersectionObserverMock from '../../../__mocks__/intersectionObserverMock';

jest.mock('../../../helpers/analytics');

global.localStorage = new LocalStorageMock();
global.IntersectionObserver = IntersectionObserverMock;

const renderVoterRegistration = () =>
  mount(
    <VoterRegistrationAction
      blockId="1234"
      campaignId="5678"
      content="Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
      link="http://example.com?campaign={campaignId}&campaingRun={campaignRunId}&user={northstarId}&source={source}"
      pageId="1234567890"
      title="Register to vote!"
      userId="551234567890abcdefghijkl"
    />,
  );

test('VoterRegistrationAction is rendered as a card component with a button', () => {
  const wrapper = renderVoterRegistration();

  expect(wrapper.find('Card').length).toEqual(1);
  expect(wrapper.find('ButtonLink').length).toEqual(1);
});

describe('clicking the VoterRegistrationAction button', () => {
  test('calls the event tracker prop function', () => {
    const wrapper = renderVoterRegistration();

    wrapper.find('ButtonLink').simulate('click');
    expect(trackEventMock).toHaveBeenCalled();
  });

  test('sets the user to be hidden from voter_reg_modal in local storage', () => {
    const wrapper = renderVoterRegistration();
    wrapper.find('ButtonLink').simulate('click');

    expect(
      get(`${'551234567890abcdefghijkl'}_hide_voter_reg_modal`, 'boolean'),
    ).toBe(true);
  });
});
