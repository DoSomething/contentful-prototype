import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { cloneDeep } from 'lodash';

import LazyImage from '../LazyImage';
import Markdown from '../Markdown';
import CompetitionContainer from '../../containers/CompetitionContainer';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import { makeHash, convertNumberToWord } from '../../helpers';
import './actionPage.scss';

const StepHeader = ({ title, step, background }) => (
  <FlexCell width="full">
    <div className="action-step__header">
      <LazyImage src={background} />
      <span>step { convertNumberToWord(step) }</span>
      <h1>{ title }</h1>
    </div>
  </FlexCell>
);

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired,
};

/**
 * Render a photo on the action page.
 *
 * @param step
 * @param index
 * @returns {XML}
 */
const renderPhoto = (photo, index) => (
  <div className="action-step__photo" key={index}>
    <img src={photo} alt="action step example" />
  </div>
);

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
  shouldTruncate: PropTypes.boolean,
};

ActionStep.defaultProps = {
  background: '',
  photos: [],
  truncate: false,
};

/**
 * Render a single step on the action page.
 *
 * @param step
 * @param index
 * @returns {XML}
 */
const renderSteps = (steps) => {
  let stepIndex = 0;

  return steps.map((step) => {
    const title = step.title;
    const key = makeHash(title);
    const type = step.customType[0] || 'default';
    const content = step.content;
    const background = step.background;
    const photos = step.photos;
    const photoWidth = step.displayOptions[0] === 'full' ? 'full' : 'one-third';
    const shouldTruncate = step.truncate;
    const additionalContent = step.additionalContent;

    switch (type) {
      case 'competition':
        return (
          <CompetitionContainer
            key={key}
            content={content}
            photo={photos[0]}
            byline={additionalContent}
          />
        );
      default:
        stepIndex += 1;
        return (
          <ActionStep
            key={key}
            title={title}
            stepIndex={stepIndex}
            content={content}
            background={background}
            photos={photos}
            photoWidth={photoWidth}
            shouldTruncate={shouldTruncate}
          />
        );
    }
  });
};

/**
 * Render the feed.
 *
 * @returns {XML}
 */
const ActionPage = (props) => {
  const {
    steps, callToAction, campaignId, isAuthenticated,
    signedUp, hasPendingSignup, clickedSignUp,
  } = props;


  let actionSteps = cloneDeep(steps);

  if (! signedUp) {
    // Truncate steps if user isn't signed up & remove any custom steps.
    actionSteps = actionSteps.filter(step => ! step.customType[0]).slice(0, 2);

    if (actionSteps[actionSteps.length - 1]) {
      actionSteps[actionSteps.length - 1].truncate = true;
    }
  }

  const revealer = (
    <Revealer
      title="Join Us"
      callToAction={callToAction}
      isLoading={hasPendingSignup}
      onReveal={() => clickedSignUp(campaignId, ActionPage.defaultMetadata)}
    />
  );

  const uploader = (
    <FlexCell key="reportback_uploader" width="full">
      <ReportbackUploaderContainer />
    </FlexCell>
  );

  return (
    <Flex>
      {renderSteps(actionSteps)}
      {isAuthenticated && signedUp ? null : revealer}
      {isAuthenticated && signedUp ? uploader : null}
    </Flex>
  );
};

ActionPage.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    photos: PropTypes.array,
  })),
  callToAction: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  hasPendingSignup: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signedUp: PropTypes.bool.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
};

ActionPage.defaultProps = {
  steps: [],
};

ActionPage.defaultMetadata = {
  source: 'action page',
};

export default ActionPage;
