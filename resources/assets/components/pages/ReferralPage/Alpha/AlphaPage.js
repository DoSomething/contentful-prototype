import React from 'react';
import PropTypes from 'prop-types';

import { query } from '../../../../helpers';
import { PHOENIX_URL } from '../../../../constants';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const AlphaPage = props => {
  const campaignId = query('campaign_id');
  let url = `${PHOENIX_URL}/us/join?user_id=${props.userId}`;

  if (campaignId) {
    url = `${url}&campaign_id=${campaignId}`;
  }

  return (
    <div className="main general-page base-12-grid">
      <div className="grid-narrow">
        <div className="my-6">
          <div className="general-page__heading text-center">
            <h1 className="general-page__title uppercase">Want free stuff?</h1>
          </div>
          <div className="my-6">
            <SocialDriveActionContainer
              shareCardDescription="Invite your friends to join DoSomething. When your friend signs up for this campaign, you'll both earn a $5 gift card! The more friends you refer, the more gift cards you earn. (Psst...there's no limit on how many you can refer!)"
              shareCardTitle="Refer A Friend"
              link={url}
              hidePageViews={true}
            />
          </div>
          <h3>FAQ</h3>
          <h4>1. Who can I refer?</h4>
          <p>
            Earn your reward for referring NEW members to DoSomething!
            Unfortunately, if you refer someone that already has a DoSomething
            account, you won’t get the reward when they sign up for the shared
            campaign.
          </p>
          <h4>2. How will I get my gift card?</h4>
          <p>
            We will email it to you using the same email address used to create
            your DoSomething account.
          </p>
          <h4>3. Where can I find the full rules?</h4>
          <p>
            This offer is for a limited time only. See the{' '}
            <a href="/us/refer-a-friend-official-rules" target="_blank">
              Refer A Friend Official Rules.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
