import React from 'react';
import classnames from 'classnames';
import Markdown from '../Markdown';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import Revealer from '../Revealer';
import LazyImage from '../LazyImage';
import { Flex, FlexCell } from '../Flex';
import { convertNumberToWord } from '../../helpers';
import './actionPage.scss';

const Stepheader = ({ title, step, background }) => (
  <FlexCell width="full">
    <div className="action-step__header">
      <LazyImage src={background} />
      <span>step { convertNumberToWord(step) }</span>
      <h1>{ title }</h1>
    </div>
  </FlexCell>
);

const renderPhoto = (photo, index) => (
  <div className="action-step__photo" key={index}>
    <img src={photo} />
  </div>
);

const renderStep = (step, index) => {
  const title = step.title;
  const background = step.background;
  const stepWidth = step.displayOptions[0];
  const photoWidth = stepWidth === 'full' ? 'full' : 'one-third';
  const shouldTruncate = step.truncate;

  return (
    <FlexCell width="full" key={index}>
      <div className={classnames('action-step', {'-truncate': shouldTruncate})}>
        <Flex>
          <Stepheader title={title} step={index + 1} background={background} />
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
  )
}

/**
 * Render the feed.
 *
 * @returns {XML}
 */
const ActionPage = ({ steps, callToAction, campaignId, signedUp, hasPendingSignup, isAuthenticated, clickedSignUp }) => {
  let actionSteps = JSON.parse(JSON.stringify(steps));

  if (! signedUp) {
    actionSteps = actionSteps.slice(0, 2);

    if (actionSteps[actionSteps.length - 1]) {
      actionSteps[actionSteps.length - 1].truncate = true;
    }
  }

  const revealer = <Revealer title='join us' callToAction={callToAction}
                             isLoading={hasPendingSignup}
                             onReveal={() => clickedSignUp(campaignId, ActionPage.defaultMetadata)} />;

  const uploader = (
    <FlexCell key="reportback_uploader" width="full">
      <ReportbackUploaderContainer/>
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

ActionPage.defaultMetadata = {
  source: 'action page',
};

export default ActionPage;
