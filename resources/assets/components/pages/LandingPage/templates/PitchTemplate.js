import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import TextContent from '../../../utilities/TextContent/TextContent';
import AffiliateScholarshipBlockContainer from '../../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockContainer';

const PitchTemplate = ({ content, sidebarCTA }) => (
  <div className="campaign-page">
    <div className="primary">
      <TextContent>{content}</TextContent>
        <AffiliateScholarshipBlockContainer
          affiliateLogo="https://images.ctfassets.net/81iqaqpfd8fy/5vKnhszTzOs8Y6EkoY02Ey/f4397f4c03171efcc3f67261f2aeb279/PIFstacked.png"
          affiliateTitle="Fastweb"
        />
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
