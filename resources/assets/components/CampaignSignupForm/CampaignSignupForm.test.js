import React from 'react';
import { mount } from 'enzyme';

import CampaignSignupForm from './CampaignSignupForm';

jest.mock('../../helpers/analytics');

const storeCampaignSignup = jest.fn();

const props = {
  campaignId: '123',
  pageId: '456',
  storeCampaignSignup,
};

describe('The CampaignSignupForm component', () => {
  it('displays a Button', () => {
    const wrapper = mount(<CampaignSignupForm {...props} />);

    expect(wrapper.find('PrimaryButton')).toHaveLength(1);
  });

  it('invokes the storeCampaignSignup function when the button is clicked', () => {
    const wrapper = mount(<CampaignSignupForm {...props} />);

    wrapper.find('PrimaryButton').simulate('click');

    expect(storeCampaignSignup).toHaveBeenCalled();
  });

  describe('The signup button text', () => {
    it('defaults to the campaignActiontext', () => {
      const wrapper = mount(<CampaignSignupForm {...props} />);

      expect(wrapper.find('PrimaryButton').text()).toEqual('Take Action');
    });

    it('is overriden by the "text" prop', () => {
      const text = 'Text Override!';
      const wrapper = mount(<CampaignSignupForm {...props} text={text} />);

      expect(wrapper.find('PrimaryButton').text()).toEqual(text);
    });

    it('is overriden by the closed state text if the campaign is closed', () => {
      const wrapper = mount(
        <CampaignSignupForm {...props} endDate="2019-09-08" />,
      );

      expect(wrapper.find('PrimaryButton').text()).toEqual('Notify Me');
    });
  });
});
