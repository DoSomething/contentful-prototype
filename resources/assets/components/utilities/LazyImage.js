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
   * Perform actions after component is mounted.
   */
  componentDidMount() {
    this.loadImage();
  }

  /**
   * Perform actions after receiving new props.
   */
  componentDidUpdate(nextProps) {
    // If we're changing the image 'src', see if we need to load
    // a new image and re-render.
    if (this.props.src !== nextProps.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.loader = null;
  }

  loadImage() {
    this.loader = new Image();

    // Load image and set `loaded: true` state when ready.
    this.loader.onload = () => this.setState({ loaded: true });
    if (this.props.src) {
      this.loader.src = this.props.src;
    }
  }

  /**
   * Render the image.
   *
   * @returns {XML}
   */
  render() {
    const showPlaceholder = this.state.loaded && this.props.src;
    const imageUrl = showPlaceholder ? this.props.src : EMPTY_IMAGE;

    if (this.props.asBackground) {
      return (
        <div
          css={this.props.css}
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
        css={this.props.css}
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
  alt: requiredIf(PropTypes.string, props => !props.asBackground),
  css: PropTypes.any, // eslint-disable-line
  className: PropTypes.string,
  asBackground: PropTypes.bool,
  src: PropTypes.string,
};

LazyImage.defaultProps = {
  alt: null,
  css: null,
  className: null,
  asBackground: false,
  src: null,
};

export default LazyImage;
