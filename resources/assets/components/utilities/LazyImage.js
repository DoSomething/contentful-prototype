/* global Image */

import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

import { EMPTY_IMAGE } from '../../helpers';

class LazyImage extends React.Component {
  constructor(props) {
    super(props);

    this.loader = null;
    this.state = { loaded: false };
  }

  /**
   * Perform actions after receiving new props.
   */
  componentDidUpdate() {
    this.loader = new Image();

    // Load image and set `loaded: true` state when ready.
    this.loader.onload = () => this.setState({ loaded: true });
    if (this.props.src) {
      this.loader.src = this.props.src;
    }
  }

  componentWillUnmount() {
    this.loader = null;
  }

  /**
   * Render the image.
   *
   * @returns {XML}
   */
  render() {
    const showPlaceholder = this.state.loaded && this.props.src;
    const imageUrl = showPlaceholder ? this.props.src : EMPTY_IMAGE;

    if (this.props.hasBackgroundImage) {
      return (
        <div
          className={this.props.className}
          style={{
            backgroundImage: `url(${imageUrl})`,
            transition: 'background 0.5s',
          }}
        />
      );
    }

    return (
      <img
        className={this.props.className}
        alt={this.props.alt}
        src={imageUrl}
        style={{
          transition: 'opacity 0.5s',
          opacity: this.state.loaded ? 1 : 0,
        }}
      />
    );
  }
}

LazyImage.propTypes = {
  alt: requiredIf(PropTypes.string, props => !props.hasBackgroundImage),
  className: PropTypes.string,
  hasBackgroundImage: PropTypes.bool,
  src: PropTypes.string,
};

LazyImage.defaultProps = {
  alt: null,
  className: null,
  hasBackgroundImage: false,
  src: null,
};

export default LazyImage;
