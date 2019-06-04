/* global document */

import React from 'react';
import PropTypes from 'prop-types';

import linkIcon from './linkIcon.svg';
import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import { postRequest } from '../../../helpers/api';
import { trackAnalyticsEvent } from '../../../helpers/analytics';
import { dynamicString, withoutTokens } from '../../../helpers';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';

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
    const { userId, token } = this.props;

    const href = dynamicString(this.props.link, { userId });

    postRequest('/api/v2/links', { url: withoutTokens(href) }, token)
      .then(({ url, count }) => this.setState({ shortenedLink: url, count }))
      .catch(() => this.setState({ shortenedLink: href, count: 'N/A' }));
  }

  handleCopyLinkClick = () => {
    this.linkInput.current.select();

    document.execCommand('copy');

    trackAnalyticsEvent({
      context: { url: this.props.link },
      metadata: {
        category: 'campaign_action',
        noun: 'copy_to_clipboard',
        target: 'button',
        verb: 'clicked',
      },
    });
  };

  render() {
    const { link, showPageViews } = this.props;
    const shortenedLink = this.state.shortenedLink;

    return (
      <div className="clearfix padding-bottom-lg">
        <div className="social-drive-action">
          <Card title="Your Online Drive" className="rounded bordered">
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
                  type="button"
                  className="text-field link-copy-button"
                  onClick={this.handleCopyLinkClick}
                  disabled={!shortenedLink}
                >
                  <img src={linkIcon} alt="link" />
                  <p>Copy link</p>
                </button>
              </div>
            </div>

            <SocialShareTray
              shareLink={shortenedLink}
              trackLink={link}
              title="Share on Social Media"
              responsive
            />
          </Card>
        </div>

        {showPageViews ? (
          <div className="social-drive-information">
            <Card className="bordered rounded" title="More info">
              <div className="link-info padded">
                <p className="info__title">What happens next?</p>

                <p className="info__text">
                  As you share your voter registration page, we&#39;ll keep
                  track of how many people you bring in. Check back often and
                  try to get as many views as possible!
                </p>
              </div>

              <div className="padded page-views">
                <span className="page-views__text caps-lock">
                  total page views
                </span>
                <h1 className="page-views__amount">
                  {shortenedLink ? this.state.count : '?'}
                </h1>
              </div>
            </Card>
          </div>
        ) : null}
      </div>
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
  showPageViews: true,
};

export default SocialDriveAction;
