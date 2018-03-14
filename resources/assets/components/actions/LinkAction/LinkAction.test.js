import React from 'react';
import { shallow } from 'enzyme';

import LinkAction from './LinkAction';

describe('LinkAction component', () => {
  const trackEventMock = jest.fn();

  // mocking the window.location.origin for the isExternal helper method called from LinkAction
  Object.defineProperty(window.location, 'origin', {
    writable: true,
    value: 'https://dosomething.org',
  });

  const props = {
    title: 'Click on this link!',
    content: 'This is a great link',
    trackEvent: trackEventMock,
    link: 'https://dosomething.org',
  };

  describe('without buttonText', () => {
    const wrapper = shallow(
      <LinkAction
        {...props}
      />,
    );

    it('renders a Card component with the link embed', () => {
      expect(wrapper.find('Card')).toHaveLength(1);
      expect(wrapper.find('Card').find('Embed')).toHaveLength(1);
    });

    it('calls the event tracker prop function when the link is clicked', () => {
      wrapper.find('.link-wrapper').simulate('click');
      expect(trackEventMock).toHaveBeenCalled();
    });
  });

  describe('with buttonText', () => {
    const wrapper = shallow(
      <LinkAction
        {...props}
        buttonText="Click this button"
      />,
    );
    it('renders a Card component with a button', () => {
      expect(wrapper.find('Card')).toHaveLength(1);
      expect(wrapper.find('Card').find('.button')).toHaveLength(1);
    });

    it('calls the event tracker prop function when the button is clicked', () => {
      wrapper.find('.button').simulate('click');
      expect(trackEventMock).toHaveBeenCalled();
    });
  });

  describe('without an affiliateLogo', () => {
    const wrapper = shallow(
      <LinkAction
        {...props}
        buttonText="Click this button"
      />,
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
      <LinkAction
        {...props}
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
