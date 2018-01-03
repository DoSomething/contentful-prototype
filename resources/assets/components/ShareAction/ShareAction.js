/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import { showFacebookSharePrompt } from '../../helpers';

const ShareAction = (props) => {
  const { trackEvent } = props;

  const link = window.location.href;
  const trackingData = { link };

  const onFacebookClick = () => {
    trackEvent('clicked share action', trackingData);

    showFacebookSharePrompt({ href: link }, (response) => {
      if (response) {
        trackEvent('share action completed', trackingData);
      } else {
        trackEvent('share action cancelled', trackingData);
      }
    });
  };

  return (
    <button className="button" onClick={onFacebookClick}>
      complete the share action
    </button>
  );
};

ShareAction.propTypes = {
  trackEvent: PropTypes.func.isRequired,
};

export default ShareAction;
