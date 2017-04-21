import PropTypes from 'prop-types';
/* global Image */

import React from 'react';
import { EMPTY_IMAGE } from '../../helpers';

class LazyImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false };
  }

  /**
   * Perform actions immediately after mounting component.
   */
  componentDidMount() {
    const loader = new Image();

    // Load image and set `loaded: true` state when ready.
    loader.onload = () => this.setState({ loaded: true });
    if (this.props.src) loader.src = this.props.src;
  }

  /**
   * Render the image.
   *
   * @returns {XML}
   */
  render() {
    return (
      <img
        {...this.props}
        src={this.state.loaded && this.props.src ? this.props.src : EMPTY_IMAGE}
        style={{ transition: 'opacity 0.5s', opacity: this.state.loaded ? 1 : 0 }}
      />
    );
  }
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default LazyImage;
