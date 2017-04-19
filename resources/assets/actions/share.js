/* global window, FB */

import {
  REQUESTED_FACEBOOK_SHARE,
  FACEBOOK_SHARE_COMPLETED,
  FACEBOOK_SHARE_CANCELLED,
  trackEvent,
} from '../actions';

// Action: present the user with the share dialog.
export function requestedFacebookShare() {
  return { type: REQUESTED_FACEBOOK_SHARE };
}

// Action: user sucessfully shared.
export function facebookShareCompleted() {
  return { type: FACEBOOK_SHARE_COMPLETED };
}

// Action: user closed the Facebook share dialog.
export function facebookShareCancelled() {
  return { type: FACEBOOK_SHARE_CANCELLED };
}

// Action: user clicked a share button.
export function clickedShare(metadata) {
  return (dispatch, getState) => {
    dispatch(requestedFacebookShare());

    const href = window.location.href;
    const quote = getState().share.quote || '';

    FB.ui({
      method: 'share',
      href,
      quote,
    }, (response) => {
      if (response) {
        dispatch(facebookShareCompleted());
        dispatch(trackEvent('facebook share completed', metadata));
      } else {
        dispatch(facebookShareCancelled());
        dispatch(trackEvent('facebook share cancelled', metadata));
      }
    });
  };
}
