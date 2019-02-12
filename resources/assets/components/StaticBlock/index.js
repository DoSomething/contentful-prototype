import React from 'react';
import PropTypes from 'prop-types';

import BlockWrapper from '../Block/BlockWrapper';
import TextContent from '../utilities/TextContent/TextContent';

import './static-block.scss';

const StaticBlock = ({ content, source, title }) => (
  <BlockWrapper title={title}>
    <TextContent>{content}</TextContent>
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
