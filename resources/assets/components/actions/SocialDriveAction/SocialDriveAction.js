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

const SocialDriveAction = ({ link, userId }) => {
  const href = dynamicString(link, { userId });

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
            className="text-field link"
            value={href}
          />
          <button className="text-field link-copy-button">
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

      <div className="padding-horizontal-md">
        <hr className="border" />
      </div>

      <div className="link-info padding-horizontal-md">
        <p className="info__title">What happens next?</p>

        <p className="info__text">
          As you share your voter registration page, we&#39;ll keep track of how
          many people you bring in. Check back often and try to get as many
          views as possible!
        </p>
      </div>

      <div className="padded page-views">
        <span className="page-views__text caps-lock">total page views</span>
        <h1 className="page-views__amount">5</h1>
      </div>
    </Card>
  );
};

SocialDriveAction.propTypes = {
  link: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SocialDriveAction;
