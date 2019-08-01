import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Query from '../../Query';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';

const REFERRAL_PAGE_CAMPAIGN = gql`
  query ReferralPageCampaignQuery($campaignId: String!) {
    campaignWebsiteByCampaignId(campaignId: $campaignId) {
      title
      slug
      callToAction
      coverImage {
        url(w: 150)
      }
    }
  }
`;

const ReferralPageCampaignLink = props => (
  <Query
    query={REFERRAL_PAGE_CAMPAIGN}
    variables={{ campaignId: props.campaignId }}
  >
    {res => {
      const data = res.campaignWebsiteByCampaignId;
      if (!data) {
        return <ErrorBlock />;
      }
      const url = `/us/campaigns/${data.slug}?referrer_user_id=${props.userId}`;

      return (
        <article className="figure -left -center">
          <div className="figure__media">
            <img alt={data.title} src={data.coverImage.url} />
          </div>
          <div className="figure__body">
            <h2>
              <a href={url}>{data.title}</a>
            </h2>
            <p>{data.callToAction}</p>
            <p>DOSOMETHING.ORG</p>
          </div>
        </article>
      );
    }}
  </Query>
);

ReferralPageCampaignLink.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ReferralPageCampaignLink;
