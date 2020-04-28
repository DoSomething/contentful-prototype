import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import Query from '../../../../Query';
import ReferralsListItem from './ReferralsListItem';
import SectionHeader from '../../../../utilities/SectionHeader/SectionHeader';

const ALPHA_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query AlphaVoterRegistrationReferrals($referrerUserId: String!) {
    posts(
      referrerUserId: $referrerUserId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
    ) {
      id
      user {
        displayName
      }
    }
  }
`;

const ReferralsList = ({ referrerUserId }) => (
  <div className="grid-wide clearfix wrapper pb-6">
    <SectionHeader underlined title="Get 3 friends to register!" />
    <Query
      query={ALPHA_VOTER_REGISTRATION_REFERRALS_QUERY}
      variables={{ referrerUserId }}
    >
      {data => {
        const numberOfReferrals = data.posts.length;
        const items = [];

        /**
         * If there are no referral posts, we want to display three empty list items, which is why
         * we're looping from 0 to 2 here (vs slicing our data.posts array).
         */
        for (let i = 0; i < 3; i += 1) {
          items.push(
            <li key={i} className="float-left pr-6">
              <ReferralsListItem
                label={get(data.posts[i], 'user.displayName')}
              />
            </li>,
          );
        }

        return (
          <>
            <div className="pb-6">
              You have registered{' '}
              <strong>
                {numberOfReferrals} {pluralize('person', numberOfReferrals)}
              </strong>{' '}
              so far.
            </div>
            <ul className="clearfix">{items}</ul>
          </>
        );
      }}
    </Query>
  </div>
);

ReferralsList.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ReferralsList;
