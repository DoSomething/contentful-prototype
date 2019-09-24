import React from 'react';
import { mount } from 'enzyme';

import SignupButton from './SignupButton';

const storeCampaignSignup = jest.fn();

const props = {
  campaignId: '123',
  pageId: '456',
  storeCampaignSignup,
};

describe('The SignupButton component', () => {
  it('displays a Button', () => {
    const wrapper = mount(<SignupButton {...props} />);

    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it("doesn't render the Button if the signup is disabled", () => {
    const wrapper = mount(<SignupButton {...props} disableSignup />);

    expect(wrapper.find('Button')).toHaveLength(0);
  });

  it('invokes the storeCampaignSignup function when the button is clicked', () => {
    const wrapper = mount(<SignupButton {...props} />);

    wrapper.find('Button').simulate('click');

    expect(storeCampaignSignup).toHaveBeenCalled();
  });

  describe('The signup button text', () => {
    it('defaults to the campaignActiontext', () => {
      const wrapper = mount(<SignupButton {...props} />);

      expect(wrapper.find('Button').text()).toEqual('Take Action');
    });

    it('is overriden by the "text" prop', () => {
      const text = 'Text Override!';
      const wrapper = mount(<SignupButton {...props} text={text} />);

      expect(wrapper.find('Button').text()).toEqual(text);
    });

    it('is overriden by the closed state text if the campaign is closed', () => {
      const wrapper = mount(<SignupButton {...props} endDate="2019-09-08" />);

      expect(wrapper.find('Button').text()).toEqual('Notify Me');
    });
  });
});
