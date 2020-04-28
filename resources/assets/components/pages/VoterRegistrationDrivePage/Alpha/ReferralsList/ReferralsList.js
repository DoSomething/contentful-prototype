import React from 'react';
import gql from 'graphql-tag';
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
  <div className="grid-wide clearfix wrapper">
    <SectionHeader underlined title="Get 3 friends to register!" />
    <Query
      query={ALPHA_VOTER_REGISTRATION_REFERRALS_QUERY}
      variables={{ referrerUserId }}
    >
      {data => {
        const countStr = data.posts.length === 51 ? '50+' : data.posts.length;
        const items = [];

        for (let i = 0; i < 3; i += 1) {
          items.push(
            <li key={i}>
              <ReferralsListItem
                label={data.posts[i] ? data.posts[i].user.displayName : null}
              />
            </li>,
          );
        }

        return (
          <div>
            <p>
              You have registered{' '}
              <strong>
                {countStr} {countStr === '1' ? 'person' : 'people'}
              </strong>{' '}
              so far.
            </p>
            <ul className="gallery-grid-triplet -mx-3">{items}</ul>
          </div>
        );
      }}
    </Query>
  </div>
);

ReferralsList.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ReferralsList;
