import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Embed from '../../Embed';
import Markdown from '../../Markdown';

const LinkAction = (props) => {
  const { title, content, link, trackEvent } = props;

  const onLinkClick = () => {
    trackEvent('clicked link action', { link });
  };

  return (
    <div className="link-action margin-horizontal-md margin-bottom-lg">
      <Card title={title} className="rounded bordered">
        { content ?
          <Markdown className="padded">{content}</Markdown>
          : null }

        <span role="button" tabIndex="0" onClick={onLinkClick}>
          <Embed className="padded" url={link} />
        </span>
      </Card>
    </div>
  );
};

LinkAction.defaultProps = {
  content: null,
};

LinkAction.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

export default LinkAction;
