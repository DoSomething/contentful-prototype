import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ enabled, children }) =>
  enabled ? <div className="bg-light-gray -white">{children}</div> : null;

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default AdminDashboard;
