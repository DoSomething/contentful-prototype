import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ children }) => (
  <div className="bg-purple navigation -white text-centered">
    { children }
  </div>
);

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminDashboard;
