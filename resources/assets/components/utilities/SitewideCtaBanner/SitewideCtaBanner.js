import { createPortal } from 'react-dom';
import React, { useRef, useEffect } from 'react';

import SitewideCtaBannerContent from './SitewideCtaBannerContent';

import './sitewidectabanner.scss';

const SitewideCtaBanner = props => {
  const usePortal = id => {
    const rootElem = useRef(document.createElement('div'));

    rootElem.current.classList.add('wrapper');

    useEffect(() => {
      const mainContainer = document.getElementById(id);

      mainContainer.prepend(rootElem.current);
    }, []);

    return rootElem.current;
  };
  const children = <SitewideCtaBannerContent {...props} />;

  const target = usePortal('sitewide-cta-banner');

  return createPortal(children, target);
};

export default SitewideCtaBanner;
