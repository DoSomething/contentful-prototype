import React from 'react';
import PropTypes from 'prop-types';
import { FlexCell } from '../../Flex';

import { convertNumberToWord } from '../../../helpers';
import PhotoHeader, { PhotoHeaderTitle } from '../../PhotoHeader';

const MosaicStepHeaderTemplate = ({ title, step, background, hideStepNumber }) => (
  <FlexCell width="full">
    <PhotoHeader backgroundImage={background}>
      <PhotoHeaderTitle
        primary={title}
        secondary={hideStepNumber ? null : (
          `step ${convertNumberToWord(step)}`
        )}
      />
    </PhotoHeader>
  </FlexCell>
);

MosaicStepHeaderTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number,
  hideStepNumber: PropTypes.bool,
  background: PropTypes.string,
};

MosaicStepHeaderTemplate.defaultProps = {
  background: null,
  step: null,
  hideStepNumber: false,
};

export default MosaicStepHeaderTemplate;
