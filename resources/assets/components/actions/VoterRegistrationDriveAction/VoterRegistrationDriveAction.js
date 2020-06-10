import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import QueryOptions from './QueryOptions';
import { PHOENIX_URL } from '../../../constants';
import { appendToQuery } from '../../../helpers';
import { getUserId } from '../../../helpers/auth';
import {
  campaignSignupGqlQuery,
  getCampaignSignupGqlQueryVariables,
} from '../../../helpers/campaign';
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

const VoterRegistrationDriveAction = ({
  approvedPostCountActionId,
  approvedPostCountLabel,
  description,
  title,
}) => {
  const { loading, error, data } = useQuery(campaignSignupGqlQuery, {
    variables: getCampaignSignupGqlQueryVariables(),
  });

  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const signup = data.signups[0];

  const queryParams = {
    referrer_user_id: getUserId(),
  };

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
