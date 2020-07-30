import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Card from '../utilities/Card/Card';
import { getUtms } from '../../helpers/utm';
import GroupFinder from './GroupFinder/GroupFinder';
import PrimaryButton from '../utilities/Button/PrimaryButton';
import { isCampaignClosed, query, withoutNulls } from '../../helpers';
import { EVENT_CATEGORIES, trackAnalyticsEvent } from '../../helpers/analytics';

const CampaignSignupForm = props => {
  const {
    affiliateMessagingOptIn,
    campaignActionText,
    campaignId,
    campaignTitle,
    className,
    contextSource,
    endDate,
    groupType,
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
        groupId,
        pageId,
      },
    });

    storeCampaignSignup(campaignId, {
      body: {
        details: JSON.stringify(details),
        group_id: groupId,
        referrer_user_id: query('referrer_user_id'),
        source_details: JSON.stringify(
          withoutNulls({
            contentful_id: pageId,
            ...getUtms(),
          }),
        ),
      },
    });
  };

  const handleGroupFinderChange = selected => {
    setGroupId(selected ? selected.id : null);

    trackAnalyticsEvent('clicked_group_finder_group', {
      action: 'form_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'group_finder',
      context: {
        campaignId,
        // Pass our selected.id to avoid race condition with setting groupId state.
        groupId: selected ? selected.id : null,
        pageId,
      },
    });
  };

  // In descending priority: button-specific text prop,
  // campaign action text override, or standard "Take Action" copy.
  const buttonCopy = text || campaignActionText;
  const closedCampaign = isCampaignClosed(endDate);

  if (!groupType || closedCampaign) {
    return (
      <PrimaryButton
        className={className}
        onClick={handleSignup}
        text={closedCampaign ? 'Notify Me' : buttonCopy}
      />
    );
  }

  return (
    <div className="my-3" data-testid="join-group-signup-form">
      <Card title="Join a group" className="rounded bordered">
        <div className="p-3">
          <p className="text-sm text-gray-500 pt-3 md:pt-0">
            Can&apos;t find your group? Email tej@dosomething.org for help.
          </p>

          <GroupFinder
            context={{ campaignId, pageId }}
            groupType={groupType}
            onChange={handleGroupFinderChange}
          />

          <PrimaryButton
            attributes={{ 'data-testid': 'join-group-signup-button' }}
            className={`${className} py-2 md:py-3`}
            isDisabled={!groupId}
            onClick={handleSignup}
            text="Join Group"
          />
        </div>
      </Card>
    </div>
  );
};

CampaignSignupForm.propTypes = {
  affiliateMessagingOptIn: PropTypes.bool,
  campaignActionText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  campaignTitle: PropTypes.string,
  className: PropTypes.string,
  contextSource: PropTypes.string,
  endDate: PropTypes.string,
  groupType: PropTypes.object,
  pageId: PropTypes.string.isRequired,
  storeCampaignSignup: PropTypes.func.isRequired,
  text: PropTypes.string,
};

CampaignSignupForm.defaultProps = {
  affiliateMessagingOptIn: false,
  campaignActionText: 'Take Action',
  campaignTitle: null,
  className: null,
  contextSource: null,
  endDate: null,
  groupType: null,
  text: null,
};

export default CampaignSignupForm;
