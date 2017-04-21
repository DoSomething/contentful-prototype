import PropTypes from 'prop-types';
import React from 'react';
import Block, { BlockTitle } from '../Block';
import Markdown from '../Markdown';
import './static-block.scss';

const StaticBlock = (props) => {
  const { source } = props.fields.additionalContent;

  return (
    <Block>
      <BlockTitle>{ props.fields.title }</BlockTitle>
      <Markdown>{props.fields.content}</Markdown>
      { source ? <div className="static-block__citation"><p className="footnote">{source}</p></div> : null }
    </Block>
  );
};

StaticBlock.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    additionalContent: PropTypes.object,
  }).isRequired,
};

export default StaticBlock;
