import React from 'react';
import { shallow } from 'enzyme';

import ShareAction from './ShareAction';
import setFBshare from '../../__mocks__/facebookShareMock';

describe('ShareAction component', () => {
  const url = 'https://dosomething.org';
  const trackingData = { url };

  let trackEventMock = jest.fn();
  let openModalMock = jest.fn();

  const getShallow = (socialPlatform) => shallow(
    <ShareAction
      title="Click on this link!"
      content="This is a great link"
      trackEvent={trackEventMock}
      openModal={openModalMock}
      link={url}
      socialPlatform={socialPlatform}
    />,
  );

  // We'll declare this reference to the wrapper object, so we can more elegantly reset the
  // shallow copy of the component and test it as necessary.
  let wrapper = getShallow('facebook');

  it('renders a Card component', () => {
    expect(wrapper.find('Card')).toHaveLength(1);
    expect(wrapper.find('Card').find('Embed')).toHaveLength(1);
  });

  it('renders a proper Share button based on social platform', () => {
    expect(wrapper.find('button').text()).toEqual('Share on Facebook');

    wrapper = getShallow('twitter');

    expect(wrapper.find('button').text()).toEqual('Share on Twitter');
  });

  describe('Clicking the Social Share Button for a Facebook share', () => {
    beforeEach(() => {
      trackEventMock = jest.fn();
      openModalMock = jest.fn();
      wrapper = getShallow('facebook');
    });

    it('calls the FB ui method to trigger the facebook share', () => {
      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(global.FB.ui).toHaveBeenCalled();
    });

    it('tracks clicked share action event', () => {
      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(trackEventMock.mock.calls.length).toBeGreaterThan(0);

      expect(trackEventMock.mock.calls[0]).toEqual(['clicked facebook share action', trackingData]);
      expect(trackEventMock.mock.calls[1]).toEqual(['share action completed', trackingData]);
    });

    it('tracks completed share action event when social share is successful', () => {
      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(trackEventMock).toHaveBeenCalledTimes(2);
      expect(trackEventMock.mock.calls[0]).toEqual(['clicked facebook share action', trackingData]);
    });

    it('displays the affirmation modal when social share is successful', () => {
      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(openModalMock).toHaveBeenCalledTimes(1);
    });

    it('tracks completed share action event when social share is cancelled', () => {
      setFBshare(false);

      wrapper.find('button').simulate('click');

      expect(trackEventMock).toHaveBeenCalledTimes(2);
      expect(trackEventMock.mock.calls[1]).toEqual(['share action cancelled', trackingData]);
    });
  });

  describe('Clicking the Social Share Button for a Twitter share', () => {
    beforeEach(() => {
      trackEventMock = jest.fn();
      openModalMock = jest.fn();
      wrapper = getShallow('twitter');
    });

    it('opens a new window with the proper Twitter intent URL', () => {
      global.open = jest.fn();

      wrapper.find('button').simulate('click');

      expect(global.open).toHaveBeenCalled();
      expect(global.open.mock.calls[0][0]).toEqual(`https://twitter.com/intent/tweet?url=${url}&text=${undefined}`);
    });

    it('tracks clicked share action event', () => {
      wrapper.find('button').simulate('click');

      expect(trackEventMock.mock.calls.length).toBeGreaterThan(0);

      expect(trackEventMock.mock.calls[0]).toEqual(['clicked twitter share action', trackingData]);
    });

    // @TODO activate this test when we properly implement the post share affirmaion modal for twitter share.
    xit('displays the affirmation modal when social share is successful', () => {
      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(openModalMock).toHaveBeenCalledTimes(1);
    });
  });
});
