import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import TextContent from '../../../utilities/TextContent/TextContent';

const PitchTemplate = ({ content, sidebarCTA }) => (
  <div className="campaign-page pitch-page">
    <div className="primary">
      <Card className="rounded bordered padded margin-bottom-lg">
        <p className="padding-bottom-md">
          <b>Welcome from FASTWEB!</b> This text will be how a user can earn the
          scholarship. Join the bone marrow registry.
        </p>

        <div className="grid">
          <div className="section-1">Amount</div>
          <div className="section-2">
            <div className="section-2a">Deadline</div>
            <div className="section-2b">Qualifications</div>
          </div>
        </div>
      </Card>

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
