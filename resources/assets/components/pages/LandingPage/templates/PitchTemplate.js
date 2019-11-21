import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Enclosure from '../../../Enclosure';
import Card from '../../../utilities/Card/Card';
import { getScholarshipAffiliateLabel } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../../LedeBanner/LedeBannerContainer';
import CallToActionContainer from '../../../CallToAction/CallToActionContainer';
import CampaignInfoBarContainer from '../../../CampaignInfoBar/CampaignInfoBarContainer';
import SixpackExperiment from '../../../utilities/SixpackExperiment/SixpackExperiment';
import PostGalleryBlockQuery from '../../../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import AffiliateScholarshipBlockQuery from '../../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockQuery';

const PitchTemplate = ({
  additionalContent,
  campaignId,
  content,
  showPartnerMsgOptIn,
  signupArrowContent,
  scholarshipAmount,
  scholarshipDeadline,
  sidebarCTA,
  tagline,
  title,
}) => {
  const numCampaignId = Number(campaignId);
  const scholarshipAffiliateLabel = getScholarshipAffiliateLabel();
  const displayAffiliateScholarshipBlock =
    scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline;

  return (
    <React.Fragment>
      <LedeBannerContainer
        signupArrowContent={signupArrowContent}
        showPartnerMsgOptIn={showPartnerMsgOptIn}
      />

      <div className="bg-white">
        <Enclosure className="md:w-3/4 mx-auto py-6 px-3 pitch-landing-page">
          <div className="campaign-page clearfix">
            <div className="primary">
              {displayAffiliateScholarshipBlock ? (
                <AffiliateScholarshipBlockQuery
                  campaignId={numCampaignId}
                  utmLabel={scholarshipAffiliateLabel.toLowerCase()}
                  scholarshipAmount={scholarshipAmount}
                  scholarshipDeadline={scholarshipDeadline}
                  className="mb-6"
                />
              ) : null}

              <TextContent>{content}</TextContent>

              {/* @SIXPACK Code Test: 2019-07-03 */}
              {get(additionalContent, 'sixpackLandingPageGallery', false) ? (
                <SixpackExperiment
                  title={`Landing Page Gallery ${title}`}
                  convertableActions={['signup']}
                  alternatives={[
                    <div>
                      <h3 className="mt-12">Photos from our members</h3>
                      <PostGalleryBlockQuery
                        campaignId={campaignId}
                        className="mt-3"
                        count={6}
                        hideCaption
                        hideQuantity
                        hideReactions
                        paginated={false}
                        tags={['good-submission']}
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
                <TextContent className="p-3">{sidebarCTA.content}</TextContent>
              </Card>
            </div>
          </div>
        </Enclosure>
      </div>

      <CallToActionContainer
        className="bg-gray-100-important border-t border-solid border-gray-300 font-bold px-3 md:px-6 py-6 text-base md:text-lg"
        content={tagline}
      />

      <CampaignInfoBarContainer />

      <div className="info-bar -dark">
        <div className="wrapper">
          A DoSomething.org campaign. Join millions of young people transforming
          their communities. Let&#39;s Do This!
        </div>
      </div>
    </React.Fragment>
  );
};

PitchTemplate.propTypes = {
  additionalContent: PropTypes.object,
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  showPartnerMsgOptIn: PropTypes.bool.isRequired,
  sidebarCTA: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  signupArrowContent: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

PitchTemplate.defaultProps = {
  additionalContent: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  sidebarCTA: {
    title: 'what you get',
    content: '*You could win a $5,000 dollar scholarship!*',
  },
};

export default PitchTemplate;
