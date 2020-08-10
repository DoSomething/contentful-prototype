import { get } from 'lodash';
import gql from 'graphql-tag';
import { createPortal } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { useRef, useEffect } from 'react';

import excludedPaths from './config';
import { getUserId } from '../../../helpers/auth';
import { getCampaign } from '../../../helpers/campaign';
import SitewideBannerContent from './SitewideBannerContent';

const VOTER_REGISTRATION_STATUS = gql`
  query VoterRegSitewideBannerQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

const CAMPAIGN_GROUPTYPE_QUERY = gql`
  query CampaignSitewideBannerQuery($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      groupType {
        id
      }
    }
  }
`;

const unregisteredStatuses = ['UNCERTAIN', 'CONFIRMED', 'UNREGISTERED'];

const campaign = getCampaign();

const isExcludedPath = pathname => {
  return excludedPaths.find(excludedPath => {
    if (excludedPath.includes('*')) {
      const pathWithoutAsterisk = excludedPath.slice(0, -1);

      return (
        pathname.includes(pathWithoutAsterisk) &&
        pathname.length > pathWithoutAsterisk.length
      );
    }

    return excludedPath === pathname;
  });
};

const SitewideBanner = props => {
  const userId = getUserId();
  const campaignId = campaign ? Number(campaign.campaignId) : null;

  const options = { variables: { userId }, skip: !userId };
  const { data, loading } = useQuery(VOTER_REGISTRATION_STATUS, options);
  const unregistered = unregisteredStatuses.includes(
    get(data, 'user.voterRegistrationStatus'),
  );

  const { data: campaignData, loading: campaignLoading } = useQuery(
    CAMPAIGN_GROUPTYPE_QUERY,
    {
      variables: {
        campaignId,
      },
      skip: !campaignId,
    },
  );
  const isGroupCampaign = !!get(campaignData, 'campaign.groupType.id');

  const usePortal = id => {
    const rootElem = useRef(document.createElement('div'));

    rootElem.current.classList.add('wrapper');

    useEffect(() => {
      const mainContainer = document.getElementById(id);

      mainContainer.prepend(rootElem.current);
    }, []);

    return rootElem.current;
  };

  const children = <SitewideBannerContent {...props} />;

  const target = usePortal('banner-portal');

  if (loading || campaignLoading) {
    return null;
  }

  if (
    isExcludedPath(window.location.pathname) ||
    (userId && !unregistered) ||
    isGroupCampaign
  ) {
    target.setAttribute('data-testid', 'sitewide-banner-hidden');

    return null;
  }

  return createPortal(children, target);
};

export default SitewideBanner;
