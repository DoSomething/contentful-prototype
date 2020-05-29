import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import QueryOptions from './QueryOptions';
import { PHOENIX_URL } from '../../../constants';
import { getUserId } from '../../../helpers/auth';
import SocialDriveActionContainer from '../SocialDriveAction/SocialDriveActionContainer';

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
}) => (
  <SocialDriveActionContainer
    approvedPostCountActionId={approvedPostCountActionId}
    approvedPostCountLabel={
      approvedPostCountLabel || 'Total scholarship entries'
    }
    link={`${PHOENIX_URL}/us/my-voter-registration-drive?referrer_user_id=${getUserId()}`}
    queryOptions={<QueryOptions />}
    shareCardDescription={description}
    shareCardTitle={title}
  />
);

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
