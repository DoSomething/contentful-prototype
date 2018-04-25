import React from 'react';
import { shallow } from 'enzyme';

import ShareAction from './ShareAction';
import setFBshare from '../../../__mocks__/facebookShareMock';
import { trackPuckEvent as trackEventMock } from '../../../helpers/analytics';

jest.mock('../../../helpers/analytics');
jest.useFakeTimers();

describe('ShareAction component', () => {
  const url = 'https://dosomething.org';
  const trackingData = { url };

  const getShallow = socialPlatform =>
    shallow(
      <ShareAction
        title="Click on this link!"
        content="This is a great link"
        socialPlatform={socialPlatform}
        link={url}
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
    expect(wrapper.find('Button').prop('text')).toEqual('Share on Facebook');

    wrapper = getShallow('twitter');

    expect(wrapper.find('Button').prop('text')).toEqual('Share on Twitter');
  });

  describe('Clicking the Social Share Button for a Facebook share', () => {
    beforeEach(() => {
      wrapper = getShallow('facebook');
    });

    it('calls the FB ui method to trigger the facebook share', () => {
      setFBshare(true);

      wrapper.find('Button').simulate('click');

      expect(global.FB.ui).toHaveBeenCalled();
    });

    it('tracks clicked share action event', () => {
      setFBshare(true);

      wrapper.find('Button').simulate('click');

      expect(trackEventMock.mock.calls.length).toBeGreaterThan(0);

      expect(trackEventMock.mock.calls[0]).toEqual([
        'clicked facebook share action',
        trackingData,
      ]);
    });

    it('displays the affirmation modal when social share is successful', done => {
      setFBshare(true);

      wrapper.find('Button').simulate('click');

      // Wait for `showFacebookShareDialog` promise to resolve.
      setImmediate(() => {
        expect(wrapper.update().find('Modal')).toHaveLength(1);

        done();
      });
    });
  });

  describe('Clicking the Social Share Button for a Twitter share', () => {
    beforeEach(() => {
      wrapper = getShallow('twitter');
    });

    // Mock the `open` function to test that we're opening the twitter intent window,
    // and showing an affirmation once it's closed.
    // (hence the mock return value to indicate closed status).
    global.open = jest.fn().mockReturnValue({ closed: true });

    it('opens a new window with the proper Twitter intent URL', () => {
      wrapper.find('Button').simulate('click');

      expect(global.open).toHaveBeenCalled();
      expect(global.open.mock.calls[0][0]).toEqual(
        `https://twitter.com/intent/tweet?url=${url}&text=`,
      );
    });

    it('tracks clicked share action event', () => {
      wrapper.find('Button').simulate('click');

      expect(trackEventMock.mock.calls.length).toBeGreaterThan(0);

      expect(trackEventMock.mock.calls[0]).toEqual([
        'clicked twitter share action',
        trackingData,
      ]);
    });

    it('displays the affirmation modal when social share is successful', () => {
      wrapper.find('Button').simulate('click');

      // We check if the share dialog has been closed every 1s,
      // so let's "wait" until the first tick of that check.
      jest.advanceTimersByTime(1000);

      // Wait for our mock-closed window to run the `setState` callback,
      // and then check that we're displaying a <Modal> affirmation.
      expect(wrapper.update().find('Modal')).toHaveLength(1);
    });
  });
});
