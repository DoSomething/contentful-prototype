import React from 'react';
import PropTypes from 'prop-types';

import './pitchFlex.scss';

export const PitchFlex = ({ children }) => (
  <div className={'pitch-flex'}>
    { children }
  </div>
);

PitchFlex.propTypes = {
  children: PropTypes.node.isRequired,
};

export const PitchFlexCell = ({ children, width, padding }) => (
  <div className={`pitch-flex__cell -${width} ${padding ? '-padding' : ''}`}>
    <div>
      { children }
    </div>
  </div>
);

PitchFlexCell.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool,
  width: PropTypes.oneOf(['full', 'half', 'one-third', 'two-thirds']),
};

PitchFlexCell.defaultProps = {
  width: 'full',
  padding: false,
};
