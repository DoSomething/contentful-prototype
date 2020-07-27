import { createPortal } from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Placeholder from '../Placeholder';
import Spinner from '../../artifacts/Spinner/Spinner';

import gql from 'graphql-tag';

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
// If the user has a voterRegistrationStatus of uncertain, unregistered,
// or confirmed, the banner should appear as it currently does, no changes.
// For any other status, the banner should not show up at all.

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
  const { data, loading, error } = useQuery(VOTER_REGISTRATION_STATUS, options);

  if (loading) {
    return <Placeholder />;
  }

  // shouldDisplayRegistrationBanner
  // shouldDisplayRegistrationBanner.includes(data ? data.user['voterRegistrationStatus'] : {})
  console.log('Banner:', data ? data.user['voterRegistrationStatus'] : {});

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

  return !isExcludedPath(window.location.pathname)
    ? createPortal(children, target)
    : null;
};

export default SitewideBanner;
