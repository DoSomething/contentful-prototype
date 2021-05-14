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

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const noun = get(data, 'action.noun', null);
  const verb = get(data, 'action.verb', null);

  const impactGoal = get(data, 'action.impactGoal', null);
  const currentImpactTotal = get(data, 'action.currentImpactQuantity', 0);

  const { goal, percentage } = getGoalInfo(impactGoal, currentImpactTotal);
  return (
    <>
      {loading ? (
        <Spinner className="flex justify-center p-6" />
      ) : (
        <div className="mb-6">
          <ProgressBar percentage={percentage} />
          <p className="text-lg">
            <span className="font-bold">
              {`${currentImpactTotal.toLocaleString()}`} lbs of {noun} {verb} so
              far.
            </span>
            {` `}Help us get to {`${goal.toLocaleString()}`}!
          </p>
        </div>
      )}
    </>
  );
};

CampaignProgressBar.propTypes = {
  actionId: PropTypes.string.isRequired,
};

export default CampaignProgressBar;
