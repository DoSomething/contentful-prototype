import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import { set } from '../../../helpers/storage';
import { dynamicString } from '../../../helpers';
import ButtonLink from '../../utilities/ButtonLink/ButtonLink';
import { trackAnalyticsEvent } from '../../../helpers/analytics';
import TextContent from '../../utilities/TextContent/TextContent';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';

import './voter-registration-action.scss';

export const VoterRegistrationBlockFragment = gql`
  fragment VoterRegistrationBlockFragment on VoterRegistrationBlock {
    title
    content
    link
    additionalContent
  }
`;

const VoterRegistrationAction = props => {
  const { campaignId, content, blockId, link, pageId, userId } = props;

  const tokens = {
    userId,
    northstarId: userId, // @TODO: Remove!
    campaignId,
    campaignRunId: 0,
    source: 'web',
  };

  const parsedLink = link && dynamicString(link, tokens);

  const handleClick = () => {
    trackAnalyticsEvent('clicked_vote r_registration_action', {
      action: 'button_clicked',
      category: 'campaign_action',
      label: 'voter_registration',
      context: {
        blockId,
        campaignId,
        pageId,
        url: parsedLink,
      },
    });

    set(`${props.userId}_hide_voter_reg_modal`, 'boolean', true);
  };

  return (
    <Card
      className="rounded bordered voter-registration"
      title="Register to vote"
    >
      <AnalyticsWaypoint name="voter_registration_action-top" />
      <div className="p-3 clearfix">
        <TextContent>{content}</TextContent>

        <ButtonLink link={parsedLink} onClick={handleClick}>
          Start Registration
        </ButtonLink>
      </div>
      <AnalyticsWaypoint name="voter_registration_action-bottom" />
    </Card>
  );
};

VoterRegistrationAction.propTypes = {
  blockId: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

VoterRegistrationAction.defaultProps = {
  content: 'Register to vote!',
};

export default VoterRegistrationAction;
