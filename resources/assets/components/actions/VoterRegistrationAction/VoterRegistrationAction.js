import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import { dynamicString } from '../../../helpers';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import TextContent from '../../utilities/TextContent/TextContent';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

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
    trackAnalyticsEvent('clicked_voter_registration_action', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'voter_registration',
      context: {
        blockId,
        campaignId,
        pageId,
        url: parsedLink,
      },
    });
  };

  return (
    <Card
      className="rounded bordered voter-registration"
      title="Register to vote"
    >
      <AnalyticsWaypoint name="voter_registration_action-top" />

      <div className="p-3 clearfix">
        <TextContent className="xl:float-left xl:pr-6 xl:w-2/3">
          {content}
        </TextContent>

        <PrimaryButton
          className="block xl:float-right mt-6 xl:mt-0 mx-auto text-lg w-full md:max-w-xs xl:w-1/3"
          href={parsedLink}
          onClick={handleClick}
          text="Start Registration"
        />
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
