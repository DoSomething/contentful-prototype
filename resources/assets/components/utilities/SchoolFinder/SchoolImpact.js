import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';

const SCHOOL_ACTION_QUERY = gql`
  query SchoolActionQuery($actionId: Int!, $schoolId: String!) {
    action(id: $actionId) {
      id
      noun
      verb
      schoolActionStats(schoolId: $schoolId) {
        id
        acceptedQuantity
      }
    }
  }
`;

const SchoolImpact = ({ actionId, schoolId }) => (
  <div className="school-impact">
    <Query query={SCHOOL_ACTION_QUERY} variables={{ actionId, schoolId }}>
      {result => {
        const { noun, schoolActionStats, verb } = result.action;
        const quantity = schoolActionStats.length
          ? schoolActionStats[0].acceptedQuantity
          : 0;

        return (
          <p>
            {quantity} {noun} {verb}
          </p>
        );
      }}
    </Query>
  </div>
);

SchoolImpact.propTypes = {
  actionId: PropTypes.number.isRequired,
  schoolId: PropTypes.string.isRequired,
};

export default SchoolImpact;
