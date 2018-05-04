import React from 'react';
import PropTypes from 'prop-types';

import BlockWrapper from '../Block/BlockWrapper';
import ReportbackItemContainer from '../ReportbackItem';
import './reportback-block.scss';

const ReportbackBlock = ({ reportbacks }) => {
  const id = reportbacks[0];

  return (
    <BlockWrapper className="reportback-block" key={id}>
      <ReportbackItemContainer id={id} />
    </BlockWrapper>
  );
};

ReportbackBlock.propTypes = {
  reportbacks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ReportbackBlock;
