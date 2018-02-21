import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Embed from '../Embed';
import Markdown from '../Markdown';
import { POST_SHARE_MODAL } from '../Modal';
import { showFacebookSharePrompt } from '../../helpers';

import './share-action.scss';

const ShareAction = (props) => {
  const { title, content, link, openModal, trackEvent } = props;

  const onFacebookClick = (url) => {
    const trackingData = { url };
    trackEvent('clicked share action', trackingData);

    showFacebookSharePrompt({ href: url }, (response) => {
      if (response) {
        trackEvent('share action completed', trackingData);
        openModal(POST_SHARE_MODAL);
      } else {
        trackEvent('share action cancelled', trackingData);
      }
    });
  };

  return (
    <div className="share-action margin-bottom-lg">
      <Card title={title} className="rounded bordered">
        { content ?
          <Markdown className="padded">{content}</Markdown>
          : null }

        <Embed className="padded" url={link} />

        <button
          className="button"
          onClick={() => onFacebookClick(link)}
        >Share on Facebook</button>
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
};

export default ShareAction;
