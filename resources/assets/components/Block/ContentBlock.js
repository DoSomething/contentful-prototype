import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PuckWaypoint } from '@dosomething/puck-client';

import SectionHeader from '../SectionHeader';
import Markdown from '../Markdown';
import { Flex, FlexCell } from '../Flex';

import './contentBlock.scss';

// TODO: Replace alt with better description.
const renderPhoto = (photo, index) => (
  <div className="content-block__photo" key={index}>
    <img alt="Action step" src={photo} />
  </div>
);

const ContentBlock = props => {
  const {
    title,
    stepIndex,
    content,
    photos,
    photoWidth,
    shouldTruncate,
    hideStepNumber,
    preTitle,
  } = props;

  const photoComponent =
    photos && photos.length ? (
      <FlexCell width={photoWidth}>
        <div className={`content-block__photos -${photoWidth}`}>
          {photos ? photos.map(renderPhoto) : null}
        </div>
      </FlexCell>
    ) : null;

  return (
    <div
      className={classnames('content-block', { '-truncate': shouldTruncate })}
    >
      <Flex>
        <SectionHeader
          preTitle={preTitle}
          title={title}
          step={stepIndex}
          hideStepNumber={hideStepNumber}
        />
        {content ? (
          <FlexCell width="two-thirds">
            <Markdown>{content}</Markdown>
          </FlexCell>
        ) : null}
        {photoComponent}
      </Flex>
      <PuckWaypoint name="content-block__bottom" waypointData={{ title }} />
    </div>
  );
};

ContentBlock.propTypes = {
  preTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  stepIndex: PropTypes.number.isRequired,
  content: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.string),
  photoWidth: PropTypes.string.isRequired,
  shouldTruncate: PropTypes.bool,
  hideStepNumber: PropTypes.bool,
};

ContentBlock.defaultProps = {
  preTitle: null,
  content: null,
  photos: [],
  shouldTruncate: false,
  hideStepNumber: false,
};

export default ContentBlock;
