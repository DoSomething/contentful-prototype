import { get } from 'lodash';
import gql from 'graphql-tag';
import { createPortal } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { useRef, useEffect } from 'react';

import { excludedPaths } from './config';
import { getCampaign } from '../../../helpers/campaign';
import SitewideBannerContent from './SitewideBannerContent';
import { isCurrentPathInPaths, query } from '../../../helpers';
import { getUserId, isAuthenticated } from '../../../helpers/auth';
import {
  needToVerifyVoterRegStatuses,
  getCheckRegistrationStatusURL,
  isVerifiedCompletedVoterRegStatuses,
  isVerifiedIneligibleVoterRegStatuses,
  USER_VOTER_REGISTRATION_STATUS_QUERY,
} from '../../../helpers/voter-registration';

const CAMPAIGN_QUERY = gql`
  query CampaignSitewideBannerQuery($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      groupTypeId
    }
  }
`;

const SitewideBanner = props => {
  const usePortal = id => {
    const rootElem = useRef(document.createElement('div'));

    rootElem.current.classList.add('wrapper');

    useEffect(() => {
      const mainContainer = document.getElementById(id);

      mainContainer.prepend(rootElem.current);
    }, []);

    return rootElem.current;
  };

  const target = usePortal('banner-portal');
  const hiddenAttributeDataTestId = 'sitewide-banner-hidden';

  // First check if this path is excluded, to avoid making unnecessary GraphQL requests.
  if (isCurrentPathInPaths(excludedPaths)) {
    target.setAttribute('data-testid', hiddenAttributeDataTestId);

    return null;
  }

  // If we're in "chromeless" mode, e.g. an embed, hide this bar:
  if (query('chromeless')) {
    return null;
  }

  const userId = getUserId();
  const { data: userData, loading: userLoading } = useQuery(
    USER_VOTER_REGISTRATION_STATUS_QUERY,
    {
      variables: { userId },
      skip: !userId,
    },
  );

  const campaign = getCampaign();
  const campaignId = campaign ? Number(campaign.campaignId) : null;
  const { data: campaignData, loading: campaignLoading } = useQuery(
    CAMPAIGN_QUERY,
    {
      variables: {
        campaignId,
      },
      skip: !campaignId,
    },
  );

  const userRegistrationStatus = get(userData, 'user.voterRegistrationStatus');
  const showNonVoterRegistrationContent =
    isVerifiedIneligibleVoterRegStatuses(userRegistrationStatus) ||
    isVerifiedCompletedVoterRegStatuses(userRegistrationStatus);

  if (userLoading || campaignLoading) {
    return null;
  }

  if (
    /**
     * If this is a groups campaign, we hide the banner to avoid interfering with the group finder
     * on small screen.
     */
    !!get(campaignData, 'campaign.groupTypeId') ||
    showNonVoterRegistrationContent
  ) {
    target.setAttribute('data-testid', hiddenAttributeDataTestId);

    return null;
  }

  if (
    /**
     * Checks for auth user and if the user is registered to vote/ineligible,
     * Display an refer a friend banner
     */
    isAuthenticated() &&
    showNonVoterRegistrationContent
  ) {
    return createPortal(
      <SitewideBannerContent
        cta="Start Now"
        link="/us/account/refer-friends"
        description="Want to build our youth-led movement? Refer a friend!"
        handleClose={props.handleClose}
        handleComplete={props.handleComplete}
      />,
      target,
    );
  }

  if (
    /**
     * Checks for auth user and if the user is self reported to be registered to vote or uncertain
     * Display a reminder to check their status
     */
    isAuthenticated() &&
    needToVerifyVoterRegStatuses(userRegistrationStatus)
  ) {
    return createPortal(
      <SitewideBannerContent
        cta="Get Started"
        contextSource="voter_registration_lookup_tool"
        link={getCheckRegistrationStatusURL()}
        description="1 in 8 voter registrations are invalid. Take 2 minutes to make sure you're registered at your current address."
        handleClose={props.handleClose}
        handleComplete={props.handleComplete}
      />,
      target,
    );
  }

  return createPortal(<SitewideBannerContent {...props} />, target);
};

export default SitewideBanner;
