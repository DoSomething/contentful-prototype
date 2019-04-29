import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import TextContent from '../../../utilities/TextContent/TextContent';

const PitchTemplate = ({ content, sidebarCTA }) => (
  <div className="campaign-page">
    <div className="primary">
      <TextContent>{content}</TextContent>
    </div>
    <div className="secondary">
      <Card title={sidebarCTA.title} className="rounded bordered">
        <TextContent className="padded">{sidebarCTA.content}</TextContent>
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
