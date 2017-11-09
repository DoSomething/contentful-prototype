import React from 'react';
import PropTypes from 'prop-types';

import './adminDashboard.scss';

const AdminDashboard = ({ cacheId, redirectPath }) => {
  const redirectParam = redirectPath ? `?redirect=${redirectPath}` : '';

  return (
    <div className="bg-purple navigation admin-navigation -white">
      <div className="controls flex-center-xy">
        <a href={`/next/cache/${cacheId}${redirectParam}`}>Clear Cache</a>
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  cacheId: PropTypes.string.isRequired,
  redirectPath: PropTypes.string,
};

AdminDashboard.defaultProps = {
  redirectPath: null,
};

export default AdminDashboard;
