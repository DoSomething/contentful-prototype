import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ isAdmin, children }) => (
  isAdmin ?
    <div className="bg-purple navigation -white text-centered">
      { children }
    </div>
    : null

);

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default AdminDashboard;
