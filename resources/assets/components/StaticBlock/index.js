import React from 'react';
import PropTypes from 'prop-types';

import BlockWrapper from '../Block/BlockWrapper';
import Markdown from '../utilities/Markdown/Markdown';

import './static-block.scss';

const StaticBlock = ({ content, source, title }) => (
  <BlockWrapper title={title}>
    <Markdown>{content}</Markdown>
    {source ? (
      <div className="static-block__citation">
        <p className="footnote">{source}</p>
      </div>
    ) : null}
  </BlockWrapper>
);

StaticBlock.propTypes = {
  content: PropTypes.string.isRequired,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
};

StaticBlock.defaultProps = {
  source: null,
};

export default StaticBlock;
