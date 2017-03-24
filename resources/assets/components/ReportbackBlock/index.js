import React from 'react';
import Block from '../Block';
import { FlexCell } from '../Flex';
import ReportbackItemContainer from '../../containers/ReportbackItemContainer';
import './reportback-block.scss';

const ReportbackBlock = props => {
  const items = props.reportbacks.map(id => {
    return (
      <FlexCell key={id}>
        <Block className="reportback-block">
          <ReportbackItemContainer id={id} />
        </Block>
      </FlexCell>
    );
  });

  return <FlexCell>{items}</FlexCell>;
};

export default ReportbackBlock;
