import React, { useState } from 'react';
import { get } from 'lodash';
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

const SchoolFinder = ({ campaignId, userId }) => {
  // Check for our development Teens For Jeans (TFJ) campaign ID.
  // @TODO: Add additional check for production TFJ campaign ID once it exists.
  if (campaignId !== '9001') {
    return null;
  }

  const [schoolName, setSchoolName] = useState(null);
  const [schoolCity, setSchoolCity] = useState(null);
  const [schoolState, setSchoolState] = useState(null);

  return (
    <div className="school-finder margin-bottom-lg margin-horizontal-md clear-both primary">
      <Query query={USER_SCHOOL_QUERY} variables={{ userId }}>
        {res => {
          if (get(res, 'user.school.id')) {
            const { name, city, state } = res.user.school;
            setSchoolName(name);
            setSchoolCity(city);
            setSchoolState(state);
          }

          return (
            <Card
              title={schoolName ? 'Your School' : 'Find Your School'}
              className="rounded bordered overflow-visible"
            >
              {schoolName ? (
                <CurrentSchool
                  name={schoolName}
                  city={schoolCity}
                  state={schoolState}
                />
              ) : (
                <UpdateSchool
                  userId={userId}
                  onSubmit={(name, city, state) => {
                    setSchoolName(name);
                    setSchoolCity(city);
                    setSchoolState(state);
                  }}
                />
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
