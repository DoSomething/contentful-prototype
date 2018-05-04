import React from 'react';

import { scrollToElement } from '../../helpers/scroll';

/**
 * Component which scrolls the browser to itself when
 * it appears on the page.
 */
class ScrollConcierge extends React.Component {
  componentDidMount() {
    scrollToElement(this.node);
  }

  render() {
    return <div ref={node => (this.node = node)} />;
  }
}

export default ScrollConcierge;
