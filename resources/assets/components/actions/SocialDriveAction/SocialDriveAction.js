/* global document */

import React from 'react';
import PropTypes from 'prop-types';

import linkIcon from './linkIcon.svg';
import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import {
  dynamicString,
  handleFacebookShareClick,
  handleTwitterShareClick,
} from '../../../helpers';

import './social-drive.scss';

const SocialDriveAction = props => {
  const { link, showPageViews, userId } = props;

  const href = dynamicString(link, { userId });

  const handleCopyLinkClick = () => {
    const r = document.querySelector('#social-drive-link');
    r.select();
    document.execCommand('copy');
  };

  return (
    <Card
      title="Your Online Drive"
      className="social-drive-action rounded bordered"
    >
      <div className="padded">
        <Embed url={link} />
      </div>

      <div className="padded link-area">
        <div className="share-text">
          <p>Share your link:</p>
        </div>

        <div className="link-bar">
          <input
            readOnly
            type="text"
            id="social-drive-link"
            className="text-field link"
            value={href}
          />
          <button
            className="text-field link-copy-button"
            onClick={handleCopyLinkClick}
          >
            <img src={linkIcon} alt="link" />
            <p>Copy link</p>
          </button>
        </div>
      </div>

      <div className="share-buttons">
        <div className="share-button padded">
          <button
            className="button padding-vertical-md bg-dark-blue"
            onClick={() => handleFacebookShareClick(href)}
          >
            <i className="social-icon -facebook" />
            Share on Facebook
          </button>
        </div>

        <div className="share-button padded">
          <button
            className="button padding-vertical-md"
            onClick={() => handleTwitterShareClick(href)}
          >
            <i className="social-icon -twitter" />
            <span>Share on Twitter</span>
          </button>
        </div>
      </div>

      {showPageViews ? (
        <div>
          <div className="padding-horizontal-md">
            <hr className="border" />
          </div>

          <div className="link-info padded">
            <p className="info__title">What happens next?</p>

            <p className="info__text">
              As you share your voter registration page, we&#39;ll keep track of
              how many people you bring in. Check back often and try to get as
              many views as possible!
            </p>
          </div>

          <div className="padded page-views">
            <span className="page-views__text caps-lock">total page views</span>
            <h1 className="page-views__amount">5</h1>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

SocialDriveAction.propTypes = {
  link: PropTypes.string.isRequired,
  showPageViews: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

SocialDriveAction.defaultProps = {
  showPageViews: false,
};

export default SocialDriveAction;
