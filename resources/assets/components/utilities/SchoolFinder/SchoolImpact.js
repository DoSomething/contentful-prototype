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
  <div className="md:flex">
    <div className="md:flex-auto mb-3 pb-3 md:pt-3 border-b border-solid border-gray-200 md:border-none">
      <p className="school-name font-bold">{school.name}</p>
      <span className="uppercase text-sm text-gray-400 font-bold">
        {school.city}, {school.state}
      </span>
    </div>
    <div className="quantity md:border-l md:pl-3 border-solid border-gray-200">
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
              <span className="quantity-value block font-league-gothic text-4xl leading-none">
                {quantity}
              </span>
              <span className="quantity-label uppercase text-gray-400 font-bold">
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
  school: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default SchoolImpact;
