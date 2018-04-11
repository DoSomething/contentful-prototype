import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Embed from '../Embed';
import Markdown from '../Markdown';
import { POST_SHARE_MODAL } from '../Modal';
import { showFacebookSharePrompt, showTwitterSharePrompt } from '../../helpers';

const ShareAction = props => {
  const {
    id,
    title,
    content,
    link,
    socialPlatform,
    openModal,
    trackEvent,
  } = props;

  const onFacebookClick = () => {
    const trackingData = { url: link };
    trackEvent('clicked facebook share action', trackingData);

    showFacebookSharePrompt({ href: link }, response => {
      if (response) {
        trackEvent('share action completed', trackingData);
        // @TODO: Render a <Modal>...</Modal> component here!
        openModal(POST_SHARE_MODAL, id);
      } else {
        trackEvent('share action cancelled', trackingData);
      }
    });
  };

  const onTwitterClick = () => {
    const trackingData = { url: link };
    trackEvent('clicked twitter share action', trackingData);

    showTwitterSharePrompt(link, '', () => openModal(POST_SHARE_MODAL, id));
  };

  const shareButton = () => {
    switch (socialPlatform) {
      case 'facebook':
        return (
          <button
            className="button button-attached"
            onClick={() => onFacebookClick(link)}
          >
            Share on Facebook
          </button>
        );
      case 'twitter':
        return (
          <button
            className="button button-attached"
            onClick={() => onTwitterClick(link)}
          >
            Share on Twitter
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="share-action margin-bottom-lg">
      <Card title={title} className="rounded bordered">
        {content ? <Markdown className="padded">{content}</Markdown> : null}

        <Embed className="padded" url={link} />

        {shareButton()}
      </Card>
    </div>
  );
};

ShareAction.defaultProps = {
  content: null,
};

ShareAction.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  trackEvent: PropTypes.func.isRequired,
  socialPlatform: PropTypes.oneOf(['twitter', 'facebook']).isRequired,
};

export default ShareAction;
