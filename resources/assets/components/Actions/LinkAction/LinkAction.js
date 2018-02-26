import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../Card';
import Embed from '../../Embed';
import Markdown from '../../Markdown';
import SponsorPromotion from '../../SponsorPromotion';

const LinkAction = (props) => {
  const { title, content, link, affiliateLogo, trackEvent } = props;

  const onLinkClick = () => {
    trackEvent('clicked link action', { link });
  };

  return (
    <div className="link-action margin-horizontal-md margin-bottom-lg">
      <Card
        title={title}
        className={classnames('rounded bordered', { 'affiliate-content': affiliateLogo })}
      >
        { content ?
          <Markdown className="padded">{content}</Markdown>
          : null }

        <div role="button" tabIndex="0" onClick={onLinkClick} className="link-wrapper">
          <Embed className="padded" url={link} />
        </div>

        { affiliateLogo ? (
          <SponsorPromotion
            className="affiliate-link-action"
            imgUrl={affiliateLogo}
          />
        ) : null }

      </Card>
    </div>
  );
};

LinkAction.defaultProps = {
  content: null,
  affiliateLogo: null,
};

LinkAction.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  trackEvent: PropTypes.func.isRequired,
  affiliateLogo: PropTypes.string,
};

export default LinkAction;
