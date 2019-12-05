import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Query from '../../Query';
import SchoolFinderForm from './SchoolFinderForm';

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

const SchoolFinder = props => (
  <div className="school-finder">
    <Query query={USER_SCHOOL_QUERY} variables={{ userId: props.userId }}>
      {result => {
        const { schoolId, school } = result.user;

        return (
          <Card
            title={schoolId ? 'Your School' : 'Find Your School'}
            className="rounded bordered"
          >
            {schoolId ? (
              <div className="current-school p-3">
                <h3>
                  {school.name ? school.name : props.schoolNotAvailableHeadline}
                </h3>
                {school.name ? (
                  <small className="uppercase">
                    {school.city}, {school.state}
                  </small>
                ) : (
                  <p>{props.schoolNotAvailableDescription}</p>
                )}
              </div>
            ) : (
              <SchoolFinderForm
                userId={props.userId}
                description={props.schoolFinderFormDescription}
              />
            )}
          </Card>
        );
      }}
    </Query>
  </div>
);

SchoolFinder.propTypes = {
  userId: PropTypes.string.isRequired,
  schoolFinderFormDescription: PropTypes.string,
  schoolNotAvailableHeadline: PropTypes.string,
  schoolNotAvailableDescription: PropTypes.string,
};

SchoolFinder.defaultProps = {
  schoolFinderFormDescription: null,
  schoolNotAvailableHeadline: 'No School Selected',
  schoolNotAvailableDescription: null,
};

export default SchoolFinder;
