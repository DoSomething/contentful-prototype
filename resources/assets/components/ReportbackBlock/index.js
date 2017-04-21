import PropTypes from 'prop-types';
import React from 'react';
import Block from '../Block';
import { FlexCell } from '../Flex';
import ReportbackItemContainer from '../../containers/ReportbackItemContainer';
import { mapDisplayToPoints } from '../../selectors/feed';
import './reportback-block.scss';

const ReportbackBlock = (props) => {
  const items = [];

  for (let i = 0; i < mapDisplayToPoints(props.fields.displayOptions); i += 1) {
    const id = props.reportbacks[i];

    items.push(
      <FlexCell key={id || `null-${i}`}>
        <Block className="reportback-block">
          <ReportbackItemContainer id={id} />
        </Block>
      </FlexCell>,
    );
  }

  return <FlexCell>{items}</FlexCell>;
};

ReportbackBlock.propTypes = {
  fields: PropTypes.shape({
    displayOptions: PropTypes.array,
  }).isRequired,
  reportbacks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ReportbackBlock;
