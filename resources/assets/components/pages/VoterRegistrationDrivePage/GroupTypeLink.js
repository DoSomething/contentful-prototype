import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PlaceholderText from '../../utilities/PlaceholderText/PlaceholderText';

const GROUPS_CAMPAIGN_QUERY = gql`
  query GroupsCampaignQuery($groupTypeId: Int!, $causes: [String]) {
    campaigns(groupTypeId: $groupTypeId, causes: $causes) {
      id
    }
  }
`;

const GROUPS_CAMPAIGN_WEBSITE_QUERY = gql`
  query GroupsCampaignWebsiteQuery($campaignId: String!) {
    campaignWebsiteByCampaignId(campaignId: $campaignId) {
      id
      path
      url
    }
  }
`;

const GroupTypeLink = ({ id, name }) => {
  const { loading, error, data } = useQuery(GROUPS_CAMPAIGN_QUERY, {
    variables: {
      groupTypeId: id,
      causes: ['voter-registration'],
    },
  });
  const groupTypeCampaignId = get(data, 'campaigns[0].id', null);

  const {
    loading: campaignWebsiteLoading,
    error: campaignWebsiteError,
    data: campaignWebsiteData,
  } = useQuery(GROUPS_CAMPAIGN_WEBSITE_QUERY, {
    skip: groupTypeCampaignId == null,
    variables: {
      campaignId: String(groupTypeCampaignId),
    },
  });
  const groupCampaignPath = get(
    campaignWebsiteData,
    'campaignWebsiteByCampaignId.path',
    null,
  );

  return (
    <>
      {error || campaignWebsiteError ? (
        <ErrorBlock error={error || campaignWebsiteError} />
      ) : (
        <div className="mt-3">
          {loading || campaignWebsiteLoading ? (
            <PlaceholderText size="medium" />
          ) : (
            <a
              href={groupCampaignPath}
              target="_blank"
              rel="noopener noreferrer"
              data-test="voter-registration-drive-page-group-campaign-link"
            >
              What&lsquo;s {name}?
            </a>
          )}
        </div>
      )}
    </>
  );
};

GroupTypeLink.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default GroupTypeLink;
