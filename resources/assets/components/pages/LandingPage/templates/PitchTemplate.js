import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import Markdown from '../../../utilities/Markdown/Markdown';

const PitchTemplate = ({ content, sidebarCTA }) => (
  <div className="campaign-page">
    <div className="primary">
      <Markdown>{content}</Markdown>
    </div>
    <div className="secondary">
      <Card title={sidebarCTA.title} className="rounded bordered">
        <Markdown className="padded">{sidebarCTA.content}</Markdown>
      </Card>
    </div>
  </div>
);

PitchTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  sidebarCTA: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

PitchTemplate.defaultProps = {
  sidebarCTA: {
    title: 'what you get',
    content: '*You could win a $5,000 dollar scholarship!*',
  },
};

export default PitchTemplate;
