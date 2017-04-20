import React from 'react';
import Block from '../Block/index';
import './placeholder.scss';

const PlaceholderBlock = props => (
  <Block className="placeholder">
    {props.fields.title}
  </Block>
);

PlaceholderBlock.propTypes = {
  fields: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default PlaceholderBlock;
