import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import ContentfulEntry from '../../ContentfulEntry';
import { setFormData } from '../../../helpers/forms';
import Markdown from '../../utilities/Markdown/Markdown';
import { trackAnalyticsEventBeta } from '../../../helpers/analytics';
import {
  dynamicString,
  loadFacebookSDK,
  showFacebookShareDialog,
  showTwitterSharePrompt,
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
    const type = 'share_social';

    const action = get(this.props.additionalContent, 'action', 'default');

    const { id, campaignId, link } = this.props;

    const formData = setFormData({
      action,
      type,
      id,
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
      body: formData,
      id,
      type,
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

    trackAnalyticsEventBeta({
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

        trackAnalyticsEventBeta({
          verb: 'completed',
          ...trackingOptions,
        });
        this.setState({ showModal: true });
      })
      .catch(() => {
        trackAnalyticsEventBeta({
          verb: 'cancelled',
          ...trackingOptions,
        });
      });
  };

  handleTwitterClick = url => {
    trackAnalyticsEventBeta({
      verb: 'clicked',
      noun: 'share_action',
      adjective: 'twitter',
      data: { url: this.props.link },
    });
    showTwitterSharePrompt(url, '', () => this.setState({ showModal: true }));
  };

  render() {
    const {
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
        <div className="share-action margin-bottom-lg">
          <Card title={title} className="rounded bordered">
            {content ? <Markdown className="padded">{content}</Markdown> : null}
            {hideEmbed ? null : (
              <div className="padded">
                <Embed url={link} />
              </div>
            )}
            <Button attached onClick={() => handleShareClick(href)}>
              Share on {isFacebook ? 'Facebook' : 'Twitter'}
            </Button>
          </Card>
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
                <Markdown className="padded">{affirmation}</Markdown>
              </Card>
            )}
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

ShareAction.propTypes = {
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  affirmation: PropTypes.string,
  affirmationBlock: PropTypes.object, // eslint-disable-line
  campaignId: PropTypes.string.isRequired,
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
  additionalContent: null,
  affirmation: 'Thanks for rallying your friends on Facebook!',
  content: null,
  hideEmbed: false,
  userId: null,
};

export default ShareAction;
