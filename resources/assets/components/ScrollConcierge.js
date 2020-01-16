import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { scrollToElement } from '../helpers/scroll';

/**
 * Component which scrolls the browser to itself when
 * it appears on the page.
 */
const ScrollConcierge = ({ trigger }) => {
  const element = useRef(null);

  // When this element is added to the tree (or if 'trigger' changes,
  // scroll the browser to its location on the page.)
  useEffect(() => scrollToElement(element.current), [trigger]);

  return <div ref={element} />;
};

ScrollConcierge.propTypes = {
  // The 'trigger' prop can be used to re-trigger a ScrollConcierge when
  // something changes in the parent component by passing a different value.
  trigger: PropTypes.any, // eslint-disable-line
};

export default ScrollConcierge;
