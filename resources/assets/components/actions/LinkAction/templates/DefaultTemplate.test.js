/* global jsdom */

import React from 'react';
import { shallow } from 'enzyme';

import DefaultTemplate from './DefaultTemplate';
import { trackAnalyticsEvent as trackEventMock } from '../../../../helpers/analytics';

jest.mock('../../../../helpers/analytics');

describe('DefaultTemplate component', () => {
  // mocking the window.location.origin for the isExternal helper method called from DefaultTemplate
  jsdom.reconfigure({
    url: 'https://dosomething.org',
  });

  const props = {
    id: '1234567890',
    title: 'Click on this link!',
    link: 'https://dosomething.org',
    createdAt: '2020-10-20T20:34:27.427Z',
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
      expect(wrapper.find('Card').find('PrimaryButton')).toHaveLength(1);
    });

    it('calls the event tracker prop function when the button is clicked', () => {
      wrapper.find('PrimaryButton').simulate('click');
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
      const button = wrapper.find('PrimaryButton');

      expect(button).toHaveLength(1);
      expect(
        button
          .dive()
          .dive()
          .text(),
      ).toEqual('Do it!');
    });
  });

  describe('without an affiliateLogo', () => {
    const wrapper = shallow(
      <DefaultTemplate {...props} content="Look here!" />,
    );

    it('does not render a AffiliatePromotion component', () => {
      expect(wrapper.find('AffiliatePromotion')).toHaveLength(0);
    });
  });

  describe('with an affiliateLogo', () => {
    const wrapper = shallow(
      <DefaultTemplate
        {...props}
        content="This is a sponsored post, so take a good look at it!"
        affiliateLogo={{
          url:
            'https://vignette.wikia.nocookie.net/pokemon/images/b/b0/Team_Rocket_trio_OS.png/revision/latest?cb=20150915073657',
        }}
      />,
    );

    it('renders a AffiliatePromotion component', () => {
      expect(wrapper.find('AffiliatePromotion')).toHaveLength(1);
    });
  });

  describe('new link actions', () => {
    const wrapper = shallow(
      <DefaultTemplate {...props} createdAt="2021-01-25T20:34:27.427Z" />,
    );

    it('renders a Card component with a button even if the content is not populated', () => {
      expect(wrapper.find('Card')).toHaveLength(1);
      expect(wrapper.find('Card').find('PrimaryButton')).toHaveLength(1);
    });
  });
});
