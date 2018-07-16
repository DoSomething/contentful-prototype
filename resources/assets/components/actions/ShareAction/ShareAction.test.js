import React from 'react';
import { shallow } from 'enzyme';

import ShareAction from './ShareAction';
import setFBshare from '../../../__mocks__/facebookShareMock';
import { trackPuckEvent as trackEventMock } from '../../../helpers/analytics';

jest.mock('./ShareActionContainer', () => 'ShareActionContainer');

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
        campaignRunId="1234"
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
    expect(
      wrapper
        .find('Button')
        .dive()
        .text(),
    ).toEqual('Share on Facebook');

    wrapper = getShallow('twitter');

    expect(
      wrapper
        .find('Button')
        .dive()
        .text(),
    ).toEqual('Share on Twitter');
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

    it('opens a new window with the proper Twitter intent URL', () => {
      wrapper.find('Button').simulate('click');

      expect(global.open).toHaveBeenCalled();

      const intentUrl = String(global.open.mock.calls[0][0]);
      expect(intentUrl).toEqual(
        'https://twitter.com/intent/tweet?text=&url=https%3A%2F%2Fdosomething.org',
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
