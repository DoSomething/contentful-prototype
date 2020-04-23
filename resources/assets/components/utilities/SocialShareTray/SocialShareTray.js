/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Media from 'react-media';

import ShareButton from './ShareButton';
import emailIcon from './emailIcon.svg';
import twitterIcon from './twitterIcon.svg';
import facebookIcon from './facebookIcon.svg';
import messengerIcon from './messengerIcon.svg';
import snapchatIcon from './snapchatIcon.svg';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import {
  loadFacebookSDK,
  loadSnapchatSDK,
  handleTwitterShareClick,
  showFacebookShareDialog,
  showFacebookSendDialog,
  facebookMessengerShare,
  getFormattedScreenSize,
  handleSnapchatShareClick,
  featureFlag,
} from '../../../helpers';

import './social-share-tray.scss';

class SocialShareTray extends React.Component {
  componentDidMount() {
    loadFacebookSDK();
  }

  /**
   * Check to see if the sharedLink is present within
   * a bertly link. This is done because the snapchatSDK needs a link to provide to the user that opened the link
   * if no link is provided it will pass the current page URL as our attachmenturl
   */

  componentDidUpdate(prevProps) {
    if (!prevProps.shareLink && this.props.shareLink) {
      loadSnapchatSDK();
    }
  }

  /**
   * Once snapchat loads the SDK it will search the DOM for a snapchat-share-button class
   * once this is found it will check for the attribute called data-share-url.
   * If the sharedLink URL isn't provided it be assigned a empty.
   */

  componentDidUpdate(prevProps) {
    if (!prevProps.shareLink && this.props.shareLink) {
      loadSnapchatSDK();
    }
  }

  handleFacebookShareClick = (shareLink, trackLink) => {
    trackAnalyticsEvent('clicked_share_facebook', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.socialShare,
      label: 'facebook',
      context: { url: trackLink },
    });

    showFacebookShareDialog(shareLink)
      .then(() => {
        trackAnalyticsEvent('completed_share_facebook', {
          action: 'action_completed',
          category: EVENT_CATEGORIES.socialShare,
          label: 'facebook',
          context: {
            url: trackLink,
          },
        });
      })
      .catch(() => {
        trackAnalyticsEvent('cancelled_share_facebook', {
          action: 'action_cancelled',
          category: EVENT_CATEGORIES.socialShare,
          label: 'facebook',
          context: {
            url: trackLink,
          },
        });
      });
  };

  handleFacebookMessengerClick = (shareLink, trackLink) => {
    trackAnalyticsEvent('clicked_share_facebook_messenger', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.socialShare,
      label: 'facebook_messenger',
      context: { url: trackLink },
    });

    if (getFormattedScreenSize() === 'large') {
      // Show Send Dialog for Desktop clients.
      showFacebookSendDialog(shareLink)
        .then(() => {
          trackAnalyticsEvent('completed_share_facebook_messenger', {
            action: 'action_completed',
            category: EVENT_CATEGORIES.socialShare,
            label: 'facebook_messenger',
            context: { url: trackLink },
          });
        })
        .catch(() => {
          trackAnalyticsEvent('cancelled_share_facebook_messenger', {
            action: 'action_cancelled',
            category: EVENT_CATEGORIES.socialShare,
            label: 'facebook_messenger',
            context: { url: trackLink },
          });
        });
    } else {
      // Redirect mobile / tablet clients to the Messenger app.
      facebookMessengerShare(shareLink)
        .then(() => {
          trackAnalyticsEvent('successful_redirect_facebook_messenger_app', {
            action: 'redirect_successful',
            category: EVENT_CATEGORIES.socialShare,
            label: 'facebook_messenger_app',
            context: { url: trackLink },
          });
        })
        .catch(() => {
          trackAnalyticsEvent('failed_redirect_facebook_messenger_app', {
            action: 'redirect_failed',
            category: EVENT_CATEGORIES.socialShare,
            label: 'facebook_messenger_app',
            context: { url: trackLink },
          });
        });
    }
  };

  handleEmailShareClick = (shareLink, trackLink) => {
    trackAnalyticsEvent('clicked_share_email', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.socialShare,
      label: 'email',
      context: { url: trackLink },
    });

    window.location = `mailto:?body=${encodeURIComponent(shareLink)}`;
  };

  render() {
    const { shareLink, platforms, responsive, title } = this.props;

    const trackLink = this.props.trackLink || this.props.shareLink;
    return (
      <div className="social-share-tray p-3 text-center">
        {title ? <p className="title uppercase font-bold">{title}</p> : null}

        <div className={classNames('share-buttons', { responsive })}>
          {platforms.includes('facebook') ? (
            <ShareButton
              className="facebook bg-facebook-500 hover:bg-facebook-400"
              onClick={() =>
                this.handleFacebookShareClick(shareLink, trackLink)
              }
              disabled={!shareLink}
              icon={facebookIcon}
              text="Share"
            />
          ) : null}
          {featureFlag('snapchat_button') && platforms.includes('snapchat') ? (
            <Media query="(max-width: 759px)">
              <ShareButton
                className="snapchat-share-button snapchat bg-snapchat-400 hover:bg-yellow-300 text-black"
                onClick={() =>
                  handleSnapchatShareClick(shareLink, { url: trackLink })
                }
                dataShareUrl={shareLink}
                disabled={!shareLink}
                icon={snapchatIcon}
                text="Share"
              />
            </Media>
          ) : null}

          {platforms.includes('twitter') ? (
            <ShareButton
              className="twitter bg-twitter-500 hover:bg-twitter-400"
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
              className="messenger bg-messenger-500 hover:bg-messenger-400"
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
              className="email bg-blue-500 hover:bg-blue-400"
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
  platforms: ['facebook', 'snapchat', 'twitter', 'messenger', 'email'],
  title: null,
  responsive: false,
};

export default SocialShareTray;
