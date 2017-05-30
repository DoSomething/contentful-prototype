import React from 'react';
import PropTypes from 'prop-types';

import './pitchHeader.scss';

const PitchHeader = ({ children, color, type, align, position, background }) => (
  <div className={`pitch-header -${type} -${align} -${position}`} style={{ color, background }}>
    <div>
      { children }
    </div>
  </div>
);

PitchHeader.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['large', 'medium']),
  color: PropTypes.string,
  background: PropTypes.string,
  align: PropTypes.oneOf(['left', 'bottom', 'center']),
  position: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

PitchHeader.defaultProps = {
  type: 'large',
  color: '#FFF',
  background: '#111',
  align: 'left',
  position: 'top',
};

export default PitchHeader;
