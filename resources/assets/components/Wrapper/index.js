import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { modifiers } from '../../helpers';
import './wrapper.scss';

const Wrapper = ({ width = '', children }) => (
  <div className={classnames('wrapper', modifiers(width))}>
    { children }
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOf(['default', 'feed']),
};

Wrapper.defaultProps = {
  width: '',
};

export default Wrapper;
