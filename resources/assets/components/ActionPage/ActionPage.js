import PropTypes from 'prop-types';
import React from 'react';
import { cloneDeep } from 'lodash';

import { renderSteps } from './ActionRenders';
import { Flex } from '../Flex';
import './actionPage.scss';

/**
 * Render the feed.
 *
 * @returns {XML}
 */
const ActionPage = (props) => {
  const { steps, signedUp } = props;

  let actionSteps = cloneDeep(steps);

  if (! signedUp) {
    // Truncate steps if user isn't signed up & remove any custom steps.
    actionSteps = actionSteps.filter(step => ! step.customType[0]).slice(0, 2);

    if (actionSteps[actionSteps.length - 1]) {
      actionSteps[actionSteps.length - 1].truncate = true;
    }
  }

  return (
    <Flex>
      { renderSteps(actionSteps, props) }
    </Flex>
  );
};

ActionPage.propTypes = {
  steps: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /* eslint-disable  react/no-unused-prop-types */
  callToAction: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  hasPendingSignup: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signedUp: PropTypes.bool.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  /* eslint-enable */
};

ActionPage.defaultProps = {
  steps: [],
};

export default ActionPage;
