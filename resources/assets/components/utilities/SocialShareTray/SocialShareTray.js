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

  /**
   * Component helper method for tracking analytics events.
   *
   * @param  {String} service
   * @param  {String} noun
   * @param  {String} target
   * @param  {String} verb
   * @param  {Object} data
   * @return {Void}
   */
  trackEvent = (service, noun, target, verb, data = {}) => {
    trackAnalyticsEvent({
      context: { ...data },
      metadata: {
        adjective: service,
        category: 'social_share',
        label: service,
        noun,
        target,
        verb,
      },
    });
  };

  handleFacebookShareClick = (shareLink, trackLink) => {
    this.trackEvent('facebook', 'share', 'button', 'clicked', {
      url: trackLink,
    });

    showFacebookShareDialog(shareLink)
      .then(() => {
        this.trackEvent('facebook', 'share', 'action', 'completed', {
          url: trackLink,
        });
      })
      .catch(() => {
        this.trackEvent('facebook', 'share', 'action', 'cancelled', {
          url: trackLink,
        });
      });
  };

  handleFacebookMessengerClick = (shareLink, trackLink) => {
    this.trackEvent('facebook_messenger', 'share', 'button', 'clicked', {
      url: trackLink,
    });

    if (getFormattedScreenSize() === 'large') {
      // Show Send Dialog for Desktop clients.
      showFacebookSendDialog(shareLink)
        .then(() => {
          this.trackEvent(
            'facebook_messenger',
            'share',
            'action',
            'completed',
            {
              url: trackLink,
            },
          );
        })
        .catch(() => {
          this.trackEvent(
            'facebook_messenger',
            'share',
            'action',
            'cancelled',
            {
              url: trackLink,
            },
          );
        });
    } else {
      // Redirect mobile / tablet clients to the Messenger app.
      facebookMessengerShare(shareLink)
        .then(() => {
          this.trackEvent(
            'facebook_messenger_app',
            'redirect',
            'redirect',
            'successful',
            { url: trackLink },
          );
        })
        .catch(() => {
          this.trackEvent(
            'facebook_messenger_app',
            'redirect',
            'redirect',
            'failed',
            { url: trackLink },
          );
        });
    }
  };

  handleEmailShareClick = (shareLink, trackLink) => {
    this.trackEvent('email', 'share', 'button', 'clicked', { url: trackLink });

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
  platforms: ['facebook', 'twitter', 'messenger', 'email'],
  title: null,
  responsive: false,
};

export default SocialShareTray;
