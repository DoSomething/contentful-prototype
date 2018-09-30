/* global window */

import React from 'react';
import PropTypes from 'prop-types';

const PageDashboard = ({ slug }) => (
  <div>
    <a
      className="button -secondary margin-md"
      href={`/next/cache/page_${slug}?redirect=${window.location.pathname}`}
    >
      Clear Cache
    </a>
  </div>
);

PageDashboard.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default PageDashboard;
