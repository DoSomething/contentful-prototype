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
import { convertNumberToWord } from '../../helpers';
import { makeHash } from '../../helpers';
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

/**
 * Render a single step on the action page.
 *
 * @param step
 * @param index
 * @returns {XML}
 */
const renderSteps = (steps) => {
  let stepIndex = 0;

  return steps.map(step => {
    const title = step.title;
    const key = makeHash(title);
    const type = step.customType[0];
    const background = step.background;
    const stepWidth = step.displayOptions[0];
    const photoWidth = stepWidth === 'full' ? 'full' : 'one-third';
    const shouldTruncate = step.truncate;
    const additionalContent = step.additionalContent;

    // Handle custom steps
    // TODO: I think it would make sense to handle the Reportback Uploader here as well?
    if (type === 'competition') {
      return <CompetitionContainer key={key} content={step.content} photo={step.photos[0]} byline={additionalContent}/>;
    }

    // Have a seperate count for regular steps.
    stepIndex++;

    return (
      <FlexCell width="full" key={key}>
        <div className={classnames('action-step', { '-truncate': shouldTruncate })}>
          <Flex>
            <StepHeader title={title} step={stepIndex} background={background} />
            <FlexCell width="two-thirds">
              <Markdown>{ step.content }</Markdown>
            </FlexCell>
            <FlexCell width={photoWidth}>
              <div className={`action-step__photos -${photoWidth}`}>
                {step.photos ? step.photos.map(renderPhoto) : null}
              </div>
            </FlexCell>
          </Flex>
        </div>
      </FlexCell>
    );
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
    signedUp, hasPendingSignup, clickedSignUp, showCompetition,
  } = props;


  let actionSteps = cloneDeep(steps);

  if (! signedUp) {
    // Truncate steps if user isn't signed up & remove any custom steps.
    actionSteps = actionSteps.filter(step => ! step.customType[0]).slice(0, 2);

    if (actionSteps[actionSteps.length - 1]) {
      actionSteps[actionSteps.length - 1].truncate = true;
    }
  } else if (!showCompetition) {
    console.log(actionSteps[0])
    // Filter out any steps that have a competition type.
    actionSteps = actionSteps.filter(step => step.customType[0] !== 'competition');
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
