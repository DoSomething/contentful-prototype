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
    }
  }
`;

const SchoolFinder = ({ campaignId, userId }) => {
  // Check for our development Teens For Jeans (TFJ) campaign ID.
  // @TODO: Add additional check for production TFJ campaign ID once it exists.
  if (campaignId !== '9001') {
    return null;
  }

  return (
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
                  <CurrentSchool schoolId={res.user.schoolId} />
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
};

SchoolFinder.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SchoolFinder;
