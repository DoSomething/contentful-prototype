import React from 'react';
import PropTypes from 'prop-types';

const LegacyAdminDashboard = ({ enabled, children }) =>
  enabled ? (
    <div className="bg-gray-200 p-4" data-ref="legacy-admin-dashboard">
      {children}
    </div>
  ) : null;

LegacyAdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default LegacyAdminDashboard;
