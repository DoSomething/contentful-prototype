import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionStep from './ActionStep';
import Revealer from '../Revealer';
import { Flex, FlexCell } from '../Flex';
import { makeHash } from '../../helpers';
import CompetitionContainer from '../../containers/CompetitionContainer';
import ReportbackUploaderContainer from '../../containers/ReportbackUploaderContainer';
import { clickedSignUp as clickedSignUpAction } from '../../actions';

const ActionStepsWrapper = (props) => {
  const { callToAction, campaignId, hasPendingSignup,
    isSignedUp, isAuthenticated, clickedSignUp, actionSteps } = props;

  const uploader = (
    <FlexCell key="reportback_uploader" width="full">
      <ReportbackUploaderContainer />
    </FlexCell>
  );

  const actionRevealer = (
    <Revealer
      key="revealer"
      title="Join Us"
      callToAction={callToAction}
      isLoading={hasPendingSignup}
      onReveal={() => clickedSignUp(campaignId, { source: 'action page revealer' })}
      isAuthenticated={isAuthenticated}
    />
  );

  const revealerOrUploader = isSignedUp ? uploader : actionRevealer;

  let stepIndex = 0;
  let appendUploader = true; // TODO: Remove this after content updates.

  const stepComponents = actionSteps.map((step) => {
    const title = step.title;
    const type = step.customType[0] || 'default';

    const sharedProps = {
      content: step.content,
      key: makeHash(title),
    };

    switch (type) {
      case 'competition':
        return (
          <CompetitionContainer
            {...sharedProps}
            photo={step.photos[0]}
            byline={step.additionalContent}
          />
        );

      case 'photo-uploader':
        appendUploader = false; // TODO: Remove this flag after content updates post deploy.
        return revealerOrUploader;

      default:
        stepIndex += 1;

        return (
          <ActionStep
            {...sharedProps}
            title={title}
            stepIndex={stepIndex}
            background={step.background}
            photos={step.photos}
            photoWidth={step.displayOptions[0] === 'full' ? 'full' : 'one-third'}
            shouldTruncate={step.truncate}
          />
        );
    }
  });

  if (appendUploader) {
    stepComponents.push(revealerOrUploader);
  }

  return (
    <Flex>
      { stepComponents }
    </Flex>
  );
};

ActionStepsWrapper.propTypes = {
  actionSteps: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  callToAction: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  hasPendingSignup: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
};

ActionStepsWrapper.mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
  callToAction: state.campaign.callToAction,
  hasPendingSignup: state.signups.isPending,
  isSignedUp: state.signups.thisCampaign,
  isAuthenticated: state.user.id !== null,
});

ActionStepsWrapper.actionCreators = {
  clickedSignUp: clickedSignUpAction,
};

export default connect(
  ActionStepsWrapper.mapStateToProps,
  ActionStepsWrapper.actionCreators,
)(ActionStepsWrapper);
