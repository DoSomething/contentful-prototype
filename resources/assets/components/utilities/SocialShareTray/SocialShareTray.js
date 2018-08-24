/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import ShareButton from './ShareButton';
import emailIcon from './emailIcon.svg';
import twitterIcon from './twitterIcon.svg';
import facebookIcon from './facebookIcon.svg';
import messengerIcon from './messengerIcon.svg';
import { trackPuckEvent } from '../../../helpers/analytics';
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
    const trackingData = { url: trackLink };

    trackPuckEvent('clicked facebook share action', trackingData);

    showFacebookShareDialog(shareLink)
      .then(() => {
        trackPuckEvent('share action completed', trackingData);
      })
      .catch(() => {
        trackPuckEvent('share action cancelled', trackingData);
      });
  };

  handleFacebookMessengerClick = (shareLink, trackLink) => {
    const trackingData = { url: trackLink };

    trackPuckEvent(
      'phoenix_clicked_share_facebook_messenger_action',
      trackingData,
    );

    if (getFormattedScreenSize() === 'large') {
      // Show Send Dialog for Desktop clients.
      showFacebookSendDialog(shareLink)
        .then(() => {
          trackPuckEvent(
            'phoenix_completed_share_facebook_messenger_action',
            trackingData,
          );
        })
        .catch(() => {
          trackPuckEvent(
            'phoenix_cancelled_share_facebook_messenger_action',
            trackingData,
          );
        });
    } else {
      // Redirect mobile / tablet clients to the Messenger app.
      facebookMessengerShare(shareLink)
        .then(() => {
          trackPuckEvent(
            'phoenix_redirected_facebook_messenger_app_share',
            trackingData,
          );
        })
        .catch(() => {
          trackPuckEvent(
            'phoenix_failed_facebook_messenger_app_share',
            trackingData,
          );
        });
    }
  };

  handleEmailShareClick = shareLink =>
    window.open(`mailto:?body=${encodeURIComponent(shareLink)}`);

  render() {
    const { shareLink } = this.props;
    const trackLink = this.props.trackLink || this.props.shareLink;

    return (
      <div className="social-share-tray padded text-centered">
        <p className="title caps-lock font-bold">Share on Social Media</p>

        <div className="share-buttons">
          <ShareButton
            className="facebook"
            onClick={() => this.handleFacebookShareClick(shareLink, trackLink)}
            disabled={!shareLink}
            icon={facebookIcon}
            text="Share"
          />

          <ShareButton
            className="twitter"
            onClick={() =>
              handleTwitterShareClick(shareLink, { url: trackLink })
            }
            disabled={!shareLink}
            icon={twitterIcon}
            text="Tweet"
          />

          <ShareButton
            className="messenger"
            disabled={!shareLink}
            icon={messengerIcon}
            text="Send"
            onClick={() =>
              this.handleFacebookMessengerClick(shareLink, trackLink)
            }
          />

          <ShareButton
            className="email"
            disabled={!shareLink}
            icon={emailIcon}
            text="Email"
            onClick={() => this.handleEmailShareClick(shareLink)}
          />
        </div>
      </div>
    );
  }
}

SocialShareTray.propTypes = {
  shareLink: PropTypes.string,
  trackLink: PropTypes.string,
};

SocialShareTray.defaultProps = {
  shareLink: null,
  trackLink: null,
};

export default SocialShareTray;
