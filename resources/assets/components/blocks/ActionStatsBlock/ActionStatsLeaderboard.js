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

const ActionStatsLeaderboard = ({ actionId }) => {
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
      <SectionHeader underlined title="Voter Registration Leaderboard" />
      <div>
        <p>
          This is the online voter registration leaderboard for high school
          students currently running drives. Search your state and/or school to
          see how your registration drive compares to other participating
          schools and groups.
        </p>
      </div>
      {loading ? (
        <Spinner className="flex justify-center" />
      ) : (
        <>
          {leaders.map(leader => {
            const { impact, school, location, id } = leader;
            rank += 1;
            return (
              <div key={id}>
                <div>
                  <h1>{rank}</h1>
                </div>
                <h2>{school.name}</h2>
                <h3>
                  {school.city}, {location.substring(3)}
                </h3>

                <div>
                  <h2>{impact}</h2>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

ActionStatsLeaderboard.propTypes = {
  actionId: PropTypes.number.isRequired,
};

export default ActionStatsLeaderboard;
