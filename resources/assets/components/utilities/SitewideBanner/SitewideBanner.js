import { createPortal } from 'react-dom';
import React, { useRef, useEffect } from 'react';

import excludedPaths from './config';
import SitewideBannerContent from './SitewideBannerContent';

const isExcludedPath = pathname => {
  return excludedPaths.find(excludedPath => {
    if (excludedPath.includes('*')) {
      const pathWithoutAsterisk = excludedPath.slice(0, -1);
      return (
        pathname.includes(excludedPath.slice(0, -1)) &&
        pathname.length >= pathWithoutAsterisk.length
      );
    }

    return excludedPath === pathname;
  });
};

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
  const children = <SitewideBannerContent {...props} />;

  const target = usePortal('banner-portal');

  return !isExcludedPath(window.location.pathname)
    ? createPortal(children, target)
    : null;
};

export default SitewideBanner;
