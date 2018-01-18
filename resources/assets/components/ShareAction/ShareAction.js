import React from 'react';
import PropTypes from 'prop-types';
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

  const hasLinks = additionalContent && additionalContent.links;

  return (
    <div className="share-action margin-horizontal-md margin-bottom-lg">
      {hasLinks ? (
        <ul>
          {additionalContent.links.map(({ title, link }) => (
            <li>
              <a
                role="button"
                tabIndex="0"
                onClick={() => onFacebookClick(link)}
                key={title}
              >{ title }</a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

ShareAction.defaultProps = {
  additionalContent: null,
};

ShareAction.propTypes = {
  additionalContent: PropTypes.shape({
    links: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
    })),
  }),
  openModal: PropTypes.func.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

export default ShareAction;
