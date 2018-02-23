import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PuckWaypoint } from '@dosomething/puck-client';

import SectionHeader from '../../SectionHeader';
import Markdown from '../../Markdown';
import { Flex, FlexCell } from '../../Flex';

// TODO: Replace alt with better description.
const renderPhoto = (photo, index) => (
  <div className="action-step__photo" key={index}>
    <img alt="Action step" src={photo} />
  </div>
);

const ActionStep = (props) => {
  const {
    title, stepIndex, content, photos, photoWidth,
    shouldTruncate, hideStepNumber, preTitle,
  } = props;

  const photoComponent = photos && photos.length ? (
    <FlexCell width={photoWidth}>
      <div className={`action-step__photos -${photoWidth}`}>
        { photos ? photos.map(renderPhoto) : null }
      </div>
    </FlexCell>
  ) : null;

  return (
    <div className={classnames('action-step', { '-truncate': shouldTruncate })}>
      <Flex>
        <SectionHeader
          preTitle={preTitle}
          title={title}
          step={stepIndex}
          hideStepNumber={hideStepNumber}
        />
        { content ? (
          <FlexCell width="two-thirds">
            <Markdown>{ content }</Markdown>
          </FlexCell>
        ) : (
          null
        )}
        {photoComponent}
      </Flex>
      <PuckWaypoint name="action-step__bottom" waypointData={{ title }} />
    </div>
  );
};

ActionStep.propTypes = {
  preTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  stepIndex: PropTypes.number.isRequired,
  content: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.string),
  photoWidth: PropTypes.string.isRequired,
  shouldTruncate: PropTypes.bool,
  hideStepNumber: PropTypes.bool,
};

ActionStep.defaultProps = {
  preTitle: null,
  content: null,
  photos: [],
  shouldTruncate: false,
  hideStepNumber: false,
};

export default ActionStep;
