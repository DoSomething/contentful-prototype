/* global window */

import React from 'react';

/**
 * Scroll to the given offset on the page.
 *
 * @param {Number} offset - vertical offset
 * @param {Number} scrollDuration - time in ms
 */
const scrollTo = (offset = 0, scrollDuration = 100) => {
  const distance = Math.abs(offset - window.scrollY);
  const scrollStep = distance / (scrollDuration / 15);

  const scrollInterval = setInterval(() => {
    if (window.scrollY > offset) {
      clearInterval(scrollInterval);
    }

    window.scrollBy(0, scrollStep);
  }, 15);
};

class ScrollConcierge extends React.Component {
  componentDidMount() {
    setTimeout(() => scrollTo(this.node.offsetTop - 150), 0);
  }

  render() {
    return <div ref={node => this.node = node} />; // eslint-disable-line
  }
}

export default ScrollConcierge;
