import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Query from '../../Query';
import SchoolFinderForm from './SchoolFinderForm';
import {
  SCHOOL_NOT_AVAILABLE_TITLE,
  SCHOOL_NOT_AVAILABLE_DESCRIPTION,
} from '../../../constants/school-finder';

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
  <div className="school-finder">
    <Query query={USER_SCHOOL_QUERY} variables={{ userId }}>
      {result => {
        const { schoolId, school } = result.user;

        return (
          <Card
            title={schoolId ? 'Your School' : 'Find Your School'}
            className="rounded bordered overflow-visible"
          >
            {schoolId ? (
              <div className="p-3">
                <h3>
                  {school.name ? school.name : SCHOOL_NOT_AVAILABLE_TITLE}
                </h3>
                {school.name ? (
                  <small className="uppercase">
                    {school.city}, {school.state}
                  </small>
                ) : (
                  <p>{SCHOOL_NOT_AVAILABLE_DESCRIPTION}</p>
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
