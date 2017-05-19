import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

import Markdown from '../Markdown';
import Block, { BlockTitle } from '../Block';
import Byline from '../Byline';
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

  // @TEST 2017-05-17 competitions_prompt_style
  const experiments = props.experiments;
  const experimentAlternative = get(experiments, 'competitions_prompt_style', null);
  const experimentClasses = [];

  switch (experimentAlternative) {
    case 'colorful_block':
      experimentClasses.push('-colorful');
      break;
    default:
      experimentClasses.push('-default');
      break;
  }

  // If we already joined the competition & saw the confirmation message,
  // display nothing.
  if (! showConfirmation && hasJoinedCompetition) {
    return null;
  }

  // If we haven't joined a competition yet or clicked the join button,
  // check for existing competition join.
  if (! showConfirmation && ! hasJoinedCompetition) {
    checkForCompetition(campaignId, campaignRunId);
  }

  const button = showConfirmation ? null : (
    <button
      disabled={hasPendingJoin}
      className={classnames('button', { 'is-loading': hasPendingJoin })}
      onClick={() => joinCompetition(campaignId, campaignRunId)}
    >join competition</button>
  );

  const competitionPhoto = photo && ! showConfirmation ? (
    <div className="competition-block__photo">
      <LazyImage alt="competition" src={photo} />
    </div>
  ) : null;

  return (
    <Block className={classnames(experimentClasses)}>
      <BlockTitle>Go above and beyond!</BlockTitle>
      <div className={classnames('competition-block', { 'is-confirmation': showConfirmation })}>
        <div className="clearfix">
          <Markdown className={classnames('', { 'is-success': showConfirmation })}>{ showConfirmation ? DEFAULT_CONFIRMATION : content }</Markdown>
          { competitionPhoto }
        </div>
        { button }
        <Byline {...byline} />
      </div>
    </Block>
  );
};

CompetitionBlock.propTypes = {
  content: PropTypes.string.isRequired,
  photo: PropTypes.string,
  byline: PropTypes.shape({
    author: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  experiments: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  joinCompetition: PropTypes.func.isRequired,
  checkForCompetition: PropTypes.func.isRequired,
  hasJoinedCompetition: PropTypes.bool.isRequired,
  hasPendingJoin: PropTypes.bool.isRequired,
  showConfirmation: PropTypes.bool.isRequired,
  campaignId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.string.isRequired,
};

CompetitionBlock.defaultProps = {
  experiments: null,
  photo: null,
};

export default CompetitionBlock;
