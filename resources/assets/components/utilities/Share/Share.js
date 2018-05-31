/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  handleFacebookShareClick,
  handleTwitterShareClick,
} from '../../../helpers';

import './share.scss';

const Share = props => {
  const { className, link, parentSource, quote, variant } = props;
  const trackingData = { parentSource, variant, link, quote };

  const buttonClassName = classnames('share', className, `-${variant}`);
  const isIcon = variant === 'icon';

  return (
    <div className={classnames({ 'share-tray': isIcon })}>
      {isIcon ? (
        <button
          className={buttonClassName}
          onClick={() => handleTwitterShareClick(link, trackingData, quote)}
        >
          <i className="social-icon -twitter">
            <span>Twitter</span>
          </i>
        </button>
      ) : null}

      <button
        className={buttonClassName}
        onClick={() => handleFacebookShareClick(link, trackingData)}
      >
        {isIcon ? null : 'share on'}
        <i className="social-icon -facebook">
          <span>Facebook</span>
        </i>
      </button>
    </div>
  );
};

Share.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  parentSource: PropTypes.string,
  quote: PropTypes.string,
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
