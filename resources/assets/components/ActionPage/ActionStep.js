import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StepHeader from './StepHeader';
import Markdown from '../Markdown';
import { Flex, FlexCell } from '../Flex';

// TODO: Replace alt with better description.
const renderPhoto = (photo, index) => (
  <div className="action-step__photo" key={index}>
    <img alt="Action step" src={photo} />
  </div>
);

const ActionStep = (props) => {
  const {
    title, stepIndex, content, background, photos,
    photoWidth, shouldTruncate, hideStepNumber,
    template, preTitle,
  } = props;

  const photoComponent = photos && photos.length ? (
    <FlexCell width={photoWidth}>
      <div className={`action-step__photos -${photoWidth}`}>
        { photos ? photos.map(renderPhoto) : null }
      </div>
    </FlexCell>
  ) : null;

  return (
    <FlexCell width="full">
      <div className={classnames('action-step', { '-truncate': shouldTruncate })}>
        <Flex>
          <StepHeader
            preTitle={preTitle}
            title={title}
            step={stepIndex}
            background={background}
            hideStepNumber={hideStepNumber}
            template={template}
          />
          { content ?
            <FlexCell width="two-thirds">
              <Markdown>{ content }</Markdown>
            </FlexCell>
            :
            null
          }
          {photoComponent}
        </Flex>
      </div>
    </FlexCell>
  );
};

ActionStep.propTypes = {
  preTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  stepIndex: PropTypes.number.isRequired,
  content: PropTypes.string,
  background: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.string),
  photoWidth: PropTypes.string.isRequired,
  shouldTruncate: PropTypes.bool,
  hideStepNumber: PropTypes.bool,
  template: PropTypes.string.isRequired,
};

ActionStep.defaultProps = {
  preTitle: null,
  background: '',
  content: null,
  photos: [],
  shouldTruncate: false,
  hideStepNumber: false,
};

export default ActionStep;
