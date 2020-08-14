import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Spinner from '../../artifacts/Spinner/Spinner';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';

const SCHOOL_ACTION_STATS_LEADER_QUERY = gql`
  query SchoolActionStatsLeaderQuery($actionId: Int!) {
    stats: schoolActionStats(
      actionId: $actionId
      orderBy: "impact,desc"
      count: 3
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

const LeaderList = ({ actionId }) => {
  const { loading, data, error } = useQuery(SCHOOL_ACTION_STATS_LEADER_QUERY, {
    variables: {
      actionId,
    },
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
        <div className="p-6 bg-white lg:w-2/3 mb-6">
          {leaders.map(leader => {
            const { impact, school, location, id } = leader;
            rank += 1;
            return (
              <div
                className="mx-auto md:flex md:items-center md:justify-between border-b border-gray-300 border-solid md:pb-4 mb-4"
                key={id}
              >
                <div className="mx-auto md:mr-4 bg-blurple-500 rounded-full h-20 w-20 flex items-center justify-center">
                  <h1 className="font-normal text-2xl font-league-gothic mb-0 text-white md:px-10">
                    {rank}
                  </h1>
                </div>
                <div className="md:w-3/5 mt-6 md:mt-0 text-center md:text-left">
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

LeaderList.propTypes = {
  actionId: PropTypes.number.isRequired,
};

const ActionStatsLeaderboard = ({ actionId }) => {
  return (
    <>
      <SectionHeader underlined title="Voter Registration Leaderboard" />
      <div className="lg:w-2/3 py-3">
        <p>
          This is the online voter registration leaderboard for high school
          students currently running drives. Search your state and/or school to
          see how your registration drive compares to other participating
          schools and groups.
        </p>
      </div>
      <LeaderList actionId={actionId} />
    </>
  );
};

ActionStatsLeaderboard.propTypes = {
  actionId: PropTypes.number.isRequired,
};

export default ActionStatsLeaderboard;
