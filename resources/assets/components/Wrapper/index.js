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
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  width: React.PropTypes.oneOf(['default', 'feed']),
};

Wrapper.defaultProps = {
  width: '',
};

export default Wrapper;
