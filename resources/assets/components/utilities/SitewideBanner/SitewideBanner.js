import { get } from 'lodash';
import gql from 'graphql-tag';
import { createPortal } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { useRef, useEffect } from 'react';

import excludedPaths from './config';
import { getUserId } from '../../../helpers/auth';
import SitewideBannerContent from './SitewideBannerContent';

const VOTER_REGISTRATION_STATUS = gql`
  query VoterRegSitewideBannerQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

const unregisteredStatuses = ['UNCERTAIN', 'CONFIRMED', 'UNREGISTERED'];

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
  const options = { variables: { userId }, skip: !userId };
  const { data, loading } = useQuery(VOTER_REGISTRATION_STATUS, options);

  const unregistered = unregisteredStatuses.includes(
    get(data, 'user.voterRegistrationStatus'),
  );

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

  if (loading) {
    return null;
  }

  if (isExcludedPath(window.location.pathname) || (userId && !unregistered)) {
    target.setAttribute('data-testid', 'sitewide-banner-hidden');

    return null;
  }

  return createPortal(children, target);
};

export default SitewideBanner;
