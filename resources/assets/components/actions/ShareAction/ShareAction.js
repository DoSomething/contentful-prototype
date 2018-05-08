import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import ContentfulEntry from '../../ContentfulEntry';
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

  handleFacebookClick = url => {
    trackPuckEvent('clicked facebook share action', { url });

    showFacebookShareDialog(url)
      .then(() => {
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
      content,
      link,
      socialPlatform,
      title,
      campaignId,
      userId,
    } = this.props;

    const isFacebook = socialPlatform === 'facebook';
    const handleShareClick = isFacebook
      ? this.handleFacebookClick
      : this.handleTwitterClick;

    const href = dynamicString(link, { campaignId, userId });

    return (
      <React.Fragment>
        <div className="share-action margin-bottom-lg">
          <Card title={title} className="rounded bordered">
            {content ? <Markdown className="padded">{content}</Markdown> : null}
            <div className="padded">
              <Embed url={href} />
            </div>
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  socialPlatform: PropTypes.oneOf(['twitter', 'facebook']).isRequired,
  affirmation: PropTypes.string,
  affirmationBlock: PropTypes.object, // eslint-disable-line
  campaignId: PropTypes.string,
  userId: PropTypes.string,
};

ShareAction.defaultProps = {
  content: null,
  affirmation: 'Thanks for rallying your friends on Facebook!',
  campaignId: null,
  userId: null,
};

export default ShareAction;
