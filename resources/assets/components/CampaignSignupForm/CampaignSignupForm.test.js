import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import CampaignSignupForm from './CampaignSignupForm';
import { SEARCH_USER_CAMPAIGN_QUERY } from '../../helpers/campaign';

jest.mock('../../helpers/analytics');

const storeCampaignSignup = jest.fn();
const signupCreated = jest.fn();

window.STATE = { campaign: { id: '123' } };

const props = {
  campaignId: '123',
  pageId: '456',
  storeCampaignSignup,
  signupCreated,
};

// Mock the GraphQL query and response.
const mocks = [
  {
    request: {
      query: SEARCH_USER_CAMPAIGN_QUERY,
      variables: {
        campaignId: 123,
        userId: '123',
      },
    },
    result: {
      data: {
        signups: [],
      },
    },
  },
];

describe('The CampaignSignupForm component', () => {
  let wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CampaignSignupForm {...props} />
    </MockedProvider>,
  );

  it('displays a Button', () => {
    expect(wrapper.find('PrimaryButton')).toHaveLength(1);
  });

  it('invokes the storeCampaignSignup function when the button is clicked', () => {
    wrapper.find('PrimaryButton').simulate('click');

    expect(storeCampaignSignup).toHaveBeenCalled();
  });

  describe('The signup button text', () => {
    it('defaults to the campaignActiontext', () => {
      expect(wrapper.find('PrimaryButton').text()).toEqual('Take Action');
    });

    it('is overriden by the "text" prop', () => {
      const text = 'Text Override!';

      wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CampaignSignupForm {...props} text={text} />
        </MockedProvider>,
      );

      expect(wrapper.find('PrimaryButton').text()).toEqual(text);
    });

    it('is overriden by the closed state text if the campaign is closed', () => {
      window.STATE = { campaign: { endDate: '2019-09-08' } };

      wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CampaignSignupForm {...props} />
        </MockedProvider>,
      );

      expect(wrapper.find('PrimaryButton').text()).toEqual('Notify Me');
    });
  });
});
