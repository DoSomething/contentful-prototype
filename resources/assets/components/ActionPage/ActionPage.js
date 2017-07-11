import PropTypes from 'prop-types';
import React from 'react';
import { cloneDeep } from 'lodash';

import ActionStepsWrapper from './ActionStepsWrapper';
import './actionPage.scss';

/**
 * Render the feed.
 *
 * @returns {XML}
 */
const ActionPage = (props) => {
  const { steps, signedUp, featureFlags } = props;

  let actionSteps = cloneDeep(steps);

  if (! signedUp) {
    // Truncate steps if user isn't signed up & remove any custom steps.
    actionSteps = actionSteps.filter(step => ! step.customType[0]).slice(0, 2);

    if (actionSteps[actionSteps.length - 1]) {
      actionSteps[actionSteps.length - 1].truncate = true;
    }
  }

  return (
    <ActionStepsWrapper actionSteps={actionSteps} featureFlags={featureFlags} />
  );
};

ActionPage.propTypes = {
  featureFlags: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  steps: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  signedUp: PropTypes.bool.isRequired,
};

ActionPage.defaultProps = {
  featureFlags: null,
};

export default ActionPage;
