import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ enabled, children }) =>
  enabled ? (
    <div className="bg-gray-200 p-4" data-ref="legacy-admin-dashboard">
      {children}
    </div>
  ) : null;

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default AdminDashboard;
