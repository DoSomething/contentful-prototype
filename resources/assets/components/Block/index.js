import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import './block.scss';

export const BlockTitle = ({ children }) => (
  <h4 className="block__title">{children}</h4>
);

BlockTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

const Block = props => (
  <div className={classNames('block', props.className)}>
    {props.children}
  </div>
);

Block.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Block.defaultProps = {
  className: null,
};

export default Block;
