/* global jsdom */

import React from 'react';
import { shallow } from 'enzyme';

import LinkAction from './LinkAction';
import { trackPuckEvent as trackEventMock } from '../../../helpers/analytics';

jest.mock('../../../helpers/analytics');

describe('LinkAction component', () => {
  // mocking the window.location.origin for the isExternal helper method called from LinkAction
  jsdom.reconfigure({
    url: 'https://dosomething.org',
  });

  const props = {
    title: 'Click on this link!',
    content: 'This is a great link',
    link: 'https://dosomething.org',
  };

  describe('without buttonText', () => {
    const wrapper = shallow(<LinkAction {...props} />);

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
      <LinkAction {...props} buttonText="Click this button" />,
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

  describe('without an affiliateLogo', () => {
    const wrapper = shallow(
      <LinkAction {...props} buttonText="Click this button" />,
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
