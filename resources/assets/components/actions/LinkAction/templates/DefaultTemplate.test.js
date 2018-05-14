/* global jsdom */

import React from 'react';
import { shallow } from 'enzyme';

import DefaultTemplate from './DefaultTemplate';
import { trackPuckEvent as trackEventMock } from '../../../../helpers/analytics';

jest.mock('../../../../helpers/analytics');

describe('DefaultTemplate component', () => {
  // mocking the window.location.origin for the isExternal helper method called from DefaultTemplate
  jsdom.reconfigure({
    url: 'https://dosomething.org',
  });

  const props = {
    title: 'Click on this link!',
    link: 'https://dosomething.org',
  };

  describe('without content', () => {
    const wrapper = shallow(<DefaultTemplate {...props} />);

    it('renders a link embed', () => {
      expect(wrapper.find('Embed')).toHaveLength(1);
    });

    it('calls the event tracker prop function when the link is clicked', () => {
      wrapper.simulate('click');
      expect(trackEventMock).toHaveBeenCalled();
    });
  });

  describe('with content', () => {
    const wrapper = shallow(
      <DefaultTemplate {...props} content="This is a great link" />,
    );

    it('renders a Card component with a button', () => {
      expect(wrapper.find('Card')).toHaveLength(1);
      expect(wrapper.find('Card').find('Button')).toHaveLength(1);
    });

    it('calls the event tracker prop function when the button is clicked', () => {
      wrapper.find('Button').simulate('click');
      expect(trackEventMock).toHaveBeenCalled();
    });
  });

  describe('with custom button text', () => {
    const wrapper = shallow(
      <DefaultTemplate
        {...props}
        content="This is a great link"
        buttonText="Do it!"
      />,
    );

    it('renders a button with the appropriate text', () => {
      const button = wrapper.find('Button');

      expect(button).toHaveLength(1);
      expect(button.dive().text()).toEqual('Do it!');
    });
  });

  describe('without an affiliateLogo', () => {
    const wrapper = shallow(
      <DefaultTemplate {...props} content="Look here!" />,
    );

    it('does not add an "affiliate-content" class to the Card', () => {
      expect(wrapper.find('Card').hasClass('affiliate-content')).toEqual(false);
    });

    it('does not render a SponsorPromotion component', () => {
      expect(wrapper.find('SponsorPromotion')).toHaveLength(0);
    });
  });

  describe('with an affiliateLogo', () => {
    const wrapper = shallow(
      <DefaultTemplate
        {...props}
        content="This is a sponsored post, so take a good look at it!"
        affiliateLogo="https://vignette.wikia.nocookie.net/pokemon/images/b/b0/Team_Rocket_trio_OS.png/revision/latest?cb=20150915073657"
      />,
    );

    it('adds an "affiliate-content" class to the Card', () => {
      expect(wrapper.find('Card').hasClass('affiliate-content')).toEqual(true);
    });

    it('renders a SponsorPromotion component', () => {
      expect(wrapper.find('SponsorPromotion')).toHaveLength(1);
    });
  });
});
