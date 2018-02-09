import React from 'react';
import { shallow } from 'enzyme';

import ShareAction from './ShareAction';
import setFBshare from '../../__mocks__/facebookShareMock.js'

describe('ShareAction component', () => {

  const url = 'https://dosomething.org';
  const trackingData = { url };

  let trackEventMock = jest.fn();
  let openModalMock  = jest.fn();

  const getShallow = () => shallow(
    <ShareAction
      title="Click on this link!"
      content="This is a great link"
      trackEvent={trackEventMock}
      openModal={openModalMock}
      link={url}
    />,
  );

  it('renders a Card component', () => {
    const wrapper = getShallow();

    expect(wrapper.find('Card')).toHaveLength(1);
    expect(wrapper.find('Card').find('Embed')).toHaveLength(1);
  });

  it('renders a Facebook Share button', () => {
    const wrapper = getShallow();

    expect(wrapper.find('button').text()).toEqual('Share on Facebook');
  });

  describe('Clicking the Social Share Button', () => {
    beforeEach(() => {
      trackEventMock = jest.fn();
      openModalMock = jest.fn();
    });

    it('tracks clicked share action event', () => {
      const wrapper = getShallow();

      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(trackEventMock.mock.calls.length).toBeGreaterThan(0);

      expect(trackEventMock.mock.calls[0]).toEqual(['clicked share action', trackingData]);
      expect(trackEventMock.mock.calls[1]).toEqual(['share action completed', trackingData]);
    });

    it('tracks completed share action event when social share is successful', () => {
      const wrapper = getShallow();

      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(trackEventMock).toHaveBeenCalledTimes(2);
      expect(trackEventMock.mock.calls[0]).toEqual(['clicked share action', trackingData]);
    });

    it('displays the affirmation modal when social share is successful', () => {
      const wrapper = getShallow();

      setFBshare(true);

      wrapper.find('button').simulate('click');

      expect(openModalMock).toHaveBeenCalledTimes(1);
    });

    it('tracks completed share action event when social share is cancelled', () => {
      const wrapper = getShallow();

      setFBshare(false);

      wrapper.find('button').simulate('click');

      expect(trackEventMock).toHaveBeenCalledTimes(2);
      expect(trackEventMock.mock.calls[1]).toEqual(['share action cancelled', trackingData]);
    });
  })
});
