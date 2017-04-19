import React from 'react';
import classnames from 'classnames';
import { cloneDeep } from 'lodash';

import LazyImage from '../LazyImage';
import Markdown from '../Markdown';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import { convertNumberToWord } from '../../helpers';
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
  title: React.PropTypes.string.isRequired,
  step: React.PropTypes.number.isRequired,
  background: React.PropTypes.string.isRequired,
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
    <img src={photo} />
  </div>
);

/**
 * Render a single step on the action page.
 *
 * @param step
 * @param index
 * @returns {XML}
 */
const renderStep = (step, index) => {
  const title = step.title;
  const background = step.background;
  const stepWidth = step.displayOptions[0];
  const photoWidth = stepWidth === 'full' ? 'full' : 'one-third';
  const shouldTruncate = step.truncate;

  return (
    <FlexCell width="full" key={index}>
      <div className={classnames('action-step', { '-truncate': shouldTruncate })}>
        <Flex>
          <StepHeader title={title} step={index + 1} background={background} />
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

  // Truncate steps if user isn't signed up.
  let actionSteps = cloneDeep(steps);
  if (! signedUp) {
    actionSteps = actionSteps.slice(0, 2);

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
      {actionSteps.map(renderStep)}
      {isAuthenticated && signedUp ? null : revealer}
      {isAuthenticated && signedUp ? uploader : null}
    </Flex>
  );
};

ActionPage.propTypes = {
  steps: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    background: React.PropTypes.string.isRequired,
    photos: React.PropTypes.array,
  })),
  callToAction: React.PropTypes.string.isRequired,
  campaignId: React.PropTypes.string.isRequired,
  hasPendingSignup: React.PropTypes.bool.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  signedUp: React.PropTypes.bool.isRequired,
  clickedSignUp: React.PropTypes.func.isRequired,
};

ActionPage.defaultMetadata = {
  steps: [],
  source: 'action page',
};

export default ActionPage;
