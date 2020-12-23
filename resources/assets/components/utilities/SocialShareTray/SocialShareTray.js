/* global window */

import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ShareButton from './ShareButton';
import emailIcon from './emailIcon.svg';
import twitterIcon from './twitterIcon.svg';
import facebookIcon from './facebookIcon.svg';
import snapchatIcon from './snapchatIcon.svg';
import messengerIcon from './messengerIcon.svg';
import { loadFacebookSDK } from '../../../helpers/facebook';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import {
  loadSnapchatSDK,
  handleTwitterShareClick,
  showFacebookShareDialog,
  showFacebookSendDialog,
  facebookMessengerShare,
  getFormattedScreenSize,
  handleSnapchatShareClick,
} from '../../../helpers';

class SocialShareTray extends React.Component {
  componentDidMount() {
    loadFacebookSDK();
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
    const { className, shareLink, platforms, title } = this.props;
    const trackLink = this.props.trackLink || this.props.shareLink;

    return (
      <div
        className={classnames('p-3', className)}
        data-testid="social-share-tray"
      >
        {title ? (
          <p
            data-testid="social-share-tray-title"
            className="title uppercase font-bold"
          >
            {title}
          </p>
        ) : null}

        <div>
          {platforms.includes('facebook') ? (
            <ShareButton
              className="facebook bg-facebook-500 hover:bg-facebook-400"
              onClick={() =>
                this.handleFacebookShareClick(shareLink, trackLink)
              }
              disabled={!shareLink}
              iconAlt="Facebook icon"
              iconSrc={facebookIcon}
            />
          ) : null}

          {platforms.includes('snapchat') ? (
            <Media query="(max-width: 759px)">
              <ShareButton
                className="snapchat-share-button snapchat bg-snapchat-400 hover:bg-yellow-300 text-black"
                onClick={() =>
                  handleSnapchatShareClick(shareLink, { url: trackLink })
                }
                dataShareUrl={shareLink}
                disabled={!shareLink}
                iconAlt="Snapchat icon"
                iconSrc={snapchatIcon}
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
              iconAlt="Twitter icon"
              iconSrc={twitterIcon}
            />
          ) : null}

          {platforms.includes('messenger') ? (
            <ShareButton
              className="messenger bg-messenger-500 hover:bg-messenger-400"
              disabled={!shareLink}
              iconAlt="Messenger icon"
              iconSrc={messengerIcon}
              onClick={() =>
                this.handleFacebookMessengerClick(shareLink, trackLink)
              }
            />
          ) : null}

          {platforms.includes('email') ? (
            <ShareButton
              className="email bg-blue-500 hover:bg-blue-400"
              disabled={!shareLink}
              iconAlt="Email icon"
              iconSrc={emailIcon}
              onClick={() => this.handleEmailShareClick(shareLink, trackLink)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

SocialShareTray.propTypes = {
  className: PropTypes.string,
  shareLink: PropTypes.string,
  trackLink: PropTypes.string,
  platforms: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

SocialShareTray.defaultProps = {
  className: null,
  shareLink: null,
  trackLink: null,
  platforms: ['facebook', 'snapchat', 'twitter', 'messenger', 'email'],
  title: null,
};

export default SocialShareTray;
