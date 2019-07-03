import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../utilities/Card/Card';
import { getScholarshipAffiliateLabel } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import SixpackExperiment from '../../../utilities/SixpackExperiment/SixpackExperiment';
import PostGalleryBlockQuery from '../../../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import AffiliateScholarshipBlockQuery from '../../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockQuery';

const PitchTemplate = ({
  campaignId,
  campaignTitle,
  content,
  contentfulId,
  scholarshipAmount,
  scholarshipDeadline,
  sidebarCTA,
}) => {
  const scholarshipAffiliateLabel = getScholarshipAffiliateLabel();
  const displayAffiliateScholarshipBlock =
    scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline;

  const testableCampaigns = [
    '6LQzMvDNQcYQYwso8qSkQ8', // Dev
    '6tgfJeVQIQXw8xfsgyNkHI', // QA
    '6tgfJeVQIQXw8xfsgyNkHI', // Prod
    '6ATBgGEQEeJoIcxs1qbwaC', // Prod
    '5Jp8I6l0e9GVZzuHSgZ9Qp', // Prod
  ];

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

        {/* @SIXPACK Code Test: 2019-07-03 */}
        {testableCampaigns.includes(contentfulId) ? (
          <SixpackExperiment
            title={`Landing Page Gallery ${campaignTitle}`}
            convertableActions={['signup']}
            alternatives={[
              <div>
                <h3 className="margin-top-xlg">Photos from our members</h3>
                <PostGalleryBlockQuery
                  campaignId={campaignId}
                  className="margin-top-md"
                  count={6}
                  hideCaption
                  hideQuantity
                  hideReactions
                  paginated={false}
                  type="photo"
                />
              </div>,
            ]}
          />
        ) : null}
        {/* @SIXPACK Code Test: 2019-07-03 */}
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
  }),
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
