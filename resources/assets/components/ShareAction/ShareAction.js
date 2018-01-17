/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import PhotoHeader, { PhotoHeaderTitle } from '../PhotoHeader';
import Markdown from '../Markdown';
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

  // lint disable is for the Lorem ipsum, will be replaced with actual variable
  /* eslint-disable max-len */
  return (
    <div className="share-action margin-horizontal-md">
      <PhotoHeader className="margin-bottom-lg">
        <PhotoHeaderTitle primary={'Share all of your darkest secrets'} />
      </PhotoHeader>
      <Markdown className="margin-bottom-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Markdown>
      <ul className="share-action__list">
        <li><a role="button" tabIndex="0" onClick={onFacebookClick}>share this</a></li>
      </ul>
    </div>
  );
  /* eslint-enable max-len */
};

ShareAction.propTypes = {
  trackEvent: PropTypes.func.isRequired,
};

export default ShareAction;
