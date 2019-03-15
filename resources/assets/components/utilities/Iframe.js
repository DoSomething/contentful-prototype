import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PuckWaypoint } from '@dosomething/puck-client';

import LazyImage from './LazyImage';
import { getRequest } from '../../helpers/api';
import ErrorBlock from '../ErrorBlock/ErrorBlock';

const permittedHostnames = ['dosomething.carto.com'];

class IframePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      hasError: false,
    };
  }

  componentDidMount() {
    getRequest('next/embed', { url: this.props.url })
      .then(({ image }) =>
        image ? this.setState({ image }) : this.setState({ hasError: true }),
      )
      .catch(() => this.setState({ hasError: true }));
  }

  render() {
    return this.state.hasError ? (
      <ErrorBlock />
    ) : (
      <div className="margin-horizontal-md">
        <LazyImage
          src={this.state.image}
          alt="Preview image for embedded content"
        />
      </div>
    );
  }
}

IframePreview.propTypes = {
  url: PropTypes.string.isRequired,
};

const Iframe = ({ className, id, url }) => {
  const hostname = new URL(url).hostname;

  if (!permittedHostnames.includes(hostname)) {
    console.warn(`Invalid URL ${url} supplied to Iframe component`);
    return <ErrorBlock />;
  }

  return (
    <div id={id} className={classnames('embed margin-bottom-lg', className)}>
      <PuckWaypoint name="embed-top" waypointData={{ contentfulId: id }} />
      <Media query="(max-width: 759px)">
        {matches =>
          matches ? (
            <IframePreview url={url} />
          ) : (
            <iframe title={`embed ${id}`} src={url} width="100%" height="520" />
          )
        }
      </Media>
      <PuckWaypoint name="embed-bottom" waypointData={{ contentfulId: id }} />
    </div>
  );
};

Iframe.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

Iframe.defaultProps = {
  className: null,
};

export default Iframe;
