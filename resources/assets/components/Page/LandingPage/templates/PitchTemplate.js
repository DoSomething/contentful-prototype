import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../../Markdown';
import Card from '../../../Card';

const PitchTemplate = ({ pitchContent, sidebarCTA }) => (
  <div className="campaign-subpage">
    <div className="primary">
      <Markdown>{ pitchContent }</Markdown>
    </div>
    <div className="secondary">
      <Card title={sidebarCTA.title} className="rounded bordered" >
        <Markdown className="padded" >{ sidebarCTA.content }</Markdown>
      </Card>
    </div>
  </div>
);

PitchTemplate.propTypes = {
  pitchContent: PropTypes.string.isRequired,
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

