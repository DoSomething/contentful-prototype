import gql from 'graphql-tag';
import { createPortal } from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getUserId } from '../../../helpers/auth';
import excludedPaths from './config';
import SitewideBannerContent from './SitewideBannerContent';

const VOTER_REGISTRATION_STATUS = gql`
  query VoterRegBadgeQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

const shouldDisplayRegistrationBanner = [
  'UNCERTAIN',
  'CONFIRMED',
  'UNREGISTERED',
];

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
  const options = { variables: { userId: getUserId() } };
  const { data } = useQuery(VOTER_REGISTRATION_STATUS, options);

  const unregistered = shouldDisplayRegistrationBanner.includes(
    data ? data.user.voterRegistrationStatus : {},
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

  return !isExcludedPath(window.location.pathname) && unregistered
    ? createPortal(children, target)
    : null;
};

export default SitewideBanner;
