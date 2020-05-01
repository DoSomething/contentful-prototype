import React, { useState } from 'React';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Card from '../../../../components/utilities/Card/Card';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

const StartVoterRegistrationForm = prop => {
  const url = `https://register.rockthevote.com/registrants/new?partner=37187&source=user:${prop.referrerUserId},source:web,source_details:onlinedrivereferral,referral=true`;

  const handleClick = () => {
    trackAnalyticsEvent('click_voter_registration_action'),
      {
        action: 'button_clicked',
        category: EVENT_CATEGORIES.campaignAction,
        label: 'voter_registration',
        context: {
          blockId,
          campaignId,
          pageId,
          url,
        },
      };
  };

  return (
    <>
      <Card title="Register Online to vote">
        <PrimaryButton
          onClick={handleClick}
          href={url}
          text="Register To Vote"
        />
      </Card>
    </>
  );
};

StartVoterRegistrationForm.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default StartVoterRegistrationForm;
