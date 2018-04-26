import React from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';

import Enclosure from '../../Enclosure';
import ActionStepsContainer from './ActionStepsContainer';
import { CallToActionContainer } from '../../CallToAction';
import DashboardContainer from '../../Dashboard/DashboardContainer';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

/**
 * Render the action page steps.
 *
 * @returns {XML}
 */
const ActionPage = props => {
  const { dashboard, steps, signedUp } = props;

  let actionSteps = cloneDeep(steps);

  if (!signedUp) {
    // Truncate steps if user isn't signed up & remove any custom steps.
    actionSteps = actionSteps.filter(step => !step.customType).slice(0, 2);

    if (actionSteps[actionSteps.length - 1]) {
      actionSteps[actionSteps.length - 1].truncate = true;
    }
  }

  return (
    <div>
      <LedeBannerContainer />
      <div className="main clearfix">
        {dashboard ? <DashboardContainer /> : null}
        <CampaignPageNavigationContainer />
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <ActionStepsContainer actionSteps={actionSteps} />
        </Enclosure>
        <CallToActionContainer sticky hideIfSignedUp />
      </div>
    </div>
  );
};

ActionPage.propTypes = {
  steps: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  signedUp: PropTypes.bool.isRequired,
};

ActionPage.defaultProps = {
  dashboard: null,
};

export default ActionPage;
