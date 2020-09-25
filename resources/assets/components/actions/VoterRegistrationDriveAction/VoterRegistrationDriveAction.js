import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import {
  CAMPAIGN_SIGNUP_QUERY,
  getCampaignSignupQueryVariables,
} from '../../../helpers/campaign';
import QueryOptions from './QueryOptions';
import { PHOENIX_URL } from '../../../constants';
import { appendToQuery } from '../../../helpers';
import { getUserId } from '../../../helpers/auth';
import Placeholder from '../../utilities/Placeholder';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PreviewImage from './voter-registration-drive-page.png';
import SocialDriveActionContainer from '../SocialDriveAction/SocialDriveActionContainer';

export const VoterRegistrationDriveBlockFragment = gql`
  fragment VoterRegistrationDriveBlockFragment on VoterRegistrationDriveBlock {
    description
    title
  }
`;

const VoterRegistrationDriveAction = ({ description, title }) => {
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
  const queryParams = { referrer_user_id: getUserId() };

  if (signup.group) {
    queryParams.group_id = signup.group.id;
  }

  return (
    <SocialDriveActionContainer
      link={
        appendToQuery(
          queryParams,
          `${PHOENIX_URL}/us/my-voter-registration-drive`,
        ).href
      }
      previewImage={PreviewImage}
      queryOptions={<QueryOptions />}
      description={description}
      title={title}
    />
  );
};

VoterRegistrationDriveAction.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

VoterRegistrationDriveAction.defaultProps = {
  description: null,
  title: null,
};

export default VoterRegistrationDriveAction;
