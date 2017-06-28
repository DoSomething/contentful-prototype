import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StepHeader from './StepHeader';
import { renderPhoto } from './ActionRenders';
import Markdown from '../Markdown';
import { Flex, FlexCell } from '../Flex';

const ActionStep = ({ title, stepIndex, content, background, photos, photoWidth, shouldTruncate }) => ( // eslint-disable-line max-len
  <FlexCell width="full">
    <div className={classnames('action-step', { '-truncate': shouldTruncate })}>
      <Flex>
        <StepHeader title={title} step={stepIndex} background={background} />
        <FlexCell width="two-thirds">
          <Markdown>{ content }</Markdown>
        </FlexCell>
        <FlexCell width={photoWidth}>
          <div className={`action-step__photos -${photoWidth}`}>
            { photos ? photos.map(renderPhoto) : null }
          </div>
        </FlexCell>
      </Flex>
    </div>
  </FlexCell>
);

ActionStep.propTypes = {
  title: PropTypes.string.isRequired,
  stepIndex: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  background: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.string),
  photoWidth: PropTypes.string.isRequired,
  shouldTruncate: PropTypes.bool,
};

ActionStep.defaultProps = {
  background: '',
  photos: [],
  shouldTruncate: false,
};

export default ActionStep;
