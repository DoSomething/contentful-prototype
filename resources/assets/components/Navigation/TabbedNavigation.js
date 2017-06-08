/* global window */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { MEDIA_MEDIUM_SIZE_MIN } from '../../constants/media-sizes';
import './tabbed-navigation.scss';

class TabbedNavigation extends React.Component {
  /**
   * Class contructor
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.node = null;
    this.isAnimatingFrame = false;

    this.updateState = this.updateState.bind(this);
    this.requestFrame = this.requestFrame.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      isStuck: false,
    };
  }

  /**
   * React lifecycle method called after render() method runs.
   */
  componentDidMount() {
    this.updateState();

    window.addEventListener('scroll', this.onScroll, false);
  }

  /**
   * Method called when the page is scrolled.
   */
  onScroll() {
    if (window.innerWidth <= MEDIA_MEDIUM_SIZE_MIN) {
      return;
    }

    this.requestFrame();
  }

  /**
   * Request frame of animation.
   */
  requestFrame() {
    if (! this.isAnimatingFrame) {
      window.requestAnimationFrame(this.updateState);
    }

    this.isAnimatingFrame = true;
  }

  /**
   * Update the component's state based on its location on the page.
   */
  updateState() {
    this.isAnimatingFrame = false;

    const tabbedNavRect = this.node.getBoundingClientRect();

    this.setState({ isStuck: tabbedNavRect.top <= 0 });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div ref={node => (this.node = node)} id="tabbed-navigation" className={classnames('tabbed-navigation', { 'is-stuck': this.state.isStuck })}>
        <div className="wrapper">
          { this.props.children }
        </div>
      </div>
    );
  }
}

TabbedNavigation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabbedNavigation;
