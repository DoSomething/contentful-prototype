import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ isAdmin, children }) => (
  isAdmin ?
    <div className="bg-light-gray padding-lg -white">
      { children }
    </div>
    : null

);

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default AdminDashboard;
