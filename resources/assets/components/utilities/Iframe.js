import React from 'react';
import PropTypes from 'prop-types';

import LazyImage from './LazyImage';
import { getRequest } from '../../helpers/api';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { getFormattedScreenSize } from '../../helpers';

const permittedHostnames = ['dosomething.carto.com'];

class Iframe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: getFormattedScreenSize() === 'small',
      imagePreview: null,
      hasError: false,
    };

    const hostname = new URL(this.props.url).hostname;
    if (!permittedHostnames.includes(hostname)) {
      console.warn(
        `Invalid URL ${this.props.url} supplied to Iframe component`,
      );
      this.state = {
        ...this.state,
        hasError: true,
      };
    }
  }

  componentDidMount() {
    if (this.state.isMobile && !this.state.hasError) {
      getRequest('next/embed', { url: this.props.url })
        .then(({ image }) =>
          image
            ? this.setState({ imagePreview: image })
            : this.setState({ hasError: true }),
        )
        .catch(() => {
          this.setState({ hasError: true });
        });
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBlock />;
    }

    if (this.state.isMobile) {
      return <LazyImage src={this.state.imagePreview} />;
    }

    return (
      <iframe
        id={this.props.id}
        title={`embed ${this.props.id}`}
        src={this.props.url}
        width="100%"
        height="520"
      />
    );
  }
}

Iframe.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Iframe;
