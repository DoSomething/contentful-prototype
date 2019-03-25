import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import ContentfulEntry from '../../ContentfulEntry';
import { formatFormFields } from '../../../helpers/forms';
import { trackAnalyticsEvent } from '../../../helpers/analytics';
import { SOCIAL_SHARE_TYPE } from '../../../constants/post-types';
import TextContent from '../../utilities/TextContent/TextContent';
import {
  dynamicString,
  loadFacebookSDK,
  showFacebookShareDialog,
  showTwitterSharePrompt,
  withoutNulls,
} from '../../../helpers';

class ShareAction extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    // If this is a Facebook share action, make sure we load SDK.
    if (this.props.socialPlatform === 'facebook') {
      loadFacebookSDK();
    }
  }

  storeSharePost = puckId => {
    const action = get(this.props.additionalContent, 'action', 'default');

    const { actionId, campaignContentfulId, campaignId, link } = this.props;

    const formFields = withoutNulls({
      action,
      type: SOCIAL_SHARE_TYPE,
      id: campaignContentfulId,
      action_id: actionId,
      details: {
        url: link,
        platform: 'facebook',
        campaign_id: campaignId,
        puck_id: puckId,
      },
    });

    // Send request to store the social share post.
    this.props.storeCampaignPost(campaignId, {
      action,
      actionId,
      campaignContentfulId,
      body: formatFormFields(formFields),
      id: this.props.id,
      type: SOCIAL_SHARE_TYPE,
    });
  };

  handleFacebookClick = url => {
    const { link, userId } = this.props;

    const trackingData = { url: link };
    let trackingOptions = {
      noun: 'share_action',
      adjective: 'facebook',
      data: trackingData,
    };

    trackAnalyticsEvent({
      verb: 'clicked',
      ...trackingOptions,
    });

    showFacebookShareDialog(url)
      .then(() => {
        // Send share post to Rogue for authenticated users
        if (this.props.isAuthenticated && this.props.campaignId) {
          const puckId = `phoenix_${userId}_${Date.now()}`;
          trackingOptions = {
            ...trackingOptions,
            data: { ...trackingData, puck_id: puckId },
          };
          this.storeSharePost(puckId);
        }

        trackAnalyticsEvent({
          verb: 'completed',
          ...trackingOptions,
        });
        this.setState({ showModal: true });
      })
      .catch(() => {
        trackAnalyticsEvent({
          verb: 'cancelled',
          ...trackingOptions,
        });
      });
  };

  handleTwitterClick = url => {
    trackAnalyticsEvent({
      verb: 'clicked',
      noun: 'share_action',
      adjective: 'twitter',
      data: { url: this.props.link },
    });
    showTwitterSharePrompt(url, '', () => this.setState({ showModal: true }));
  };

  render() {
    const {
      id,
      affirmation, // @TODO: Rename me to 'affirmationText'?
      affirmationBlock,
      content,
      hideEmbed,
      campaignId,
      link,
      socialPlatform,
      title,
      userId,
    } = this.props;

    const isFacebook = socialPlatform === 'facebook';
    const handleShareClick = isFacebook
      ? this.handleFacebookClick
      : this.handleTwitterClick;

    const href = dynamicString(link, {
      userId,
      northstarId: userId, // @TODO: Remove!
      campaignId,
      campaignRunId: 0,
      source: 'web',
    });

    return (
      <React.Fragment>
        <div className="share-action margin-bottom-lg margin-horizontal-md">
          <PuckWaypoint
            name="share_action-top"
            waypointData={{ contentfulId: id }}
          />
          <Card title={title} className="rounded bordered">
            {content ? (
              <TextContent className="padded">{content}</TextContent>
            ) : null}
            {hideEmbed ? null : (
              <div className="padded">
                <Embed url={link} />
              </div>
            )}
            <Button attached onClick={() => handleShareClick(href)}>
              Share on {isFacebook ? 'Facebook' : 'Twitter'}
            </Button>
          </Card>
          <PuckWaypoint
            name="share_action-bottom"
            waypointData={{ contentfulId: id }}
          />
        </div>
        {this.state.showModal ? (
          <Modal onClose={() => this.setState({ showModal: false })}>
            {affirmationBlock ? (
              <ContentfulEntry json={affirmationBlock} />
            ) : (
              <Card
                title="Thanks for sharing!"
                className="modal__slide bordered rounded"
              >
                <TextContent className="padded">{affirmation}</TextContent>
              </Card>
            )}
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

ShareAction.propTypes = {
  actionId: PropTypes.number,
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  affirmation: PropTypes.string,
  affirmationBlock: PropTypes.object, // eslint-disable-line
  campaignId: PropTypes.string.isRequired,
  campaignContentfulId: PropTypes.string.isRequired,
  content: PropTypes.string,
  hideEmbed: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  socialPlatform: PropTypes.oneOf(['twitter', 'facebook']).isRequired,
  storeCampaignPost: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

ShareAction.defaultProps = {
  actionId: null,
  additionalContent: null,
  affirmation: 'Thanks for rallying your friends on Facebook!',
  content: null,
  hideEmbed: false,
  userId: null,
};

export default ShareAction;
