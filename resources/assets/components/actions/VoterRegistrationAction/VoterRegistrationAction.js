import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Card from '../../utilities/Card/Card';
import { set } from '../../../helpers/storage';
import { dynamicString } from '../../../helpers';
import ButtonLink from '../../utilities/ButtonLink/ButtonLink';
import { trackAnalyticsEvent } from '../../../helpers/analytics';
import TextContent from '../../utilities/TextContent/TextContent';

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
    trackAnalyticsEvent({
      context: {
        blockId,
        campaignId,
        pageId,
        url: parsedLink,
      },
      metadata: {
        category: 'campaign_action',
        label: 'voter_registration',
        noun: 'voter_registration_action',
        verb: 'clicked',
      },
    });

    set(`${props.userId}_hide_voter_reg_modal`, 'boolean', true);
  };

  return (
    <Card
      className="rounded bordered voter-registration"
      title="Register to vote"
    >
      <PuckWaypoint name="voter_registration_action-top" />
      <div className="padded clearfix">
        <TextContent>{content}</TextContent>

        <ButtonLink link={parsedLink} onClick={handleClick} targetBlank>
          Start Registration
        </ButtonLink>
      </div>
      <PuckWaypoint name="voter_registration_action-bottom" />
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
