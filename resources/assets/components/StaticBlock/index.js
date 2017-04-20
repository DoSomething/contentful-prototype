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
  fields: React.PropTypes.shape({
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    additionalContent: React.PropTypes.object,
  }).isRequired,
};

export default StaticBlock;
