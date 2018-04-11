import React from 'react';
import PropTypes from 'prop-types';

import './experience.scss';

const Experience = ({ children }) => (
  <div className="experience">{children}</div>
);

Experience.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Experience;
