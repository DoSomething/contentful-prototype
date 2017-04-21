import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { modifiers } from '../../helpers';
import './wrapper.scss';

const Wrapper = ({ width = '', children }) => (
  <div className={classNames('wrapper', modifiers(width))}>
    { children }
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.oneOf(['default', 'feed']),
};

Wrapper.defaultProps = {
  width: '',
};

export default Wrapper;
