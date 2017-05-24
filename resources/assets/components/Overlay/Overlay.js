import PropTypes from 'prop-types';
import React from 'react';

import './overlay.scss';

const Overlay = ({ children }) => (
  <div className="overlay">
    {React.Children.map(children, node => (
      <div className="overlay__item">
        { node }
      </div>
    ))}
  </div>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Overlay;
