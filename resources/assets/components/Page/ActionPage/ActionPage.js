import PropTypes from 'prop-types';
import React from 'react';
import { cloneDeep } from 'lodash';

import ActionStepsContainer from './ActionStepsContainer';

/**
 * Render the action page steps.
 *
 * @returns {XML}
 */
const ActionPage = (props) => {
  const { steps, signedUp } = props;

  let actionSteps = cloneDeep(steps);

  if (! signedUp) {
    // Truncate steps if user isn't signed up & remove any custom steps.
    actionSteps = actionSteps.filter(step => ! step.customType).slice(0, 2);

    if (actionSteps[actionSteps.length - 1]) {
      actionSteps[actionSteps.length - 1].truncate = true;
    }
  }

  return (
    <ActionStepsContainer actionSteps={actionSteps} />
  );
};

ActionPage.propTypes = {
  steps: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  signedUp: PropTypes.bool.isRequired,
};

export default ActionPage;
