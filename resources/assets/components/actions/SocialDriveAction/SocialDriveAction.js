/* global document */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import linkIcon from './linkIcon.svg';
import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import { postRequest } from '../../../helpers/api';
import { trackPuckEvent } from '../../../helpers/analytics';
import {
  dynamicString,
  handleTwitterShareClick,
  loadFacebookSDK,
  showFacebookShareDialog,
  withoutTokens,
} from '../../../helpers';

import './social-drive.scss';

class SocialDriveAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shortenedLink: null,
    };

    this.linkInput = React.createRef();
  }

  componentDidMount() {
    loadFacebookSDK();

    const { userId, token } = this.props;

    const href = dynamicString(this.props.link, { userId });

    postRequest('api/v2/links', { url: withoutTokens(href) }, token).then(
      response => this.setState({ shortenedLink: response.url }),
    );
  }

  handleCopyLinkClick = () => {
    this.linkInput.current.select();
    document.execCommand('copy');
  };

  handleFacebookShareClick = url => {
    trackPuckEvent('clicked facebook share action', { url });

    showFacebookShareDialog(url)
      .then(() => {
        trackPuckEvent('share action completed', { url });
      })
      .catch(() => {
        trackPuckEvent('share action cancelled', { url });
      });
  };

  render() {
    const { link, showPageViews } = this.props;
    const shortenedLink = this.state.shortenedLink;

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
              ref={this.linkInput}
              className="text-field link"
              value={shortenedLink || 'Loading...'}
              disabled={!shortenedLink}
            />
            <button
              className="text-field link-copy-button"
              onClick={this.handleCopyLinkClick}
              disabled={!shortenedLink}
            >
              <img src={linkIcon} alt="link" />
              <p>Copy link</p>
            </button>
          </div>
        </div>

        <div className="share-buttons">
          <div className="share-button padded">
            <button
              className={classnames('button padding-vertical-md', {
                'bg-dark-blue': shortenedLink,
              })}
              onClick={() => this.handleFacebookShareClick(shortenedLink)}
              disabled={!shortenedLink}
            >
              <i className="social-icon -facebook" />
              Share on Facebook
            </button>
          </div>

          <div className="share-button padded">
            <button
              className="button padding-vertical-md"
              onClick={() => handleTwitterShareClick(shortenedLink)}
              disabled={!shortenedLink}
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
                As you share your voter registration page, we&#39;ll keep track
                of how many people you bring in. Check back often and try to get
                as many views as possible!
              </p>
            </div>

            <div className="padded page-views">
              <span className="page-views__text caps-lock">
                total page views
              </span>
              <h1 className="page-views__amount">5</h1>
            </div>
          </div>
        ) : null}
      </Card>
    );
  }
}

SocialDriveAction.propTypes = {
  link: PropTypes.string.isRequired,
  showPageViews: PropTypes.bool,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

SocialDriveAction.defaultProps = {
  showPageViews: false,
};

export default SocialDriveAction;
