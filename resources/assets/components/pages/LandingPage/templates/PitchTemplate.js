import React from 'react';
import PropTypes from 'prop-types';

import ContentfulEntry from '../../../ContentfulEntry';
import Markdown from '../../../utilities/Markdown/Markdown';

const PitchTemplate = ({ content, sidebarBlocks }) => (
  <div className="campaign-page">
    <div className="primary">
      <Markdown>{content}</Markdown>
    </div>
    <div className="secondary">
      {sidebarBlocks.map(json => (
        <div key={json.id} className="margin-bottom-lg">
          <ContentfulEntry json={json} />
        </div>
      ))}
    </div>
  </div>
);

PitchTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  sidebarBlocks: PropTypes.arrayOf(PropTypes.object),
};

PitchTemplate.defaultProps = {
  sidebarCTA: {
    title: 'what you get',
    content: '*You could win a $5,000 dollar scholarship!*',
  },
  sidebarBlocks: [],
};

export default PitchTemplate;
