import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import {
  CAMPAIGN_SIGNUP_QUERY,
  getCampaignSignupQueryVariables,
} from '../../../helpers/campaign';
import QueryOptions from './QueryOptions';
import { PHOENIX_URL } from '../../../constants';
import { appendToQuery } from '../../../helpers';
import { getUserId } from '../../../helpers/auth';
import Card from '../../utilities/Card/Card';
import Placeholder from '../../utilities/Placeholder';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PreviewImage from './voter-registration-drive-page.png';
import ShortLinkShareContainer from '../../utilities/ShortLinkShare/ShortLinkShareContainer';

export const VoterRegistrationDriveBlockFragment = gql`
  fragment VoterRegistrationDriveBlockFragment on VoterRegistrationDriveBlock {
    description
    title
  }
`;

const VoterRegistrationDriveAction = ({ description, title }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

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
    <div className="clearfix pb-6">
      <Card className="rounded bordered" title={title}>
        <div className="lg:flex">
          <div className="lg:w-2/3">
            {description ? (
              <div className="p-3">
                <p>{description}</p>
              </div>
            ) : null}

            <ShortLinkShareContainer
              link={
                appendToQuery(
                  queryParams,
                  `${PHOENIX_URL}/us/my-voter-registration-drive`,
                ).href
              }
              onChange={url => setPreviewUrl(url)}
              queryOptions={<QueryOptions />}
            />
          </div>

          <div className="m-4 lg:w-1/3 lg:my-8 lg:ml-16 lg:mr-24">
            <a href={previewUrl} rel="noopener noreferrer" target="_blank">
              <img
                css={css`
                  height: 462px;
                `}
                src={PreviewImage}
                alt="Custom page preview"
              />
            </a>

            <a
              className="block mt-4 font-normal underline text-blurple-500"
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview your custom page
            </a>
          </div>
        </div>
      </Card>
    </div>
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
