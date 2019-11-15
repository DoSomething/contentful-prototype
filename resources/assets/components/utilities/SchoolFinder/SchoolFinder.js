import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Query from '../../Query';
import SchoolFinderForm from './SchoolFinderForm';

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

        const { schoolId, school } = res.user;

        return (
          <Card
            title={schoolId ? 'Your School' : 'Find Your School'}
            className="rounded bordered overflow-visible"
          >
            {schoolId ? (
              <div className="p-3">
                <h3>{school.name ? school.name : 'No School Selected'}</h3>
                {school.name ? (
                  <small className="uppercase">
                    {school.city}, {school.state}
                  </small>
                ) : (
                  <p>
                    No school copy goes here, please email Sahara with
                    information about your school.
                  </p>
                )}
              </div>
            ) : (
              <SchoolFinderForm userId={userId} />
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
