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
  schoolFinderFormDescription,
  schoolNotAvailableDescription,
  schoolNotAvailableHeadline,
  schoolSelectedConfirmation,
  userId,
}) => (
  <div className="school-finder">
    <Query query={USER_SCHOOL_QUERY} variables={{ userId }}>
      {result => {
        const { schoolId, school } = result.user;

        return (
          <Card
            title={schoolId ? 'Your School' : 'Find Your School'}
            className="rounded bordered"
          >
            {schoolId ? (
              <div className="current-school p-3">
                {schoolSelectedConfirmation ? (
                  <p className="pb-3">{schoolSelectedConfirmation}</p>
                ) : null}
                <div className="border border-solid border-gray-200 rounded p-3">
                  {school.name ? (
                    <CurrentSchoolImpact school={school} actionId={actionId} />
                  ) : (
                    <React.Fragment>
                      <h3>{schoolNotAvailableHeadline}</h3>
                      <p>{schoolNotAvailableDescription}</p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            ) : (
              <CurrentSchoolForm
                userId={userId}
                description={schoolFinderFormDescription}
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
  userId: PropTypes.string.isRequired,
  schoolFinderFormDescription: PropTypes.string,
  schoolNotAvailableHeadline: PropTypes.string,
  schoolNotAvailableDescription: PropTypes.string,
  schoolSelectedConfirmation: PropTypes.string,
};

CurrentSchoolBlock.defaultProps = {
  actionId: null,
  schoolFinderFormDescription: null,
  schoolNotAvailableHeadline: 'No School Selected',
  schoolNotAvailableDescription: null,
  schoolSelectedConfirmation: null,
};

export default CurrentSchoolBlock;
