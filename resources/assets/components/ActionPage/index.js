import React from 'react';
import Block from '../Block';
import Markdown from '../Markdown';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import './actionPage.scss';

const renderStep = (step, index) => {
  const title = `Step ${index + 1}: ${step.fields.title}`;
  const titleBackground = step.fields.background;
  console.log(titleBackground)
  const content = step.fields.content;

  const stepWidth = step.fields.displayOptions[0];
  const photoWidth = stepWidth === 'full' ? 'full' : 'one-third';

  return (
    <FlexCell width="full" key={index}>
      <div className="action-step">
        <Flex>
          <FlexCell width="full">
            <div className="action-step__header" style={{backgroundImage: titleBackground}}>
              <h1>{ title }</h1>
            </div>
          </FlexCell>
          <FlexCell width={stepWidth}>
            <Block>
              <Markdown>{ content }</Markdown>
            </Block>
          </FlexCell>
          <FlexCell width={photoWidth}>
            <h1>photo</h1>
          </FlexCell>
        </Flex>
      </div>
    </FlexCell>
  )
}

/*
return (
  <FlexCell width="full" key={index}>
    <FlexCell width="full">
      <h2>{ title }</h2>
    </FlexCell>
    <FlexCell width={stepWidth}>
      <Block>
        <Markdown>{ content }</Markdown>
      </Block>
    </FlexCell>
    <FlexCell width={photoWidth}>
      <p>photo here</p>
    </FlexCell>
  </FlexCell>
);
 */

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
