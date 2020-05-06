/* global document */

import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import linkIcon from './linkIcon.svg';
import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import { postRequest } from '../../../helpers/api';
import TotalAcceptedQuantity from './TotalAcceptedQuantity';
import { dynamicString, withoutTokens } from '../../../helpers';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './social-drive.scss';

export const SocialDriveBlockFragment = gql`
  fragment SocialDriveBlockFragment on SocialDriveBlock {
    link
  }
`;

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
      .then(({ url }) => this.setState({ shortenedLink: url }))
      .catch(() => this.setState({ shortenedLink: href }));
  }

  handleCopyLinkClick = () => {
    this.linkInput.current.select();

    document.execCommand('copy');

    trackAnalyticsEvent('clicked_copy_to_clipboard', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'copy_to_clipboard',
      context: {
        campaignId: this.props.campaignId,
        pageId: this.props.pageId,
        url: this.props.link,
      },
    });
  };

  render() {
    const {
      actionId,
      link,
      fullWidth,
      shareCardDescription,
      shareCardTitle,
      userId,
    } = this.props;

    const { shortenedLink } = this.state;

    return (
      <div
        className={classNames('clearfix pb-6', {
          'lg:flex': actionId != null,
        })}
      >
        <div
          className={classNames('social-drive-action', {
            'lg:w-2/3 lg:pr-3': !fullWidth,
          })}
        >
          <Card title={shareCardTitle} className="rounded bordered">
            {shareCardDescription ? (
              <div className="p-3">
                <p>{shareCardDescription}</p>
              </div>
            ) : null}

            <div className="p-3">
              <Embed url={link} />
            </div>

            <div className="p-3 link-area">
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

        {actionId ? (
          <TotalAcceptedQuantity userId={userId} actionId={actionId} />
        ) : null}
      </div>
    );
  }
}

SocialDriveAction.propTypes = {
  actionId: PropTypes.number,
  campaignId: PropTypes.string,
  fullWidth: PropTypes.bool,
  link: PropTypes.string.isRequired,
  pageId: PropTypes.string,
  shareCardTitle: PropTypes.string,
  shareCardDescription: PropTypes.string,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

SocialDriveAction.defaultProps = {
  actionId: null,
  campaignId: null,
  fullWidth: false,
  shareCardDescription: null,
  shareCardTitle: 'Your Online Drive',
  pageId: null,
};

export default SocialDriveAction;
