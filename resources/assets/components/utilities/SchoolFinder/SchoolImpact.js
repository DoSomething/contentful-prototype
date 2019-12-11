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

const SchoolImpact = ({ actionId, school }) => (
  <div className="md:flex md:content-center p-3">
    <div className="md:flex-shrink-0">
      <p>{school.name}</p>
      <small className="uppercase">
        {school.city}, {school.state}
      </small>
    </div>
    <div className="quantity mt-4 md:mt-0 md:ml-6 border-t border-gray-400 px-4">
      <Query
        query={SCHOOL_ACTION_QUERY}
        variables={{ actionId, schoolId: school.id }}
      >
        {result => {
          const { noun, schoolActionStats, verb } = result.action;
          const quantity = schoolActionStats.length
            ? schoolActionStats[0].acceptedQuantity
            : 0;

          return (
            <React.Fragment>
              <span className="block font-league-gothic font-normal text-4xl">
                {quantity}
              </span>
              <span className="uppercase text-sm text-gray-400 font-bold">
                {noun} {verb}
              </span>
            </React.Fragment>
          );
        }}
      </Query>
    </div>
  </div>
);

SchoolImpact.propTypes = {
  actionId: PropTypes.number.isRequired,
  school: PropTypes.object.isRequired,
};

export default SchoolImpact;
