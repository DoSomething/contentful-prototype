/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { showFacebookSharePrompt } from '../../helpers';

import './share.scss';

const Share = (props) => {
  const {
    className, facebookShareCancelled, facebookShareCompleted,
    link, parentSource, quote, requestedFacebookShare,
    trackEvent, variant,
  } = props;

  const trackingData = { parentSource, variant, link, quote };

  const onClick = () => {
    requestedFacebookShare();
    trackEvent('clicked facebook share', trackingData);

    showFacebookSharePrompt({ link, quote }, (response) => {
      if (response) {
        facebookShareCompleted();
        trackEvent('facebook share posted', trackingData);
      } else {
        facebookShareCancelled();
        trackEvent('facebook share cancelled', trackingData);
      }
    });
  };

  return (
    <button
      className={classnames('button share', className, { '-black': variant === 'black', '-icon': variant === 'icon' })}
      onClick={onClick}
    >
      {variant === 'icon' ? null : 'share on'}
      <i className="social-icon -facebook"><span>Facebook</span></i>
    </button>
  );
};

Share.propTypes = {
  className: PropTypes.string,
  facebookShareCancelled: PropTypes.func.isRequired,
  facebookShareCompleted: PropTypes.func.isRequired,
  link: PropTypes.string,
  parentSource: PropTypes.string,
  quote: PropTypes.string,
  requestedFacebookShare: PropTypes.func.isRequired,
  trackEvent: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['black', 'blue', 'icon']),
};

Share.defaultProps = {
  className: null,
  link: window.location.href,
  quote: null,
  parentSource: null,
  variant: 'black',
};

export default Share;
