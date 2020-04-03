import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';

const USER_VOTER_REGISTRATION_REFERRAL_COUNT_QUERY = gql`
  query UserVoterRegistrationReferralCount($userId: String!) {
    postsCount(
      referrerUserId: $userId
      type: "voter-reg"
      status: [REGISTER_FORM, REGISTER_OVR]
      limit: 51
    )
  }
`;

const VoterRegistrationDriveInfo = ({ pageViewsCount, userId }) => {
  return (
    <div className="social-drive-information mt-6' lg:w-1/3 lg:pl-3 lg:mt-0'">
      <Card className="bordered rounded" title="More info">
        <div className="link-info p-3">
          <p className="info__title">What happens next?</p>
          <p className="info__text">
            As you share your voter registration page, we&#39;ll keep track of
            how many people you bring in. Check back often and try to get as
            many views as possible!
          </p>
        </div>
        <div className="p-3 page-views">
          <span className="page-views__text uppercase">Total page views</span>
          <h1 className="page-views__amount">{pageViewsCount}</h1>
        </div>
        <div className="p-3 voter-registrations">
          <span className="voter-registrations__text uppercase">
            Total voter registrations
          </span>
          <Query
            query={USER_VOTER_REGISTRATION_REFERRAL_COUNT_QUERY}
            variables={{ userId }}
          >
            {data => (
              <h1 className="voter-registrations__amount">
                {data.postsCount === 51 ? '50+' : data.postsCount}
              </h1>
            )}
          </Query>
        </div>
      </Card>
    </div>
  );
};

VoterRegistrationDriveInfo.propTypes = {
  pageViewsCount: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

VoterRegistrationDriveInfo.defaultProps = {
  pageViewsCount: '?',
};

export default VoterRegistrationDriveInfo;