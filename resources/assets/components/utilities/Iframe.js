import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from '../ErrorBlock/ErrorBlock';

const permittedHostnames = ['dosomething.carto.com'];

const Iframe = ({ id, url }) => {
  const hostname = url && new URL(url).hostname;

  if (!permittedHostnames.includes(hostname)) {
    console.warn(`Invalid URL ${url} supplied to Iframe component`);
    return <ErrorBlock />;
  }

  return <iframe title={`embed ${id}`} src={url} width="100%" height="520" />;
};

Iframe.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Iframe;
