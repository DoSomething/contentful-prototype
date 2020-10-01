import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { assign, get } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Spinner from '../../artifacts/Spinner/Spinner';

const SCHOOL_ACTION_STATS_LEADER_QUERY = gql`
  query SchoolActionStatsLeaderQuery(
    $actionId: Int!
    $groupTypeId: Int
    $count: Int
  ) {
    stats: schoolActionStats(
      actionId: $actionId
      groupTypeId: $groupTypeId
      orderBy: "impact,desc"
      count: $count
    ) {
      id
      actionId
      impact
      location
      schoolId
      school {
        id
        name
        city
      }
    }
  }
`;

const ActionStatsLeaderboard = ({ actionId, count, groupTypeId }) => {
  const variables = {
    actionId,
    count,
  };

  if (groupTypeId) {
    assign(variables, { groupTypeId });
  }

  const { loading, data, error } = useQuery(SCHOOL_ACTION_STATS_LEADER_QUERY, {
    variables,
  });

  let rank = 0;

  const leaders = get(data, 'stats', []);

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return (
    <>
      {loading ? (
        <Spinner className="flex justify-center" />
      ) : (
        <div className="p-6 bg-white lg:w-2/3">
          {leaders.map(leader => {
            const { impact, school, location, id } = leader;
            let circleBgColor;
            rank += 1;

            switch (rank) {
              case 1:
                circleBgColor = 'bg-yellow-500';
                break;
              case 2:
                circleBgColor = 'bg-purple-500';
                break;
              default:
                circleBgColor = 'bg-blurple-500';
            }

            return (
              <div
                className={classnames(
                  'mx-auto md:flex md:items-center md:justify-between',
                  {
                    'border-b border-gray-300 border-solid md:pb-4 mb-4':
                      rank < count,
                  },
                )}
                key={id}
              >
                <div
                  className={classnames(
                    'mx-auto md:mr-4 rounded-full h-20 w-20 flex items-center justify-center',
                    circleBgColor,
                  )}
                >
                  <h1 className="font-normal text-2xl font-league-gothic mb-0 text-white md:px-10">
                    {rank}
                  </h1>
                </div>

                <div className="md:w-3/5 mt-6 md:mt-0 text-center md:text-left md:pr-4">
                  <h2 className="text-lg">{school.name}</h2>
                  <h3 className="font-bold text-sm text-gray-600 uppercase">
                    {school.city}, {location.substring(3)}
                  </h3>
                </div>

                <div className="w-full md:w-2/5 pt-3 pb-3 flex justify-center items-center">
                  <h2 className="font-normal font-league-gothic pr-3 text-3xl md:w-1/4">
                    {impact}
                  </h2>
                  <span className="font-bold text-gray-600 text-base uppercase md:w-3/4">
                    Registrations
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

ActionStatsLeaderboard.propTypes = {
  actionId: PropTypes.number.isRequired,
  groupTypeId: PropTypes.number,
  count: PropTypes.number,
};

ActionStatsLeaderboard.defaultProps = {
  count: 3,
  groupTypeId: null,
};

export default ActionStatsLeaderboard;
