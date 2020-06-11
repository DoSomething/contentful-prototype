import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import {
  CAMPAIGN_SIGNUP_QUERY,
  getCampaignSignupQueryVariables,
} from '../../../helpers/campaign';
import GroupTemplate from './templates/Group';
import IndividualTemplate from './templates/Individual';
import Placeholder from '../../utilities/Placeholder';
import ErrorBlock from '../ErrorBlock/ErrorBlock';

export const VoterRegistrationReferralsBlockFragment = gql`
  fragment VoterRegistrationReferralsBlockFragment on VoterRegistrationReferralsBlock {
    title
  }
`;

const VoterRegistrationReferralsBlock = ({ title }) => {
  const { loading, error, data } = useQuery(CAMPAIGN_SIGNUP_QUERY, {
    variables: getCampaignSignupQueryVariables(),
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const signup = data.signups[0];

  return (
    <div className="grid-wide clearfix wrapper pb-6">
      {signup.group ? (
        <GroupTemplate group={signup.group} />
      ) : (
        <IndividualTemplate title={title} />
      )}
    </div>
  );
};

VoterRegistrationReferralsBlock.propTypes = {
  title: PropTypes.string,
};

VoterRegistrationReferralsBlock.defaultProps = {
  title: null,
};

export default VoterRegistrationReferralsBlock;
