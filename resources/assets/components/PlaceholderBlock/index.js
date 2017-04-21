import PropTypes from 'prop-types';
import React from 'react';
import Block from '../Block/index';
import './placeholder.scss';

const PlaceholderBlock = props => (
  <Block className="placeholder">
    {props.fields.title}
  </Block>
);

PlaceholderBlock.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlaceholderBlock;
