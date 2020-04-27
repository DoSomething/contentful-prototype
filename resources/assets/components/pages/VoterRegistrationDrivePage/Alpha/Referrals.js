import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../../Query';
import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';

const ALPHA_VOTER_REGISTRATION_REFERRALS_QUERY = gql`
  query AlphaVoterRegistrationReferrals($referrerUserId: String!) {
    postsCount(
      referrerUserId: $referrerUserId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
      limit: 51
    )
  }
`;

const ReferralsSection = ({ referrerUserId }) => (
  <Query
    query={ALPHA_VOTER_REGISTRATION_REFERRALS_QUERY}
    variables={{ referrerUserId }}
  >
    {data => {
      const countStr = data.postsCount === 51 ? '50+' : data.postsCount;

      return (
        <React.Fragment>
          <ContentBlock
            title="Get 3 friends to register!"
            content={`You have registered **${countStr} ${
              countStr === '1' ? 'person' : 'people'
            }** so far.`}
            className="grid-wide"
          />
        </React.Fragment>
      );
    }}
  </Query>
);

ReferralsSection.propTypes = {
  referrerUserId: PropTypes.string.isRequired,
};

export default ReferralsSection;
