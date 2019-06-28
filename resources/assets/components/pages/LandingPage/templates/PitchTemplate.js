import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import { getScholarshipAffiliateLabel } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import ContentfulEntry from '../../../ContentfulEntry/ContentfulEntry';
import AffiliateScholarshipBlockQuery from '../../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockQuery';

const PitchTemplate = ({
  blocks,
  content,
  scholarshipAmount,
  scholarshipDeadline,
  sidebarCTA,
}) => {
  const scholarshipAffiliateLabel = getScholarshipAffiliateLabel();

  const displayAffiliateScholarshipBlock =
    scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline;

  return (
    <div className="campaign-page">
      <div className="primary">
        {displayAffiliateScholarshipBlock ? (
          <AffiliateScholarshipBlockQuery
            utmLabel={scholarshipAffiliateLabel.toLowerCase()}
            scholarshipAmount={scholarshipAmount}
            scholarshipDeadline={scholarshipDeadline}
            className="margin-bottom-lg"
          />
        ) : null}

        <TextContent>{content}</TextContent>

        {blocks.length ? (
          <div className="margin-top-xlg">
            {blocks.map(block => {
              return <ContentfulEntry json={block} key={block.id} />;
            })}
          </div>
        ) : null}
      </div>

      <div className="secondary">
        <Card title={sidebarCTA.title} className="rounded bordered">
          <TextContent className="padded">{sidebarCTA.content}</TextContent>
        </Card>
      </div>
    </div>
  );
};

PitchTemplate.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.string.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  sidebarCTA: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

PitchTemplate.defaultProps = {
  blocks: [],
  scholarshipAmount: null,
  scholarshipDeadline: null,
  sidebarCTA: {
    title: 'what you get',
    content: '*You could win a $5,000 dollar scholarship!*',
  },
};

export default PitchTemplate;
