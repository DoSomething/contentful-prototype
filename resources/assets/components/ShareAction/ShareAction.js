import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Embed from '../Embed';
import Markdown from '../Markdown';
import { POST_SHARE_MODAL } from '../Modal';
import { showFacebookSharePrompt, showTwitterSharePrompt } from '../../helpers';

import './share-action.scss';

const ShareAction = (props) => {
  const { title, content, link, socialPlatform, openModal, trackEvent } = props;

  const onFacebookClick = (url) => {
    const trackingData = { url };
    trackEvent('clicked facebook share action', trackingData);

    showFacebookSharePrompt({ href: url }, (response) => {
      if (response) {
        trackEvent('share action completed', trackingData);
        openModal(POST_SHARE_MODAL);
      } else {
        trackEvent('share action cancelled', trackingData);
      }
    });
  };

  const onTwitterClick = (url) => {
    const trackingData = { url };
    trackEvent('clicked twitter share action', trackingData);

    showTwitterSharePrompt(link);
    // @TODO Add post share affirmation modal trigger here.
  };

  const shareButton = () => {
    switch (socialPlatform) {
      case 'facebook':
        return (
          <button className="button" onClick={() => onFacebookClick(link)}>
            Share on Facebook
          </button>
        );
      case 'twitter':
        return (
          <button className="button" onClick={() => onTwitterClick(link)}>
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
        { content ?
          <Markdown className="padded">{content}</Markdown>
          : null }

        <Embed className="padded" url={link} />

        { shareButton() }
      </Card>
    </div>
  );
};

ShareAction.defaultProps = {
  content: null,
};

ShareAction.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  trackEvent: PropTypes.func.isRequired,
  socialPlatform: PropTypes.oneOf(['twitter', 'facebook']).isRequired,
};

export default ShareAction;
