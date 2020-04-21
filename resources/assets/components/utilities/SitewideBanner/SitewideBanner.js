import { createPortal } from 'react-dom';
import React, { useRef, useEffect } from 'react';

import SitewideBannerContent from './SitewideBannerContent';

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

  return createPortal(children, target);
};

export default SitewideBanner;
