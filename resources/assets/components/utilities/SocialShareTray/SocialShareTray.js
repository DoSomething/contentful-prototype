/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ShareButton from './ShareButton';
import emailIcon from './emailIcon.svg';
import twitterIcon from './twitterIcon.svg';
import facebookIcon from './facebookIcon.svg';
import messengerIcon from './messengerIcon.svg';
import { trackAnalyticsEvent } from '../../../helpers/analytics';
import {
  loadFacebookSDK,
  handleTwitterShareClick,
  showFacebookShareDialog,
  showFacebookSendDialog,
  facebookMessengerShare,
  getFormattedScreenSize,
} from '../../../helpers';

import './social-share-tray.scss';

class SocialShareTray extends React.Component {
  componentDidMount() {
    loadFacebookSDK();
  }

  handleFacebookShareClick = (shareLink, trackLink) => {
    const trackingOptions = {
      noun: 'share',
      adjective: 'facebook',
      data: {
        url: trackLink,
      },
    };

    trackAnalyticsEvent({
      verb: 'clicked',
      ...trackingOptions,
    });

    showFacebookShareDialog(shareLink)
      .then(() => {
        trackAnalyticsEvent({
          verb: 'completed',
          ...trackingOptions,
        });
      })
      .catch(() => {
        trackAnalyticsEvent({
          verb: 'cancelled',
          ...trackingOptions,
        });
      });
  };

  handleFacebookMessengerClick = (shareLink, trackLink) => {
    const trackingData = { url: trackLink };
    let trackingOptions = {
      noun: 'share',
      adjective: 'facebook_messenger',
      data: trackingData,
    };

    trackAnalyticsEvent({
      verb: 'clicked',
      ...trackingOptions,
    });

    if (getFormattedScreenSize() === 'large') {
      // Show Send Dialog for Desktop clients.
      showFacebookSendDialog(shareLink)
        .then(() => {
          trackAnalyticsEvent({
            verb: 'completed',
            ...trackingOptions,
          });
        })
        .catch(() => {
          trackAnalyticsEvent({
            verb: 'cancelled',
            ...trackingOptions,
          });
        });
    } else {
      trackingOptions = {
        noun: 'redirect',
        adjective: 'facebook_messenger_app',
        data: trackingData,
      };
      // Redirect mobile / tablet clients to the Messenger app.
      facebookMessengerShare(shareLink)
        .then(() => {
          trackAnalyticsEvent({
            verb: 'successful',
            ...trackingOptions,
          });
        })
        .catch(() => {
          trackAnalyticsEvent({
            verb: 'failed',
            ...trackingOptions,
          });
        });
    }
  };

  handleEmailShareClick = (shareLink, trackLink) => {
    trackAnalyticsEvent({
      verb: 'clicked',
      noun: 'share',
      adjective: 'email',
      data: { url: trackLink },
    });
    window.location = `mailto:?body=${encodeURIComponent(shareLink)}`;
  };

  render() {
    const { shareLink, platforms, responsive, title } = this.props;
    const trackLink = this.props.trackLink || this.props.shareLink;

    return (
      <div className="social-share-tray padded text-center">
        {title ? <p className="title caps-lock font-bold">{title}</p> : null}

        <div className={classNames('share-buttons', { responsive })}>
          {platforms.includes('facebook') ? (
            <ShareButton
              className="facebook"
              onClick={() =>
                this.handleFacebookShareClick(shareLink, trackLink)
              }
              disabled={!shareLink}
              icon={facebookIcon}
              text="Share"
            />
          ) : null}

          {platforms.includes('twitter') ? (
            <ShareButton
              className="twitter"
              onClick={() =>
                handleTwitterShareClick(shareLink, { url: trackLink })
              }
              disabled={!shareLink}
              icon={twitterIcon}
              text="Tweet"
            />
          ) : null}

          {platforms.includes('messenger') ? (
            <ShareButton
              className="messenger"
              disabled={!shareLink}
              icon={messengerIcon}
              text="Send"
              onClick={() =>
                this.handleFacebookMessengerClick(shareLink, trackLink)
              }
            />
          ) : null}

          {platforms.includes('email') ? (
            <ShareButton
              className="email"
              disabled={!shareLink}
              icon={emailIcon}
              text="Email"
              onClick={() => this.handleEmailShareClick(shareLink, trackLink)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

SocialShareTray.propTypes = {
  shareLink: PropTypes.string,
  trackLink: PropTypes.string,
  platforms: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  responsive: PropTypes.bool,
};

SocialShareTray.defaultProps = {
  shareLink: null,
  trackLink: null,
  platforms: ['facebook', 'twitter', 'messenger', 'email'],
  title: null,
  responsive: false,
};

export default SocialShareTray;
