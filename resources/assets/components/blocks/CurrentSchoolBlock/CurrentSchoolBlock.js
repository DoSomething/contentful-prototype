import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import Query from '../../Query';
import CurrentSchoolImpact from './CurrentSchoolImpact';
import CurrentSchoolForm from './CurrentSchoolForm';

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

const CurrentSchoolBlock = ({
  actionId,
  currentSchoolTitle,
  currentSchoolDescription,
  schoolNotAvailableDescription,
  selectSchoolTitle,
  selectSchoolDescription,
  userId,
}) => (
  <div className="school-finder">
    <Query query={USER_SCHOOL_QUERY} variables={{ userId }}>
      {result => {
        const { schoolId, school } = result.user;

        return (
          <Card
            title={schoolId ? currentSchoolTitle : selectSchoolTitle}
            className="rounded bordered"
          >
            {schoolId ? (
              <div className="current-school p-3">
                {currentSchoolDescription ? (
                  <p className="pb-3">{currentSchoolDescription}</p>
                ) : null}
                <div className="border border-solid border-gray-200 rounded p-3">
                  {school.name ? (
                    <CurrentSchoolImpact school={school} actionId={actionId} />
                  ) : (
                    <React.Fragment>
                      <h3>No School Selected</h3>
                      <p>{schoolNotAvailableDescription}</p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            ) : (
              <CurrentSchoolForm
                userId={userId}
                description={selectSchoolDescription}
              />
            )}
          </Card>
        );
      }}
    </Query>
  </div>
);

CurrentSchoolBlock.propTypes = {
  actionId: PropTypes.number,
  currentSchoolDescription: PropTypes.string,
  currentSchoolTitle: PropTypes.string,
  selectSchoolDescription: PropTypes.string,
  selectSchoolTitle: PropTypes.string,
  schoolNotAvailableDescription: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

CurrentSchoolBlock.defaultProps = {
  actionId: null,
  currentSchoolDescription: null,
  currentSchoolTitle: 'Your School',
  selectSchoolDescription: null,
  selectSchoolTitle: 'Find Your School',
  schoolNotAvailableDescription: null,
};

export default CurrentSchoolBlock;
