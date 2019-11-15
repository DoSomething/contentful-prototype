import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Query from '../../Query';
import UpdateSchool from './UpdateSchool';
import CurrentSchool from './CurrentSchool';

const USER_SCHOOL_QUERY = gql`
  query UserSchoolQuery($userId: String!) {
    user(id: $userId) {
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

const SchoolFinder = ({ userId }) => (
  <div className="school-finder margin-bottom-lg margin-horizontal-md clear-both primary">
    <Query query={USER_SCHOOL_QUERY} variables={{ userId }}>
      {res => {
        // @TODO: We need this to avoid errors, but why/when does this happen?
        if (!res.user) {
          return null;
        }

        return (
          <Card
            title={res.user.schoolId ? 'Your School' : 'Find Your School'}
            className="rounded bordered overflow-visible"
          >
            {res.user.schoolId ? (
              <div className="p-3">
                <CurrentSchool school={res.user.school} />
              </div>
            ) : (
              <UpdateSchool userId={userId} />
            )}
          </Card>
        );
      }}
    </Query>
  </div>
);

SchoolFinder.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default SchoolFinder;
