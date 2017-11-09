import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ cacheId }) => {
  return (
    <div className="bg-purple navigation admin-navigation -white">
      <div className="controls flex-center-xy">
        <a href={`/next/cache/${cacheId}?redirect=${location.pathname}`}>Clear Cache</a>
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  cacheId: PropTypes.string.isRequired,
};

export default AdminDashboard;
