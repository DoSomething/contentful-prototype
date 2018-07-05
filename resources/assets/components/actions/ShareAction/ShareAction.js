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
import { trackPuckEvent } from '../../../helpers/analytics';
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

  storeSharePost = url => {
    const type = '?';

    const action = get(this.props.additionalContent, 'action', 'default');

    const { id, campaignId, campaignRunId, legacyCampaignId } = this.props;

    const formData = setFormData(
      {
        action,
        type,
        id,
      },
      {
        url,
        campaign_id: campaignId,
        legacy_campaign_id: legacyCampaignId,
        legacy_campaign_run_id: campaignRunId,
      },
    );
    // Send request to store the social share post.
    this.props.storeCampaignPost(campaignId, {
      action,
      body: formData,
      id,
      type,
    });
  };

  handleFacebookClick = url => {
    trackPuckEvent('clicked facebook share action', { url });

    showFacebookShareDialog(url)
      .then(() => {
        // @TODO: Once Rogue is ready to accept this post we'll activate.
        // this.storeSharePost(url);
        trackPuckEvent('share action completed', { url });
        this.setState({ showModal: true });
      })
      .catch(() => {
        trackPuckEvent('share action cancelled', { url });
      });
  };

  handleTwitterClick = url => {
    trackPuckEvent('clicked twitter share action', { url });
    showTwitterSharePrompt(url, '', () => this.setState({ showModal: true }));
  };

  render() {
    const {
      affirmation, // @TODO: Rename me to 'affirmationText'?
      affirmationBlock,
      campaignRunId,
      content,
      hideEmbed,
      legacyCampaignId,
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
      campaignId: legacyCampaignId,
      campaignRunId,
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
  campaignRunId: PropTypes.string.isRequired,
  content: PropTypes.string,
  hideEmbed: PropTypes.bool,
  id: PropTypes.string.isRequired,
  legacyCampaignId: PropTypes.string,
  link: PropTypes.string.isRequired,
  socialPlatform: PropTypes.oneOf(['twitter', 'facebook']).isRequired,
  storeCampaignPost: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

ShareAction.defaultProps = {
  additionalContent: null,
  affirmation: 'Thanks for rallying your friends on Facebook!',
  legacyCampaignId: null,
  content: null,
  hideEmbed: false,
  userId: null,
};

export default ShareAction;
