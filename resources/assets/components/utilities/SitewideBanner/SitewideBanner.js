import { createPortal } from 'react-dom';
import React, { useRef, useEffect } from 'react';

import excludedPaths from './config';
import SitewideBannerContent from './SitewideBannerContent';

const checkExcludedPathname = pathname => {
  for (let i = 0; i < excludedPaths.length; i += 1) {
    if (excludedPaths[i] === pathname) {
      return true;
    }
    if (excludedPaths[i].includes('*')) {
      if (pathname.includes('/us/quiz-results/')) {
        return true;
      }
    }
  }
  return false;
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

  return !checkExcludedPathname(window.location.pathname)
    ? createPortal(children, target)
    : null;
};

export default SitewideBanner;
