import PropTypes from 'prop-types';
import React, { useState } from 'react';

import GroupSelect from './GroupSelect';
import Card from '../utilities/Card/Card';
import { getUtms } from '../../helpers/utm';
import PrimaryButton from '../utilities/Button/PrimaryButton';
import { isCampaignClosed, query, withoutNulls } from '../../helpers';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from '../../helpers/analytics';

const SignupButton = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    campaignGroupTypeId,
    campaignId,
    campaignTitle,
    className,
    contextSource,
    endDate,
    pageId,
    storeCampaignSignup,
    text,
  } = props;

  const [groupId, setGroupId] = useState(null);

  // Decorate click handler for A/B tests & analytics.
  const handleSignup = () => {
    const details = {};

    // Set affiliate opt in field if user has opted in.
    if (affiliateMessagingOptIn) {
      details.affiliateOptIn = true;
    }

    // Track signup button click event before we store the signup.
    trackAnalyticsEvent('clicked_signup', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.signup,
      label: campaignTitle,
      context: {
        campaignId,
        contextSource,
        pageId,
      },
    });

    storeCampaignSignup(campaignId, {
      body: {
        details: JSON.stringify(details),
        group_id: groupId,
        // TODO: When should get this uncommented?
        // referrer_user_id: query('referrer_user_id'),
        source_details: JSON.stringify(
          withoutNulls({
            contentful_id: pageId,
            referrer_user_id: query('referrer_user_id'),
            ...getUtms(),
          }),
        ),
      },
    });
  };

  // In descending priority: button-specific text prop,
  // campaign action text override, or standard "Take Action" copy.
  const buttonCopy = text || campaignActionText;
  const closedCampaign = isCampaignClosed(endDate);

  if (!campaignGroupTypeId || closedCampaign) {
    return (
      <PrimaryButton
        className={className}
        onClick={handleSignup}
        text={closedCampaign ? 'Notify Me' : buttonCopy}
      />
    );
  }

  return (
    <div className="mt-3 mb-3">
      <Card title="Join a group" className="rounded bordered">
        <div className="p-3">
          <div className="pb-3">
            <GroupSelect
              groupTypeId={campaignGroupTypeId}
              onChange={selected => setGroupId(selected.value)}
            />
          </div>
          <PrimaryButton
            attributes={{ 'data-testid': 'join-group-signup-button' }}
            className={className}
            isDisabled={!groupId}
            onClick={handleSignup}
            text="Join Group"
          />
        </div>
      </Card>
    </div>
  );
};

SignupButton.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool,
  campaignActionText: PropTypes.string,
  campaignGroupTypeId: PropTypes.number,
  campaignId: PropTypes.string.isRequired,
  campaignTitle: PropTypes.string,
  className: PropTypes.string,
  contextSource: PropTypes.string,
  endDate: PropTypes.string,
  pageId: PropTypes.string.isRequired,
  storeCampaignSignup: PropTypes.func.isRequired,
  text: PropTypes.string,
};

SignupButton.defaultProps = {
  affiliateMessagingOptIn: false,
  campaignActionText: 'Take Action',
  campaignGroupTypeId: null,
  campaignTitle: null,
  className: null,
  contextSource: null,
  endDate: null,
  text: null,
};

export default SignupButton;
