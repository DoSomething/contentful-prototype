import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import LinkAction from './LinkAction';

describe('LinkAction component', () => {
  const trackEventMock = jest.fn();

  describe('without an affiliateLogo', () => {
    const wrapper = shallow(
      <LinkAction
        title="Click on this link!"
        content="This is a great link"
        trackEvent={trackEventMock}
        link="https://dosomething.org"
      />,
    );

    it('renders a Card component', () => {
      expect(wrapper.find('Card')).toHaveLength(1);
      expect(wrapper.find('Card').find('Embed')).toHaveLength(1);
    });

    it('calls the event tracker prop function when the link is clicked', () => {
      wrapper.find('.link-wrapper').simulate('click');
      expect(trackEventMock).toHaveBeenCalled();
    });

    it('does not add an "affiliate-content" class to the Card', () => {
      expect(wrapper.find('Card').hasClass('affiliate-content')).toEqual(false);
    });

    it('renders a SponsorPromotion component', () => {
      expect(wrapper.find('SponsorPromotion')).toHaveLength(0);
    });
  });

  describe('with an affiliateLogo', () => {
    const wrapper = shallow(
      <LinkAction
        title="Click on this link!"
        content="This is a great link"
        trackEvent={trackEventMock}
        link="https://dosomething.org"
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
