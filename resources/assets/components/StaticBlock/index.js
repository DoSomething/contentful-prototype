import React from 'react';
import { Block, BlockTitle } from '../Block';
import Markdown from '../Markdown';
import './static-block.scss';

const StaticBlock = (props) => {
  const { source } = props.fields.additionalContent;

  return (
    <Block>
      <BlockTitle>{ props.fields.title }</BlockTitle>
      <Markdown>{props.fields.content}</Markdown>
      { source ? <div className="static-block__citation"><p className="footnote">Source: {source}</p></div> : null }
    </Block>
  );
};

export default StaticBlock;
