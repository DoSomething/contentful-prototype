import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Embed from '../Embed';
import Markdown from '../Markdown';
import { POST_SHARE_MODAL } from '../Modal';
import { showFacebookSharePrompt } from '../../helpers';

import './share-action.scss';

const ShareAction = (props) => {
  const { additionalContent, openModal, trackEvent } = props;

  const onFacebookClick = (link) => {
    const trackingData = { link };
    trackEvent('clicked share action', trackingData);

    showFacebookSharePrompt({ href: link }, (response) => {
      if (response) {
        trackEvent('share action completed', trackingData);
        openModal(POST_SHARE_MODAL);
      } else {
        trackEvent('share action cancelled', trackingData);
      }
    });
  };

  const { title, link, content } = additionalContent;

  return (
    <div className="share-action margin-horizontal-md margin-bottom-lg">
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
  additionalContent: null,
};

ShareAction.propTypes = {
  additionalContent: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  openModal: PropTypes.func.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

export default ShareAction;
