import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import ProgressBar from '../ProgressBar/ProgressBar';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import { getGoalInfo } from '../../../helpers/voter-registration';

const CAMPAIGN_PROGRESS_BAR_QUERY = gql`
  query CampaignProgressBarQuery($id: Int!) {
    action(id: $id) {
      id
      impactGoal
      currentImpactQuantity
      noun
      verb
    }
  }
`;

const CampaignProgressBar = ({ actionId }) => {
  const { loading, error, data } = useQuery(CAMPAIGN_PROGRESS_BAR_QUERY, {
    variables: { id: actionId },
  });

  const progressGoalCalculator = (currentTotal, overallGoal = 0) => {
    if (!overallGoal || currentTotal >= overallGoal) {
      return Math.ceil(currentTotal / 1000) * 1000;
    }

    return overallGoal;
  };

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const noun = get(data, 'action.noun', null);
  const verb = get(data, 'action.verb', null);

  const storedImpactGoal = get(data, 'action.impactGoal', null);
  const currentImpactTotal = get(data, 'action.currentImpactQuantity', 0);

  const displayedImactGoal = progressGoalCalculator(
    currentImpactTotal,
    storedImpactGoal,
  );

  const { goal, percentage } = getGoalInfo(
    displayedImactGoal,
    currentImpactTotal,
  );

  return (
    <>
      {loading ? (
        <Spinner className="flex justify-center p-6" />
      ) : (
        <div className="mb-6">
          <ProgressBar percentage={percentage} />
          <p className="text-lg">
            <span className="font-bold">
              {`${currentImpactTotal.toLocaleString()}`} {noun} {verb}.
            </span>
            {` `}Help us get to {`${goal.toLocaleString()}`}!
          </p>
        </div>
      )}
    </>
  );
};

CampaignProgressBar.propTypes = {
  actionId: PropTypes.number.isRequired,
};

export default CampaignProgressBar;
