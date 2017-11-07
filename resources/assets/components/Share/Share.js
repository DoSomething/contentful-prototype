/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { showFacebookSharePrompt, showTwitterSharePrompt } from '../../helpers';

import './share.scss';

const Share = (props) => {
  const {
    className, link, parentSource,
    quote, trackEvent, variant,
  } = props;

  const trackingData = { parentSource, variant, link, quote };

  const onFacebookClick = () => {
    trackEvent('clicked facebook share', trackingData);

    showFacebookSharePrompt({ href: link, quote }, (response) => {
      if (response) {
        trackEvent('facebook share posted', trackingData);
      } else {
        trackEvent('facebook share cancelled', trackingData);
      }
    });
  };

  const onTwitterClick = () => {
    trackEvent('clicked twitter share', trackingData);

    showTwitterSharePrompt({ href: link, quote });
  };

  const buttonClassName = classnames(
    'button share padding-horizontal-md', className, { '-black': variant === 'black', '-icon': variant === 'icon' },
  );

  return (
    <div>
      { variant === 'icon' ? (
        <button className={buttonClassName} onClick={onTwitterClick}>
          <i className="social-icon -twitter"><span>Twitter</span></i>
        </button>) : null
      }

      <button className={buttonClassName} onClick={onFacebookClick}>
        {variant === 'icon' ? null : 'share on'}
        <i className="social-icon -facebook"><span>Facebook</span></i>
      </button>
    </div>
  );
};

Share.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  parentSource: PropTypes.string,
  quote: PropTypes.string,
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
