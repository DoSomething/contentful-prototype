import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import { query } from '../../../helpers';
import BetaTemplate from './templates/BetaTemplate';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';
import AlphaTemplate from './templates/AlphaTemplate';

const REFERRAL_PAGE_USER = gql`
  query ReferralPageUserQuery($id: String!) {
    user(id: $id) {
      id
      firstName
    }
  }
`;

const ReferralPage = props => {
  const userId = query('user_id');
  if (!userId) {
    return <ErrorBlock />;
  }
  const campaignId = query('campaign_id');
  const isAlphaTemplate = props.template === 'alpha';

  return (
    <Query query={REFERRAL_PAGE_USER} variables={{ id: userId }}>
      {data => {
        if (!data.user) {
          return <ErrorBlock />;
        }

        const firstName = data.user.firstName;

        return (
          <div>
            <div className="main clearfix general-page">
              <div className="default-container margin-vertical">
                <div className="general-page__heading text-center">
                  <h1 className="general-page__title caps-lock">
                    {isAlphaTemplate
                      ? 'Want free stuff?'
                      : `Hi, ${firstName}’s friend!`}
                  </h1>
                </div>
                {isAlphaTemplate ? (
                  <AlphaTemplate
                    firstName={firstName}
                    primaryCampaignId={campaignId}
                    userId={userId}
                  />
                ) : (
                  <BetaTemplate
                    firstName={firstName}
                    primaryCampaignId={campaignId}
                    userId={userId}
                  />
                )}
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

ReferralPage.propTypes = {
  template: PropTypes.string.isRequired,
};

export default ReferralPage;
