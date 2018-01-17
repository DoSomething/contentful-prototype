/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import { showFacebookSharePrompt } from '../../helpers';
import './share-action.scss';

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
    <div className="share-action margin-horizontal-md margin-bottom-lg">
      <ul>
        <li><a role="button" tabIndex="0" onClick={onFacebookClick}>share this</a></li>
        <li><a role="button" tabIndex="0" onClick={onFacebookClick}>hi luke</a></li>
        <li><a role="button" tabIndex="0" onClick={onFacebookClick}>luke hows your essay going</a></li>
        <li><a role="button" tabIndex="0" onClick={onFacebookClick}>should we include a link to share your essay</a></li>
      </ul>
    </div>
  );
};

ShareAction.propTypes = {
  trackEvent: PropTypes.func.isRequired,
};

export default ShareAction;
