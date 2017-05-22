/* global window, document */

import React from 'react';
import FontFaceObserver from 'fontfaceobserver';

/**
 * Scroll to the given offset on the page.
 *
 * @param {Number} target - vertical offset
 * @param {Number} duration - time in ms
 */
const scrollTo = (target = 0, duration = 500) => {
  const initialOffset = window.scrollY;
  const distance = target - initialOffset;
  const beginning = +Date.now();

  // Render a frame of the animation.
  const scroller = () => {
    const elapsed = Date.now() - beginning;

    // If we've reached the target or got interrupted, stop.
    if (window.scrollY > target) return;

    // Scroll to wherever we should be at this point in the animation.
    window.scrollTo(0, initialOffset + Math.floor(distance * (elapsed / duration)));
    window.requestAnimationFrame(scroller);
  };

  // Render the first frame.
  window.requestAnimationFrame(scroller);
};

/**
 * Component which scrolls the browser to itself when
 * it appears on the page.
 */
class ScrollConcierge extends React.Component {
  componentDidMount() {
    const font = new FontFaceObserver('League Gothic');

    // Wait for headline font to load so we don't scroll to
    // the wrong place when the page reflows & offset changes.
    font.load().then(() => {
      const VISUAL_OFFSET = 150;
      scrollTo(this.node.offsetTop - VISUAL_OFFSET);
    });
  }

  render() {
    return <div ref={node => (this.node = node)} />;
  }
}

export default ScrollConcierge;
