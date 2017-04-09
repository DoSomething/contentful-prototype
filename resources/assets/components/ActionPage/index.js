import React from 'react';
import Markdown from '../Markdown';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import { convertDigitToWord } from '../../helpers';
import './actionPage.scss';

const Stepheader = ({ title, step, background }) => (
  <FlexCell width="full">
    <div className="action-step__header" style={{ backgroundImage: background }}>
      <span>step { convertDigitToWord(step) }</span>
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
  const background = `url('${step.background}')`;

  const stepWidth = step.displayOptions[0];
  const photoWidth = stepWidth === 'full' ? 'full' : 'one-third';

  return (
    <FlexCell width="full" key={index}>
      <div className="action-step">
        <Flex>
          <Stepheader title={title} step={index + 1} background={background} />
          <FlexCell width={stepWidth}>
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
  if (! signedUp) {
    steps = steps.slice(0, 2);
  }

  const revealer = <Revealer title="sign up" callToAction={callToAction}
                             isLoading={hasPendingSignup}
                             onReveal={() => clickedSignUp(campaignId, ActionPage.defaultMetadata)} />;

  const uploader = (
    <FlexCell key="reportback_uploader" width="full">
      <ReportbackUploaderContainer/>
    </FlexCell>
  );

  return (
    <Flex>
      {steps.map(renderStep)}
      {isAuthenticated && signedUp ? null : revealer}
      {isAuthenticated && signedUp ? uploader : null}
    </Flex>
  );
};

ActionPage.defaultMetadata = {
  source: 'action page',
};

export default ActionPage;
