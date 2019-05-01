import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import { getScholarshipAffiliateLabel } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import AffiliateScholarshipBlockQuery from '../../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockQuery';

const PitchTemplate = ({
  content,
  scholarshipAmount,
  scholarshipDeadline,
  sidebarCTA,
}) => {
  const scholarshipAffiliate = getScholarshipAffiliateLabel();
  const displayAffiliateScholarshipBlock =
    scholarshipAffiliate && scholarshipAmount && scholarshipDeadline;

  return (
    <div className="campaign-page">
      <div className="primary">
        {displayAffiliateScholarshipBlock ? (
          <AffiliateScholarshipBlockQuery
            utmLabel={scholarshipAffiliate}
            scholarshipAmount={scholarshipAmount}
            scholarshipDeadline={scholarshipDeadline}
            className="margin-bottom-lg"
          />
        ) : null}
        <TextContent>{content}</TextContent>
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
  content: PropTypes.string.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  sidebarCTA: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

PitchTemplate.defaultProps = {
  scholarshipAmount: null,
  scholarshipDeadline: null,
  sidebarCTA: {
    title: 'what you get',
    content: '*You could win a $5,000 dollar scholarship!*',
  },
};

export default PitchTemplate;
