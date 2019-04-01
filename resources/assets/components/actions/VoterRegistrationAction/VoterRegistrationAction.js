import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import Card from '../../utilities/Card/Card';
import { set } from '../../../helpers/storage';
import { dynamicString } from '../../../helpers';
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
  const { campaignId, content, contentfulId, link, modalType, userId } = props;

  const tokens = {
    userId,
    northstarId: userId, // @TODO: Remove!
    campaignId,
    campaignRunId: 0,
    source: 'web',
  };

  const parsedLink = link && dynamicString(link, tokens);

  const handleClick = () => {
    const trackingData = { contentfulId, url: parsedLink, modal: modalType };
    trackAnalyticsEvent({
      verb: 'clicked',
      noun: 'voter_registration_action',
      data: trackingData,
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

        {parsedLink ? (
          <a
            className="button"
            href={parsedLink}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Registration
          </a>
        ) : null}
      </div>
      <PuckWaypoint name="voter_registration_action-bottom" />
    </Card>
  );
};

VoterRegistrationAction.propTypes = {
  campaignId: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentfulId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

VoterRegistrationAction.defaultProps = {
  content: 'Register to vote!',
  modalType: null,
};

export default VoterRegistrationAction;
