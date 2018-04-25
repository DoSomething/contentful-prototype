import React from 'react';
import PropTypes from 'prop-types';

import Embed from '../../Embed';
import Markdown from '../../Markdown';
import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import ContentfulEntry from '../../ContentfulEntry';
import {
  showFacebookSharePrompt,
  loadFacebookSDK,
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

  handleFacebookClick = link => {
    const { trackEvent } = this.props;
    const trackingData = { url: link };

    trackEvent('clicked facebook share action', trackingData);

    showFacebookSharePrompt({ href: link }, response => {
      if (!response) {
        trackEvent('share action cancelled', trackingData);
        return;
      }

      trackEvent('share action completed', trackingData);
      this.setState({ showModal: true });
    });
  };

  handleTwitterClick = link => {
    const { trackEvent } = this.props;
    const trackingData = { url: link };

    trackEvent('clicked twitter share action', trackingData);
    showTwitterSharePrompt(link, '', () => this.setState({ showModal: true }));
  };

  render() {
    const {
      affirmation, // @TODO: Rename me to 'affirmationText'?
      affirmationBlock,
      content,
      link,
      socialPlatform,
      title,
    } = this.props;

    const handleShareClick =
      socialPlatform === 'facebook'
        ? this.handleFacebookClick
        : this.handleTwitterClick;

    return (
      <React.Fragment>
        <div className="share-action margin-bottom-lg">
          <Card title={title} className="rounded bordered">
            {content ? <Markdown className="padded">{content}</Markdown> : null}

            <Embed className="padded" url={link} />

            <button
              className="button button-attached"
              onClick={() => handleShareClick(link)}
            >
              Share on {socialPlatform === 'facebook' ? 'Facebook' : 'Twitter'}
            </button>
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
  trackEvent: PropTypes.func.isRequired,
  socialPlatform: PropTypes.oneOf(['twitter', 'facebook']).isRequired,
  affirmation: PropTypes.string,
  affirmationBlock: PropTypes.object, // eslint-disable-line
};

ShareAction.defaultProps = {
  content: null,
  affirmation: 'Thanks for rallying your friends on Facebook!',
};

export default ShareAction;
