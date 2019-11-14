import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Query from '../../Query';
import UpdateSchool from './UpdateSchool';
import CurrentSchool from './CurrentSchool';

const USER_SCHOOL_QUERY = gql`
  query UserSchoolQuery($userId: String!) {
    user(id: $userId) {
      id
      schoolId
      school {
        id
        name
        city
        state
      }
    }
  }
`;

const SchoolFinder = ({ campaignId, userId }) => {
  // Check for our development Teens For Jeans (TFJ) campaign ID.
  // @TODO: Add additional check for production TFJ campaign ID once it exists.
  if (campaignId !== '9001') {
    return null;
  }

  // TODO: We shouldn't need a school state variable, but instead update Apollo Cache.
  const [school, setSchool] = useState({
    id: null,
    name: null,
    city: null,
    state: null,
  });

  return (
    <div className="school-finder margin-bottom-lg margin-horizontal-md clear-both primary">
      <Query query={USER_SCHOOL_QUERY} variables={{ userId }}>
        {res => {
          if (res.user && res.user.school) {
            setSchool(res.user.school);
          }

          return (
            <Card
              title={school.id ? 'Your School' : 'Find Your School'}
              className="rounded bordered overflow-visible"
            >
              {school.id ? (
                <CurrentSchool school={school} />
              ) : (
                // TODO: Remove onSubmit once Apollo cache is updated via mutation in UpdateSchool.
                <UpdateSchool
                  userId={userId}
                  onSubmit={selected => setSchool(selected)}
                />
              )}
            </Card>
          );
        }}
      </Query>
    </div>
  );
};

SchoolFinder.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SchoolFinder;
