import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import QueryOptions from './QueryOptions';
import { PHOENIX_URL } from '../../../constants';
import { appendToQuery } from '../../../helpers';
import { getUserId } from '../../../helpers/auth';
import { getCampaign } from '../../../helpers/campaign';
import SocialDriveActionContainer from '../SocialDriveAction/SocialDriveActionContainer';
import Placeholder from '../../utilities/Placeholder';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';

export const VoterRegistrationDriveBlockFragment = gql`
  fragment VoterRegistrationDriveBlockFragment on VoterRegistrationDriveBlock {
    approvedPostCountActionId
    approvedPostCountLabel
    description
    title
  }
`;

const CAMPAIGN_SIGNUP_QUERY = gql`
  query CampaignSignup($userId: String!, $campaignId: String!) {
    signups(userId: $userId, campaignId: $campaignId) {
      id
      group {
        id
      }
    }
  }
`;

const VoterRegistrationDriveAction = ({
  approvedPostCountActionId,
  approvedPostCountLabel,
  description,
  title,
}) => {
  const userId = getUserId();

  const { loading, error, data } = useQuery(CAMPAIGN_SIGNUP_QUERY, {
    variables: { userId, campaignId: getCampaign().campaignId },
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const signup = data.signups[0];
  const queryParams = { referrer_user_id: userId };

  if (signup.group) {
    queryParams.group_id = signup.group.id;
  }

  return (
    <SocialDriveActionContainer
      approvedPostCountActionId={approvedPostCountActionId}
      approvedPostCountLabel={
        approvedPostCountLabel || 'Total scholarship entries'
      }
      link={
        appendToQuery(
          queryParams,
          `${PHOENIX_URL}/us/my-voter-registration-drive`,
        ).href
      }
      queryOptions={<QueryOptions />}
      shareCardDescription={description}
      shareCardTitle={title}
    />
  );
};

VoterRegistrationDriveAction.propTypes = {
  approvedPostCountActionId: PropTypes.number,
  approvedPostCountLabel: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
};

VoterRegistrationDriveAction.defaultProps = {
  approvedPostCountActionId: null,
  approvedPostCountLabel: null,
  description: null,
  title: null,
};

export default VoterRegistrationDriveAction;
