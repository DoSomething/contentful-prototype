import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Markdown from '../Markdown';
import Block, { BlockTitle } from '../Block';
import { Flex, FlexCell } from '../Flex';
import { Byline } from '../CampaignUpdateBlock';
import LazyImage from '../LazyImage';
import './competitionBlock.scss';

const DEFAULT_CONFIRMATION = `
# You're signed up!

You should recieve an email shortly with more instructions.
You can keep working on the campaign for now. I'm so excited to have you onboard!
`;

const CompetitionBlock = (props) => {
  const { content, photo, byline, joinCompetition, hasJoinedCompetition,
    hasPendingJoin, showConfirmation, campaignId, campaignRunId, checkForCompetition } = props;

  // If we already joined the competition & saw the confirmation message,
  // display nothing.
  if (! showConfirmation && hasJoinedCompetition) {
    return null;
  }

  // If we haven't joined a competition yet or clicked the join button,
  // check for existing competition join.
  if (! showConfirmation && !hasJoinedCompetition) {
    checkForCompetition(campaignId, campaignRunId);
  }

  const button = showConfirmation ? null : (
    <button
      disabled={hasPendingJoin}
      className={classnames('button', { 'is-loading': hasPendingJoin })}
      onClick={() => joinCompetition(campaignId, campaignRunId)}
    >join competition</button>
  );

  return (
    <Block>
      <BlockTitle>join a competition</BlockTitle>
      <Flex className="competition-block">
        <FlexCell width="two-thirds">
          <div className={classnames('competition-block__content', { 'is-confirmation': showConfirmation })}>
            <Markdown className={classnames('', { 'is-success': showConfirmation })}>{ showConfirmation ? DEFAULT_CONFIRMATION : content }</Markdown>
            { button }
            <Byline {...byline} />
          </div>
        </FlexCell>
        <FlexCell width="one-third">
          <div className="competition-block__photo">
            <LazyImage alt="competition" src={photo} />
          </div>
        </FlexCell>
      </Flex>
    </Block>
  );
};

CompetitionBlock.propTypes = {
  content: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  byline: PropTypes.shape({
    author: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  joinCompetition: PropTypes.func.isRequired,
  hasJoinedCompetition: PropTypes.bool.isRequired,
  hasPendingJoin: PropTypes.bool.isRequired,
  showConfirmation: PropTypes.bool.isRequired,
  campaignId: PropTypes.string.isRequired,
};

export default CompetitionBlock;
