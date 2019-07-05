import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Enclosure from '../../../Enclosure';
import Card from '../../../utilities/Card/Card';
import { getScholarshipAffiliateLabel } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../../LedeBanner/LedeBannerContainer';
import CallToActionContainer from '../../../CallToAction/CallToActionContainer';
import SixpackExperiment from '../../../utilities/SixpackExperiment/SixpackExperiment';
import PostGalleryBlockQuery from '../../../blocks/PostGalleryBlock/PostGalleryBlockQuery';
import AffiliateScholarshipBlockQuery from '../../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockQuery';

const PitchTemplate = ({
  additionalContent,
  campaignId,
  campaignTitle,
  content,
  showPartnerMsgOptIn,
  signupArrowContent,
  scholarshipAmount,
  scholarshipDeadline,
  sidebarCTA,
  tagline,
}) => {
  const scholarshipAffiliateLabel = getScholarshipAffiliateLabel();
  const displayAffiliateScholarshipBlock =
    scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline;

  return (
    <React.Fragment>
      <LedeBannerContainer
        signupArrowContent={signupArrowContent}
        showPartnerMsgOptIn={showPartnerMsgOptIn}
      />

      <div className="clearfix bg-white">
        <Enclosure className="default-container margin-lg pitch-landing-page">
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
              {get(additionalContent, 'sixpackLandingPageGallery', false) ? (
                <SixpackExperiment
                  title={`Landing Page Gallery ${campaignTitle}`}
                  convertableActions={['signup']}
                  alternatives={[
                    <div>
                      <h3 className="margin-top-xlg">
                        Photos from our members
                      </h3>
                      <PostGalleryBlockQuery
                        campaignId={campaignId}
                        className="margin-top-md"
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
                <TextContent className="padded">
                  {sidebarCTA.content}
                </TextContent>
              </Card>
            </div>
          </div>
        </Enclosure>

        <CallToActionContainer content={tagline} sticky />
      </div>

      <PuckWaypoint name="landing_page_cta-top" />

      <CallToActionContainer
        className="legacy border-top border-radius-none bg-off-white padding-lg hide-on-mobile"
        content={tagline}
      />

      <PuckWaypoint name="landing_page_cta-bottom" />

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
  campaignTitle: PropTypes.string.isRequired,
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
};

PitchTemplate.defaultProps = {
  additionalContent: null,
  sidebarCTA: {
    title: 'what you get',
    content: '*You could win a $5,000 dollar scholarship!*',
  },
};

export default PitchTemplate;
